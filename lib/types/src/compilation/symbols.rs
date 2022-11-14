//! This module define the required structures for compilation symbols.
use crate::{
    entity::{EntityRef, PrimaryMap},
    CompileModuleInfo, FunctionIndex, LocalFunctionIndex, OwnedDataInitializer,
    SectionIndex, SignatureIndex,
};
#[cfg(feature = "enable-rkyv")]
use crate::{
    DeserializeError, SerializeError,
};
#[cfg(feature = "rkyv")]
use rkyv::{
    archived_value, de::deserializers::SharedDeserializeMap, ser::serializers::AllocSerializer,
    ser::Serializer as RkyvSerializer, Archive, Deserialize as RkyvDeserialize,
    Serialize as RkyvSerialize,
};
#[cfg(feature = "enable-serde")]
use serde::{Deserialize, Serialize};

/// The kinds of wasmer_types objects that might be found in a native object file.
#[derive(
    Copy,
    Clone,
    PartialEq,
    Eq,
    Hash,
    PartialOrd,
    Ord,
    Debug,
)]
#[cfg_attr(feature = "enable-serde", derive(Serialize, Deserialize))]
#[cfg_attr(feature = "enable-rkyv", derive(RkyvSerialize, RkyvDeserialize, Archive))]
#[cfg_attr(feature = "enable-rkyv", archive(as = "Self"))]
pub enum Symbol {
    /// A function defined in the wasm.
    LocalFunction(LocalFunctionIndex),

    /// A wasm section.
    Section(SectionIndex),

    /// The function call trampoline for a given signature.
    FunctionCallTrampoline(SignatureIndex),

    /// The dynamic function trampoline for a given function.
    DynamicFunctionTrampoline(FunctionIndex),
}

/// This trait facilitates symbol name lookups in a native object file.
pub trait SymbolRegistry: Send + Sync {
    /// Given a `Symbol` it returns the name for that symbol in the object file
    fn symbol_to_name(&self, symbol: Symbol) -> String;

    /// Given a name it returns the `Symbol` for that name in the object file
    ///
    /// This function is the inverse of [`SymbolRegistry::symbol_to_name`]
    fn name_to_symbol(&self, name: &str) -> Option<Symbol>;
}

/// Serializable struct that represents the compiled metadata.
#[derive(Debug)]
#[cfg_attr(feature = "enable-serde", derive(Serialize, Deserialize))]
#[cfg_attr(feature = "enable-rkyv", derive(RkyvSerialize, RkyvDeserialize, Archive))]
pub struct ModuleMetadata {
    /// Compile info
    pub compile_info: CompileModuleInfo,
    /// Prefix for function etc symbols
    pub prefix: String,
    /// Data initializers
    pub data_initializers: Box<[OwnedDataInitializer]>,
    /// The function body lengths (used to find function by address)
    pub function_body_lengths: PrimaryMap<LocalFunctionIndex, u64>,
    /// CPU features used (See [`CpuFeature`])
    pub cpu_features: u64,
}

/// A simple metadata registry
pub struct ModuleMetadataSymbolRegistry {
    /// Symbol prefix stirng
    pub prefix: String,
}

impl ModuleMetadata {
    /// Get mutable ref to compile info and a copy of the registry
    pub fn split(&mut self) -> (&mut CompileModuleInfo, ModuleMetadataSymbolRegistry) {
        let compile_info = &mut self.compile_info;
        let symbol_registry = ModuleMetadataSymbolRegistry {
            prefix: self.prefix.clone(),
        };
        (compile_info, symbol_registry)
    }

    /// Returns symbol registry.
    pub fn get_symbol_registry(&self) -> ModuleMetadataSymbolRegistry {
        ModuleMetadataSymbolRegistry {
            prefix: self.prefix.clone(),
        }
    }
    /// Serialize a Module into bytes
    /// The bytes will have the following format:
    /// RKYV serialization (any length) + POS (8 bytes)
    #[cfg(feature = "enable-rkyv")]
    pub fn serialize(&self) -> Result<Vec<u8>, SerializeError> {
        let mut serializer = AllocSerializer::<4096>::default();
        let pos = serializer
            .serialize_value(self)
            .map_err(|err| SerializeError::Generic(format!("{}", err)))? as u64;
        let mut serialized_data = serializer.into_serializer().into_inner();
        serialized_data.extend_from_slice(&pos.to_le_bytes());
        Ok(serialized_data.to_vec())
    }

