(function() {var type_impls = {
"wasmer_c_api":[["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Clone-for-wasm_byte_vec_t\" class=\"impl\"><a class=\"src rightside\" href=\"src/wasmer_c_api/wasm_c_api/types/mod.rs.html#26\">source</a><a href=\"#impl-Clone-for-wasm_byte_vec_t\" class=\"anchor\">§</a><h3 class=\"code-header\">impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.81.0/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a> for <a class=\"struct\" href=\"wasmer_c_api/wasm_c_api/types/struct.wasm_byte_vec_t.html\" title=\"struct wasmer_c_api::wasm_c_api::types::wasm_byte_vec_t\">wasm_byte_vec_t</a></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.clone\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/wasmer_c_api/wasm_c_api/types/mod.rs.html#26\">source</a><a href=\"#method.clone\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.81.0/core/clone/trait.Clone.html#tymethod.clone\" class=\"fn\">clone</a>(&amp;self) -&gt; Self</h4></section></summary><div class='docblock'>Returns a copy of the value. <a href=\"https://doc.rust-lang.org/1.81.0/core/clone/trait.Clone.html#tymethod.clone\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.clone_from\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.0.0\">1.0.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/1.81.0/src/core/clone.rs.html#172\">source</a></span><a href=\"#method.clone_from\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.81.0/core/clone/trait.Clone.html#method.clone_from\" class=\"fn\">clone_from</a>(&amp;mut self, source: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.81.0/std/primitive.reference.html\">&amp;Self</a>)</h4></section></summary><div class='docblock'>Performs copy-assignment from <code>source</code>. <a href=\"https://doc.rust-lang.org/1.81.0/core/clone/trait.Clone.html#method.clone_from\">Read more</a></div></details></div></details>","Clone","wasmer_c_api::wasm_c_api::types::wasm_name_t","wasmer_c_api::wasm_c_api::types::wasm_message_t"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Drop-for-wasm_byte_vec_t\" class=\"impl\"><a class=\"src rightside\" href=\"src/wasmer_c_api/wasm_c_api/types/mod.rs.html#26\">source</a><a href=\"#impl-Drop-for-wasm_byte_vec_t\" class=\"anchor\">§</a><h3 class=\"code-header\">impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.81.0/core/ops/drop/trait.Drop.html\" title=\"trait core::ops::drop::Drop\">Drop</a> for <a class=\"struct\" href=\"wasmer_c_api/wasm_c_api/types/struct.wasm_byte_vec_t.html\" title=\"struct wasmer_c_api::wasm_c_api::types::wasm_byte_vec_t\">wasm_byte_vec_t</a></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.drop\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/wasmer_c_api/wasm_c_api/types/mod.rs.html#26\">source</a><a href=\"#method.drop\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.81.0/core/ops/drop/trait.Drop.html#tymethod.drop\" class=\"fn\">drop</a>(&amp;mut self)</h4></section></summary><div class='docblock'>Executes the destructor for this type. <a href=\"https://doc.rust-lang.org/1.81.0/core/ops/drop/trait.Drop.html#tymethod.drop\">Read more</a></div></details></div></details>","Drop","wasmer_c_api::wasm_c_api::types::wasm_name_t","wasmer_c_api::wasm_c_api::types::wasm_message_t"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-From%3CVec%3Cu8%3E%3E-for-wasm_byte_vec_t\" class=\"impl\"><a class=\"src rightside\" href=\"src/wasmer_c_api/wasm_c_api/types/mod.rs.html#26\">source</a><a href=\"#impl-From%3CVec%3Cu8%3E%3E-for-wasm_byte_vec_t\" class=\"anchor\">§</a><h3 class=\"code-header\">impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.81.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.81.0/alloc/vec/struct.Vec.html\" title=\"struct alloc::vec::Vec\">Vec</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.81.0/std/primitive.u8.html\">u8</a>&gt;&gt; for <a class=\"struct\" href=\"wasmer_c_api/wasm_c_api/types/struct.wasm_byte_vec_t.html\" title=\"struct wasmer_c_api::wasm_c_api::types::wasm_byte_vec_t\">wasm_byte_vec_t</a></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.from\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/wasmer_c_api/wasm_c_api/types/mod.rs.html#26\">source</a><a href=\"#method.from\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.81.0/core/convert/trait.From.html#tymethod.from\" class=\"fn\">from</a>(vec: <a class=\"struct\" href=\"https://doc.rust-lang.org/1.81.0/alloc/vec/struct.Vec.html\" title=\"struct alloc::vec::Vec\">Vec</a>&lt;<a class=\"type\" href=\"wasmer_c_api/wasm_c_api/types/type.wasm_byte_t.html\" title=\"type wasmer_c_api::wasm_c_api::types::wasm_byte_t\">wasm_byte_t</a>&gt;) -&gt; Self</h4></section></summary><div class='docblock'>Converts to this type from the input type.</div></details></div></details>","From<Vec<u8>>","wasmer_c_api::wasm_c_api::types::wasm_name_t","wasmer_c_api::wasm_c_api::types::wasm_message_t"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-wasm_byte_vec_t\" class=\"impl\"><a class=\"src rightside\" href=\"src/wasmer_c_api/wasm_c_api/types/mod.rs.html#26\">source</a><a href=\"#impl-wasm_byte_vec_t\" class=\"anchor\">§</a><h3 class=\"code-header\">impl <a class=\"struct\" href=\"wasmer_c_api/wasm_c_api/types/struct.wasm_byte_vec_t.html\" title=\"struct wasmer_c_api::wasm_c_api::types::wasm_byte_vec_t\">wasm_byte_vec_t</a></h3></section></summary><div class=\"impl-items\"><section id=\"method.set_buffer\" class=\"method\"><a class=\"src rightside\" href=\"src/wasmer_c_api/wasm_c_api/types/mod.rs.html#26\">source</a><h4 class=\"code-header\">pub fn <a href=\"wasmer_c_api/wasm_c_api/types/struct.wasm_byte_vec_t.html#tymethod.set_buffer\" class=\"fn\">set_buffer</a>(&amp;mut self, buffer: <a class=\"struct\" href=\"https://doc.rust-lang.org/1.81.0/alloc/vec/struct.Vec.html\" title=\"struct alloc::vec::Vec\">Vec</a>&lt;<a class=\"type\" href=\"wasmer_c_api/wasm_c_api/types/type.wasm_byte_t.html\" title=\"type wasmer_c_api::wasm_c_api::types::wasm_byte_t\">wasm_byte_t</a>&gt;)</h4></section><section id=\"method.as_slice\" class=\"method\"><a class=\"src rightside\" href=\"src/wasmer_c_api/wasm_c_api/types/mod.rs.html#26\">source</a><h4 class=\"code-header\">pub fn <a href=\"wasmer_c_api/wasm_c_api/types/struct.wasm_byte_vec_t.html#tymethod.as_slice\" class=\"fn\">as_slice</a>(&amp;self) -&gt; &amp;[<a class=\"type\" href=\"wasmer_c_api/wasm_c_api/types/type.wasm_byte_t.html\" title=\"type wasmer_c_api::wasm_c_api::types::wasm_byte_t\">wasm_byte_t</a>]</h4></section><section id=\"method.as_uninit_slice\" class=\"method\"><a class=\"src rightside\" href=\"src/wasmer_c_api/wasm_c_api/types/mod.rs.html#26\">source</a><h4 class=\"code-header\">pub fn <a href=\"wasmer_c_api/wasm_c_api/types/struct.wasm_byte_vec_t.html#tymethod.as_uninit_slice\" class=\"fn\">as_uninit_slice</a>(&amp;mut self) -&gt; &amp;mut [<a class=\"union\" href=\"https://doc.rust-lang.org/1.81.0/core/mem/maybe_uninit/union.MaybeUninit.html\" title=\"union core::mem::maybe_uninit::MaybeUninit\">MaybeUninit</a>&lt;<a class=\"type\" href=\"wasmer_c_api/wasm_c_api/types/type.wasm_byte_t.html\" title=\"type wasmer_c_api::wasm_c_api::types::wasm_byte_t\">wasm_byte_t</a>&gt;]</h4></section><section id=\"method.take\" class=\"method\"><a class=\"src rightside\" href=\"src/wasmer_c_api/wasm_c_api/types/mod.rs.html#26\">source</a><h4 class=\"code-header\">pub fn <a href=\"wasmer_c_api/wasm_c_api/types/struct.wasm_byte_vec_t.html#tymethod.take\" class=\"fn\">take</a>(&amp;mut self) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.81.0/alloc/vec/struct.Vec.html\" title=\"struct alloc::vec::Vec\">Vec</a>&lt;<a class=\"type\" href=\"wasmer_c_api/wasm_c_api/types/type.wasm_byte_t.html\" title=\"type wasmer_c_api::wasm_c_api::types::wasm_byte_t\">wasm_byte_t</a>&gt;</h4></section></div></details>",0,"wasmer_c_api::wasm_c_api::types::wasm_name_t","wasmer_c_api::wasm_c_api::types::wasm_message_t"]]
};if (window.register_type_impls) {window.register_type_impls(type_impls);} else {window.pending_type_impls = type_impls;}})()