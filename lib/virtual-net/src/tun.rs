use std::collections::VecDeque;
use std::io::{self, ErrorKind};
use std::mem::MaybeUninit;
use std::ops::DerefMut;
use std::os::fd::{AsRawFd, RawFd};
use std::pin::Pin;
use std::process::Command;
use std::sync::{Arc, Mutex};
use std::task::{Context, Poll, Waker};

use bytes::Bytes;
use futures_util::Future;
use mio::unix::SourceFd;
use mio::{event, Interest, Registry, Token};
use tokio::io::{AsyncRead, AsyncWrite, AsyncWriteExt};
use tokio::net::TcpStream;
use tokio_tungstenite::{MaybeTlsStream, WebSocketStream};
use tun_tap::{Iface, Mode};
use virtual_io::{InterestGuard, InterestHandler, Selector};

use crate::meta::Hello;
use crate::{
    io_err_into_net_error, NetworkError, RemoteNetworking, RemoteNetworkingDriver,
    VirtualNetworking, VirtualRawSocket,
};

fn cmd(cmd: &str, args: &[&str]) -> anyhow::Result<()> {
    let ecode = Command::new(cmd).args(args).spawn()?.wait()?;
    if ecode.success() {
        Ok(())
    } else {
        Err(anyhow::format_err!(
            "failed to allocate IP address (code={:?})",
            ecode.code()
        ))
    }
}