    /// Deserialize a Module from a slice.
    /// The slice must have the following format:
    /// RKYV serialization (any length) + POS (8 bytes)
    ///
    /// # Safety
    ///
    /// This method is unsafe since it deserializes data directly
    /// from memory.
    /// Right now we are not doing any extra work for validation, but
    /// `rkyv` has an option to do bytecheck on the serialized data before
    /// serializing (via `rkyv::check_archived_value`).
    #[cfg(feature = "enable-rkyv")]
    pub unsafe fn deserialize(metadata_slice: &[u8]) -> Result<Self, DeserializeError> {
        let archived = Self::archive_from_slice(metadata_slice)?;
        Self::deserialize_from_archive(archived)
    }

    /// # Safety
    ///
    /// This method is unsafe.
    /// Please check `ModuleMetadata::deserialize` for more details.
    #[cfg(feature = "enable-rkyv")]
    unsafe fn archive_from_slice(
        metadata_slice: &[u8],
    ) -> Result<&ArchivedModuleMetadata, DeserializeError> {
        if metadata_slice.len() < 8 {
            return Err(DeserializeError::Incompatible(
                "invalid serialized ModuleMetadata".into(),
            ));
        }
        let mut pos: [u8; 8] = Default::default();
        pos.copy_from_slice(&metadata_slice[metadata_slice.len() - 8..metadata_slice.len()]);
        let pos: u64 = u64::from_le_bytes(pos);
        Ok(archived_value::<Self>(
            &metadata_slice[..metadata_slice.len() - 8],
            pos as usize,
        ))
    }

    /// Deserialize a compilation module from an archive
    #[cfg(feature = "enable-rkyv")]
    pub fn deserialize_from_archive(
        archived: &ArchivedModuleMetadata,
    ) -> Result<Self, DeserializeError> {
        let mut deserializer = SharedDeserializeMap::new();
        RkyvDeserialize::deserialize(archived, &mut deserializer)
            .map_err(|e| DeserializeError::CorruptedBinary(format!("{:?}", e)))
    }
}

impl SymbolRegistry for ModuleMetadataSymbolRegistry {
    fn symbol_to_name(&self, symbol: Symbol) -> String {
        match symbol {
            Symbol::LocalFunction(index) => {
                format!("wasmer_function_{}_{}", self.prefix, index.index())
            }
            Symbol::Section(index) => format!("wasmer_section_{}_{}", self.prefix, index.index()),
            Symbol::FunctionCallTrampoline(index) => {
                format!(
                    "wasmer_trampoline_function_call_{}_{}",
                    self.prefix,
                    index.index()
                )
            }
            Symbol::DynamicFunctionTrampoline(index) => {
                format!(
                    "wasmer_trampoline_dynamic_function_{}_{}",
                    self.prefix,
                    index.index()
                )
            }
        }
    }

    fn name_to_symbol(&self, name: &str) -> Option<Symbol> {
        if let Some(index) = name.strip_prefix(&format!("wasmer_function_{}_", self.prefix)) {
            index
                .parse::<u32>()
                .ok()
                .map(|index| Symbol::LocalFunction(LocalFunctionIndex::from_u32(index)))
        } else if let Some(index) = name.strip_prefix(&format!("wasmer_section_{}_", self.prefix)) {
            index
                .parse::<u32>()
                .ok()
                .map(|index| Symbol::Section(SectionIndex::from_u32(index)))
        } else if let Some(index) =
            name.strip_prefix(&format!("wasmer_trampoline_function_call_{}_", self.prefix))
        {
            index
                .parse::<u32>()
                .ok()
                .map(|index| Symbol::FunctionCallTrampoline(SignatureIndex::from_u32(index)))
        } else if let Some(index) = name.strip_prefix(&format!(
            "wasmer_trampoline_dynamic_function_{}_",
            self.prefix
        )) {
            index
                .parse::<u32>()
                .ok()
                .map(|index| Symbol::DynamicFunctionTrampoline(FunctionIndex::from_u32(index)))
        } else {
            None
        }
    }
}
