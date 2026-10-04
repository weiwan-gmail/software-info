# 06. Cross-language, embedding, and choosing

> **Same:** all three can call each other through a C ABI; all can do “performance core + other-language shell.”  
> **Different:** tool maturity and pain points differ; **the default should be finishing in one language**. Cross-language is an intentional cost.

---

## 1. FFI matrix (practical)

| From \ to | Go | Rust | C++ |
|---|---|---|---|
| **Go** | same-process package | cgo → `extern "C"` | cgo → `extern "C"` |
| **Rust** | `cdylib` + cgo | same crate / cdylib | `cxx` / `bindgen` / `cbindgen` |
| **C++** | wrap as C API + cgo | `cxx` / bindgen | same process / modules |

### Minimal C ABI sketch

```cpp
// core.h — C++ implementation, C export
#ifdef __cplusplus
extern "C" {
#endif
int core_set_port(int p);
int core_get_port(void);
#ifdef __cplusplus
}
#endif
```

```rust
// Rust export
#[no_mangle]
pub unsafe extern "C" fn core_set_port(p: i32) -> i32 { /* ... */ 0 }
```

```go
// Go consumer (cgo)
// #include "core.h"
// import "C"
// C.core_set_port(8080)
```

**Discipline:** pass only POD / pointers with explicit lifetime; strings as “pointer+length” or caller-allocated; errors as error codes — do not throw exceptions across languages.

---

## 2. Common combos (shapes people have used in production)

| Combo | Representative path | When it is worth it |
|---|---|---|
| Rust core + Flutter UI | flutter_rust_bridge; RustDesk | polished mobile UI + systems-level core |
| Rust core + Tauri Web UI | Tauri commands | strong frontend team |
| Rust ↔ Qt | cxx-qt (KDAB) | existing QML/Widgets assets |
| C++ core + Slint UI | official C++ API | want declarative UI without dropping C++ |
| C++ core + Python scripts | pybind11 / nanobind | research/plugin scripts |
| Go service + any UI | HTTP/gRPC local API | **process isolation**, avoid cgo |
| Go + Wails | same repo | desktop tools, Web skin |

**Opinion (opinion):** for a local desktop utility, **prefer a single language**; spend the cross-language budget on “already-large core” or “must be Flutter/Qt.”

---

## 3. Embedding and runtimes

| Topic | Go | Rust | C++ |
|---|---|---|---|
| Embed scripts | goja (JS), Lua bindings | mlua, rhai | Lua, Python, V8 |
| Wasm | compiling to Wasm is limited; wazero runs Wasm | first-class `wasm32`; component model evolving | WASI SDK / Emscripten |
| Embed an interpreter | uncommon | uncommon | common as an engine host |

---

## 4. When to pick which language (decision table)

| If you care more about… | Lean | Why |
|---|---|---|
| Fastest path to a desktop tool with GUI | Go+Fyne or Rust+egui | short closed loop |
| No data races, long-lived evolving library | Rust | types and ownership |
| Existing Qt/Unreal/lots of C++ | C++ | reuse and hiring/assets |
| High-concurrency network surface, single-binary deploy | Go | std HTTP + goroutine |
| Embedded GUI / declarative | Slint (Rust or C++) | designed for this |
| Property panel + multiple skins | **any core** + schema adapter | language is secondary |
| Systems programming + fine ABI control | C++ or Rust | |
| Team is all TS | Wails/Tauri is faster than learning QML | borrow a Web skin |

### Anti-patterns

- Stacking three FFI layers in a small tool for “showing off.”  
- Heavy compute on the GUI thread without throwing it onto a channel.  
- Starting a new project on RxCpp (stall risk).  
- Using Go `plugin` as a cross-platform extension plan.

---

## 5. Relation to the other files in this directory

| Question | Read |
|---|---|
| Will syntax get in the way | [01-syntax.md](01-syntax.md) |
| How to split core/skin across packages | [02-package-tooling.md](02-package-tooling.md) |
| Which libraries are missing | [03-libraries.md](03-libraries.md) |
| How to organize the code | [04-design-patterns.md](04-design-patterns.md) |
| How to bind controls | [05-gui-binding.md](05-gui-binding.md) |

---

## 6. Deferred / gaps

- No isomorphic three-language “settings-core” benchmark repo yet (can be opened later).  
- go-slint / the official Go binding PR was not fully evaluated (marked experimental).  
- Swift/Kotlin/C# are not compared — out of scope.  
- Licensing and dual-license commercial terms: no prices; check LICENSE yourself before use.