#[derive(Debug, Clone)]
struct TungstensiteAdapter {
    stream: Arc<Mutex<WebSocketStream<MaybeTlsStream<TcpStream>>>>,
}
impl TungstensiteAdapter {
    fn new(stream: WebSocketStream<MaybeTlsStream<TcpStream>>) -> Self {
        Self {
            stream: Arc::new(Mutex::new(stream)),
        }
    }
    fn split(self) -> (Self, Self) {
        (self.clone(), self.clone())
    }
}
impl AsyncRead for TungstensiteAdapter {
    fn poll_read(
        self: Pin<&mut Self>,
        cx: &mut Context<'_>,
        buf: &mut tokio::io::ReadBuf<'_>,
    ) -> Poll<io::Result<()>> {
        let mut guard = self.stream.lock().unwrap();
        Pin::new(guard.deref_mut().get_mut()).poll_read(cx, buf)
    }
}
impl AsyncWrite for TungstensiteAdapter {
    fn poll_write_vectored(
        self: Pin<&mut Self>,
        cx: &mut Context<'_>,
        bufs: &[io::IoSlice<'_>],
    ) -> Poll<Result<usize, io::Error>> {
        let mut guard = self.stream.lock().unwrap();
        Pin::new(guard.deref_mut().get_mut()).poll_write_vectored(cx, bufs)
    }

    fn is_write_vectored(&self) -> bool {
        let mut guard = self.stream.lock().unwrap();
        Pin::new(guard.deref_mut().get_mut()).is_write_vectored()
    }

    fn poll_write(
        self: Pin<&mut Self>,
        cx: &mut Context<'_>,
        buf: &[u8],
    ) -> Poll<Result<usize, io::Error>> {
        let mut guard = self.stream.lock().unwrap();
        Pin::new(guard.deref_mut().get_mut()).poll_write(cx, buf)
    }

    fn poll_flush(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Result<(), io::Error>> {
        let mut guard = self.stream.lock().unwrap();
        Pin::new(guard.deref_mut().get_mut()).poll_flush(cx)
    }

    fn poll_shutdown(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Result<(), io::Error>> {
        let mut guard = self.stream.lock().unwrap();
        Pin::new(guard.deref_mut().get_mut()).poll_shutdown(cx)
    }
}

pub struct TunTapSocket {}
impl TunTapSocket {
    pub async fn create(
        selector: Arc<Selector>,
        url: &str,
        hello: Hello,
    ) -> anyhow::Result<TunTapDriver> {
        // Create the remote client
        let (stream, _res) = tokio_tungstenite::connect_async(url).await?;
        let (mut tx, rx) = TungstensiteAdapter::new(stream).split();

        // Send the hello message
        tx.write_all(&bincode::serialize(&hello)?).await?;

        // Now pass it on to a remote networking adapter
        let (remote, remote_driver) =
            RemoteNetworking::new_from_stream_via_driver(Box::pin(tx), Box::pin(rx));
        let mut client = remote.bind_raw().await?;

        let iface = Iface::new("wasmer%d", Mode::Tun)?;
        cmd("ip", &["link", "set", "up", "dev", iface.name()])?;

        // Set non-blocking and wrap the MIO
        set_non_blocking(&iface)?;
        let handler = TunTapHandler::default();
        let mut source = MioWrapper {
            fd: iface.as_raw_fd(),
        };

        // Register interest in the read and write events
        let interest = InterestGuard::new(
            &selector,
            Box::new(handler.clone()),
            &mut source,
            mio::Interest::READABLE.add(mio::Interest::WRITABLE),
        )
        .map_err(io_err_into_net_error)?;

        // Set the client handler
        client.set_handler(Box::new(handler.clone()))?;

        let driver = TunTapDriver {
            iface,
            handler,
            send_queue: Default::default(),
            _interest: interest,
            client,
            remote_driver,
        };

        Ok(driver)
    }
}

fn set_non_blocking(iface: &Iface) -> anyhow::Result<()> {
    let fd = iface.as_raw_fd();
    let mut nonblock: libc::c_int = 1;
    let result = unsafe { libc::ioctl(fd, libc::FIONBIO, &mut nonblock) };
    if result == -1 {
        Err(std::io::Error::last_os_error().into())
    } else {
        Ok(())
    }
}

#[derive(Debug, Default)]
struct TunTapHandlerInner {
    wakers: Vec<Waker>,
}

#[derive(Debug, Clone, Default)]
struct TunTapHandler {
    inner: Arc<Mutex<TunTapHandlerInner>>,
}
impl InterestHandler for TunTapHandler {
    fn interest(&mut self, _interest: virtual_io::InterestType) {
        let mut guard = self.inner.lock().unwrap();
        guard.wakers.drain(..).for_each(Waker::wake);
    }
}

pub struct TunTapDriver {
    iface: Iface,
    handler: TunTapHandler,
    send_queue: VecDeque<Bytes>,
    _interest: InterestGuard,
    client: Box<dyn VirtualRawSocket + Sync + 'static>,
    remote_driver: RemoteNetworkingDriver,
}

impl Future for TunTapDriver {
    type Output = io::Result<()>;
    fn poll(mut self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Output> {
        // Run the remote networking
        loop {
            match Pin::new(&mut self.remote_driver).poll(cx) {
                Poll::Ready(()) => return Poll::Ready(Ok(())),
                Poll::Pending => break,
            }
        }

        // Add the waker before we drain all the the events
        // we need to read and send
        let inner = self.handler.inner.clone();
        let mut guard = inner.lock().unwrap();
        if guard.wakers.iter().any(|w| w.will_wake(cx.waker())) == false {
            guard.wakers.push(cx.waker().clone());
        }

        // First we drain the packet
        while let Some(packet) = self.send_queue.pop_front() {
            if self.client.try_send(&packet).is_ok() == false {
                self.send_queue.push_front(packet);
                break;
            }
        }

        // Now we drain all the packets from the interface (but only if we have room)
        if self.send_queue.is_empty() {
            loop {
                let mut chunk: [MaybeUninit<u8>; 10240] =
                    unsafe { MaybeUninit::uninit().assume_init() };
                let chunk_unsafe: &mut [MaybeUninit<u8>] = &mut chunk[..];
                let chunk_unsafe: &mut [u8] = unsafe { std::mem::transmute(chunk_unsafe) };

                match self.iface.recv(chunk_unsafe) {
                    Ok(0) => return Poll::Ready(Err(ErrorKind::ConnectionReset.into())),
                    Ok(data) => {
                        // Send the packet down the client
                        let packet = &chunk_unsafe[..data];
                        if self.client.try_send(packet).is_ok() == false {
                            self.send_queue.push_back(Bytes::copy_from_slice(packet));
                            break;
                        }
                        continue;
                    }
                    Err(err) if err.kind() == ErrorKind::WouldBlock => {
                        break;
                    }
                    Err(err) => return Poll::Ready(Err(err)),
                };
            }
        }

        // Drain the client into the interfacee
        loop {
            let mut chunk: [MaybeUninit<u8>; 10240] =
                unsafe { MaybeUninit::uninit().assume_init() };
            let chunk_unsafe: &mut [MaybeUninit<u8>] = &mut chunk[..];

            match self.client.try_recv(chunk_unsafe) {
                Ok(0) => return Poll::Ready(Err(ErrorKind::ConnectionReset.into())),
                Ok(data) => {
                    // Send the packet down the client
                    let chunk_unsafe: &mut [u8] = unsafe { std::mem::transmute(chunk_unsafe) };
                    let packet = &chunk_unsafe[..data];
                    self.iface.send(packet).ok();
                    continue;
                }
                Err(NetworkError::WouldBlock) => {
                    break;
                }
                Err(err) => {
                    tracing::error!("packet recv error - {}", err);
                    return Poll::Ready(Err(ErrorKind::Other.into()));
                }
            }
        }

        // Wait for some more interest or something to send
        Poll::Pending
    }
}

struct MioWrapper {
    fd: RawFd,
}

impl event::Source for MioWrapper {
    fn register(
        &mut self,
        registry: &Registry,
        token: Token,
        interests: Interest,
    ) -> io::Result<()> {
        SourceFd(&self.fd).register(registry, token, interests)
    }

    fn reregister(
        &mut self,
        registry: &Registry,
        token: Token,
        interests: Interest,
    ) -> io::Result<()> {
        SourceFd(&self.fd).reregister(registry, token, interests)
    }

    fn deregister(&mut self, registry: &Registry) -> io::Result<()> {
        SourceFd(&self.fd).deregister(registry)
    }
}
