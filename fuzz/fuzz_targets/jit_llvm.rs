#![no_main]

use libfuzzer_sys::fuzz_target;
use wasmer::{imports, CompilerConfig, Instance, Module, Store};
use wasmer_compiler_llvm::LLVM;
use wasmer_engine_jit::JIT;
use wasm_smith::Module as FuzzModule;

fuzz_target!(|module: FuzzModule| {
    let wasm_bytes = module.to_bytes();
    let mut compiler = LLVM::default();
    compiler.canonicalize_nans(true);
    compiler.enable_verifier();
    let store = Store::new(&JIT::new(compiler).engine());
    let module = Module::new(&store, &wasm_bytes).unwrap();
    Instance::new(&module, &imports! {}).unwrap();
});
