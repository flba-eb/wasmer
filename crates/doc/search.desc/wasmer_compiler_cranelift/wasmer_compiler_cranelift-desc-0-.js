searchState.loadedDescShard("wasmer_compiler_cranelift", 0, "A WebAssembly <code>Compiler</code> implementation using Cranelift.\nGlobal configuration options used to create an …\nA compiler that compiles a WebAssembly module with …\nPossible optimization levels for the Cranelift codegen …\nOffset to the defined memory.\nOffset to the imported memory.\nMemory definition offset in the VMContext structure.\nModuleInfo <code>vmctx</code> related info.\nNo optimizations performed, minimizes compilation time by …\nNot available.\nGenerates the fastest possible code, but may take longer.\nSimilar to <code>speed</code>, but also performs transformations aimed …\nVersion number of this crate.\nValue ranges for functions.\nSupport for compiling with Cranelift.\nHeaps to implement WebAssembly linear memories.\nCreate a trampoline for invoking a WebAssembly function.\nThe memory definition offset in the VMContext structure.\nThe middleware chain.\nThe functions stack slots.\nTools for translating wasm function bytecode to Cranelift …\nA compiler that compiles a WebAssembly module with …\nCompile the module using Cranelift, producing a …\nGets the WebAssembly features for this Compiler\nReturns the argument unchanged.\nGet the middlewares for this compiler\nCalls <code>U::from(self)</code>.\nCreates a new Cranelift compiler\nTranslates the Cranelift IR TrapCode into generic Trap Code\nGlobal configuration options used to create an …\nPossible optimization levels for the Cranelift codegen …\nNo optimizations performed, minimizes compilation time by …\nGenerates the fastest possible code, but may take longer.\nSimilar to <code>speed</code>, but also performs transformations aimed …\nEnable NaN canonicalization.\nTransform it into the compiler\nGenerates the flags for the compiler\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nGenerates the ISA for the provided target\nThe middleware chain.\nCreates a new configuration object with the default …\nThe optimization levels when optimizing the IR.\nPushes a middleware onto the back of the middleware chain.\nData structures to provide transformation of the source\nOffset to the defined memory.\nOffset to the imported memory.\nMemory definition offset in the VMContext structure.\nModuleInfo <code>vmctx</code> related info.\nNot available.\nStack slots for functions.\nValue ranges for functions.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nThe memory definition offset in the VMContext structure.\nThe functions stack slots.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nThe <code>FuncEnvironment</code> implementation for use by the …\nThe external function signature for implementing wasm’s …\nThe external function signature for implementing wasm’s …\nReturns the argument unchanged.\nThe external function signature for implementing wasm’s …\nCompute an <code>ir::ExternalName</code> for a given wasm function …\nReturn the memory.atomic.notify function signature to call …\nReturn the memory.atomic.wait32 function signature to call …\nReturn the memory.atomic.wait64 function signature to call …\nReturn the memory.grow function signature to call for the …\nReturn the memory.size function signature to call for the …\nReturn the table.grow function signature to call for the …\nReturn the memory.size function signature to call for the …\nHeaps implementing WebAssembly linear memories.\nCalls <code>U::from(self)</code>.\nThe external function signature for implementing wasm’s …\nThe external function signature for implementing wasm’s …\nThe external function signature for implementing wasm’s …\nThe external function signature for implementing wasm’s …\nThe external function signature for implementing wasm’s …\nThe external function signature for implementing wasm’s …\nThe external function signature for implementing wasm’s …\nThe external function signature for implementing wasm’s …\nThe memory styles\nThe module-level environment which this function-level …\nOffsets to struct fields accessed by JIT code.\nThe module function signatures\nThe external function signature for implementing wasm’s …\nThe external function signature for implementing wasm’s …\nThe external function signature for implementing wasm’s …\nThe external function signature for implementing wasm’s …\nThe external function signature for implementing wasm’s …\nThe external function signature for implementing wasm’s …\nThe external function signature for implementing wasm’s …\nCranelift tables we have created to implement Wasm tables.\nTarget-specified configuration.\nTranslates load of builtin function and returns a pair of …\nThe type of the <code>current_elements</code> field.\nA stack tracking the type of local variables.\nThe Cranelift global holding the vmctx address.\nA dynamic heap can be relocated to a different base …\nAn opaque reference to a [<code>HeapData</code>][crate::HeapData].\nA heap implementing a WebAssembly linear memory.\nStyle of heap including style-specific information.\nA static heap has a fixed base address and a number of …\nReturn the underlying index value as a <code>u32</code>.\nThe address of the start of the heap’s storage.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCreate a new instance from a <code>u32</code>.\nThe index type for the heap.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nThe maximum heap size in bytes.\nThe memory type for the pointed-to memory, if using …\nGuaranteed minimum heap size in bytes. Heap accesses …\nSize in bytes of the offset-guard pages following the heap.\nThe log2 of this memory’s page size.\nHeap style, with additional style-specific info.\nHeap bound in bytes. The offset-guard pages are allocated …\nGlobal value providing the current bound of the heap in …\nResizable table.\nNon-resizable table.\nAn implementation of a WebAssembly table.\nSize of a WebAssembly table, in elements.\nGlobal value giving the address of the start of the table.\nGet a CLIF value representing the current bounds of this …\nThe size of the table, in elements.\nThe size of a table element, in bytes.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nReturn a CLIF value containing a native pointer to the …\nNon-resizable tables have a constant size known at compile …\nResizable tables declare a Cranelift global value to load …\nStructure used for translating a series of functions into …\nA trampoline generator for calling dynamic host functions …\nReturns the argument unchanged.\nA trampoline generator for calling Wasm functions easily.\nCalls <code>U::from(self)</code>.\nCreates a <code>FunctionBuilderContext</code> structure. The structure …\nCreate a trampoline for invoking a WebAssembly function.\nCreate a trampoline for invoking a WebAssembly function.\nThis module contains the bulk of the interesting code …\nAll the runtime support necessary for the wasm to …\nWebAssembly module and function translation state.\nStandalone WebAssembly to Cranelift IR translator.\nHelper functions and structures for the translation.\nA <code>Compilation</code> contains the compiled function bodies for a …\nLike <code>Option&lt;T&gt;</code> but specifically for passing information …\nThe Wasm execution state is reachable, here is a <code>T</code>.\nThe Wasm execution state has been determined to be …\nLike <code>bitcast_wasm_returns</code>, but for the parameters being …\nA helper for bitcasting a sequence of return values for …\nImplementation of Wasm to CLIF memory access translation.\nThe same but for a <code>brif</code> instruction.\nGenerate a <code>jump</code> instruction, but first cast all 128-bit …\nCast to I8X16, any vector values in <code>values</code> that are of “…\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nSome SIMD operations only operate on I8X16 in CLIF; this …\nA helper for popping and bitcasting a single value; since …\nA helper for popping and bitcasting two values; since SIMD …\nThis function is a generalized helper for validating that …\nLike <code>prepare_addr</code> but for atomic accesses.\nTranslate a load instruction.\nTranslates wasm operators into Cranelift IR instructions. …\nTranslate a store instruction.\nDeals with a Wasm instruction located in an unreachable …\nDetermine the returned value type of a WebAssembly operator\nGiven a <code>Reachability&lt;T&gt;</code>, unwrap the inner <code>T</code> or, when …\nWhich facts do we want to emit for proof-carrying code, if …\nDynamic bounds-check, with actual memory size (the …\nA 32-bit static memory with the given size.\nHelper used to emit bounds checks (as necessary) and …\nEmit code for the native address computation of a Wasm …\nEmit explicit checks on the given out-of-bounds condition …\nReturns the argument unchanged.\nGet the bound of a dynamic heap as an <code>ir::Value</code>.\nCalls <code>U::from(self)</code>.\nThis is a constant global with a value known at compile …\nThis is a global variable that needs to be handled by the …\nEnvironment affecting the translation of a single …\nThe value of a WebAssembly global variable.\nThis is a variable in memory that should be referenced …\nUse normal return instructions as needed.\nHow to return from functions.\nEnvironment affecting the translation of a WebAssembly.\nOptional callback for the <code>FunctionEnvMutironment</code> …\nInserts code before a load.\nInserts code before a store.\nOptional callback for the <code>FunctionEnvMutironment</code> …\nOptional callback for the <code>FuncEnvironment</code> performing this …\nReturns the argument unchanged.\nReturns the argument unchanged.\nGet the type of a function with the given signature index.\nGet the type of the local at the given index.\nGet the type of the global at the given index.\nGet the type of the local at the given index.\nGet the types of all the current locals.\nInserts code before a function return.\nWhether to enable Spectre mitigations for heap accesses.\nGet the heaps for this function environment.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nIs the given parameter of the given function a wasm-level …\nIs the given return of the given function a wasm-level …\nSet up an external function definition in the preamble of …\nSet up the necessary preamble definitions in <code>func</code> to …\nSet up the necessary preamble definitions in <code>func</code> to …\nSet up a signature definition in the preamble of <code>func</code> that …\nGet the size of a native pointer, in bytes.\nGet the Cranelift integer type to use for native pointers.\nWhether to add proof-carrying-code facts to verify memory …\nPush a local declaration on to the stack to track the type …\nPush locals for a the params of a function on to the stack.\nGet the Cranelift reference type to use for native …\nShould the code be structured to use a single …\nGet the information needed to produce Cranelift IR for the …\nTranslate an <code>atomic.notify</code> WebAssembly instruction. The …\nTranslate an <code>i32.atomic.wait</code> or <code>i64.atomic.wait</code> …\nTranslate a <code>call</code> WebAssembly instruction at <code>pos</code>.\nTranslate a <code>call_indirect</code> WebAssembly instruction at <code>pos</code>.\nTranslate a <code>global.get</code> WebAssembly instruction at <code>pos</code> for …\nTranslate a <code>global.set</code> WebAssembly instruction at <code>pos</code> for …\nTranslate a <code>data.drop</code> WebAssembly instruction.\nTranslate a <code>elem.drop</code> WebAssembly instruction.\nEmit code at the beginning of every wasm loop.\nTranslate a <code>memory.copy</code> WebAssembly instruction.\nTranslate a <code>memory.fill</code> WebAssembly instruction.\nTranslate a <code>memory.grow</code> WebAssembly instruction.\nTranslate a <code>memory.init</code> WebAssembly instruction.\nTranslates a <code>memory.size</code> WebAssembly instruction.\nTranslate a <code>ref.func</code> WebAssembly instruction.\nTranslate a <code>ref.is_null</code> WebAssembly instruction.\nTranslate a <code>ref.null T</code> WebAssembly instruction.\nTranslate a <code>table.copy</code> WebAssembly instruction.\nTranslate a <code>table.fill</code> WebAssembly instruction.\nTranslate a <code>table.get</code> WebAssembly instruction.\nTranslate a <code>table.grow</code> WebAssembly instruction.\nTranslate a <code>table.init</code> WebAssembly instruction.\nTranslate a <code>table.set</code> WebAssembly instruction.\nTranslate a <code>table.size</code> WebAssembly instruction.\nInserts code before updating a global.\nThe address of the global variable storage.\nAn offset to add to the address.\nThe global variable’s type.\nA control stack frame can be an <code>if</code>, a <code>block</code> or a <code>loop</code>, …\nInformation about the presence of an associated <code>else</code> for …\nContains information passed along during a function’s …\nThe <code>if</code> does not already have an <code>else</code> block.\nWe have already allocated an <code>else</code> block.\nA stack of active control flow operations at this point in …\nHelper to ensure the stack size is at least as big as <code>n</code>; …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nGet the <code>FuncRef</code> reference that should be used to make a …\nGet the <code>GlobalVariable</code> reference that should be used to …\nGet the <code>Heap</code> reference that should be used to access …\nGet the <code>SigRef</code> reference that should be used to make an …\nInitialize the state for compiling a function with the …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nConstruct a new, empty, <code>FuncTranslationState</code>\nPrivate helper. Use <code>truncate_value_stack_to_else_params()</code> …\nPeek at the top of the stack without popping it.\nPeek at the top <code>n</code> values on the stack in the order they …\nPeek at the top <code>n</code> values on the stack in the order they …\nPop one value.\nPop two values. Return them in the order they were pushed.\nPop three values. Return them in the order they were …\nPop the top <code>n</code> values on the stack.\nPush a value.\nPush a block on the control stack.\nPush an if on the control stack.\nPush a loop on the control stack.\nPush multiple values.\nTrue if the current translation state expresses reachable …\nIs the current translation state still reachable? This is …\nA stack of values corresponding to the active values in …\nPop values from the value stack so that it is left at the …\nPop values from the value stack so that it is left at the …\nWhat was the reachability at the end of the consequent?\nWas the head of the <code>if</code> reachable?\nIf we discover that we need an <code>else</code> block, this is the jump\nThis is the <code>else</code> block.\nThe placeholder block we’re replacing.\nWebAssembly to Cranelift IR function translator.\nGet the current source location from a reader.\nDeclare <code>count</code> local variables of the same type, starting …\nDeclare local variables for the signature parameters that …\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCreate a new translator.\nParse the function body in <code>reader</code>.\nParse the local variable declarations that precede the …\nTranslate a binary WebAssembly function.\nTranslate a binary WebAssembly function from a …\nCreate a <code>Block</code> with the given Wasm parameters.\nTurns a <code>wasmparser</code> <code>f32</code> into a <code>Cranelift</code> one.\nTurns a <code>wasmparser</code> <code>f64</code> into a <code>Cranelift</code> one.\nSpecial VMContext value label. It is tracked as …\nTransform Cranelift LibCall into runtime LibCall\nTransform Cranelift Reloc to compiler Relocation\nHelper function translating wasmparser types to Cranelift …\nHelper function translate a Function signature into …\nHelper function translating wasmparser types to Cranelift …\nCranelift specific unwind info\nDwarf FDE\nNo Unwind info attached\nWindows Unwind info\nConstructs unwind info object from Cranelift IR\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nTransform the <code>CraneliftUnwindInfo</code> to the Windows format.")