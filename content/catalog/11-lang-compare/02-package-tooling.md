# 02. Package management and toolchain: Go · Rust · C++

> Teaching layer (2026-10-04 PT): read **Plain** and **Picture** first in each section; terms come after. First-read path: [00-how-to-read.md](00-how-to-read.md). Code blocks are all illustrative.

> **Same:** all have a “declare deps → resolve → lock → build → test” pipeline; all support local replace and multi-package work.  
> **Different:** Go / Rust ship an **integrated, language-owned** tool; C++ is a **CMake (or xmake/meson/bazel) + package manager (Conan/vcpkg/…)** mix, and the choice cost is highest.

References (public docs): [Go Modules Reference](https://go.dev/ref/mod) · [Cargo Book](https://doc.rust-lang.org/cargo/) · [Conan](https://docs.conan.io/) · [vcpkg](https://vcpkg.io/) · [xmake](https://xmake.io/) · [CMake](https://cmake.org/cmake/help/latest/)

Do not invent prices. Commercial artifact stores (Artifactory and similar) are recorded only as “self-hostable / subscription” form.

---

## 1. Overview

**Plain:** All three languages write “who I depend on” into a list, then compile from that list.

**Picture:** Before a group assignment, write a materials list: who brings paper, who brings glue. Hand-in is checked against that list.

| | Go | Rust | C++ |
|---|---|---|---|
| Manifest | `go.mod` + `go.sum` | `Cargo.toml` + `Cargo.lock` | Depends on the tool: `conanfile` / `vcpkg.json` / `xmake.lua` + `CMakeLists.txt` |
| Official registry | proxy.golang.org / sum DB | crates.io | No single official one; ConanCenter, vcpkg ports |
| Build command | `go build` / `go test` | `cargo build` / `cargo test` | `cmake --build` or `xmake` / `ninja` |
| Docs | `go doc` / pkg.go.dev | `cargo doc` / docs.rs | Doxygen / Sphinx and other externals |
| Formatting | `gofmt` / `goimports` | `rustfmt` | `clang-format` (by convention) |
| Lint | `go vet` / staticcheck | `clippy` | clang-tidy / IDEs |


Minimal shape of the three manifests (illustrative, not a complete project you can copy):

```go
// Go — illustrative
// module example.com/app
//
// go 1.22
//
// require example.com/mod v1.2.3
```

```toml
# Rust — illustrative
# [package]
# name = "app"
# version = "0.1.0"
# edition = "2021"
```

```cmake
# C++ — illustrative
cmake_minimum_required(VERSION 3.20)
project(app)
add_executable(app src/main.cpp)
```
---

## 2. Everyday dependency ops (side by side)

**Plain:** Day to day is three steps: add a library, lock the version, then compile.

**Picture:** Borrowing a library book: register the title, note the edition, then you may use it.

```bash
# Go
go get example.com/mod@v1.2.3
go mod tidy
go build ./...

# Rust
cargo add serde --features derive
cargo update
cargo build --release

# C++ (Conan sketch)
conan install . -pr:b=default -pr:h=default --build=missing
cmake -S . -B build -DCMAKE_TOOLCHAIN_FILE=...
cmake --build build
```

```bash
# C++ (vcpkg manifest-mode sketch)
# After declaring deps in vcpkg.json:
cmake -S . -B build -DCMAKE_TOOLCHAIN_FILE=$VCPKG_ROOT/scripts/buildsystems/vcpkg.cmake
cmake --build build
```

```lua
-- C++ (xmake sketch)
add_requires("fmt", "spdlog")
target("app")
  set_kind("binary")
  add_files("src/*.cpp")
  add_packages("fmt", "spdlog")
```

---

## 3. Workspace / multi-package

**Plain:** One repo can hold several small packages at once — “core” and “UI” — edit them together, compile them together.

**Picture:** One workbook with a math column and an English column. Same cover; the homework is handed in separately.

> **Same:** develop several modules in one repo and share resolution.  
> **Different:** filenames and the habit of “whether you edit each child manifest” differ.

### Go: `go.work` (1.18+)

```text
go 1.22

use (
    ./core
    ./cmd/app
    ./adapters/fyneui
)
```

- Local joint debugging does **not** require `replace` in each `go.mod` (`go.work` overrides).  
- Publish still follows each module’s `go.mod`.  
- Docs: [Get familiar with workspaces](https://go.dev/blog/get-familiar-with-workspaces)

### Rust: Cargo workspace

```toml
[workspace]
members = ["core", "cli", "gui-adapter"]
resolver = "2"
```

- Shared `Cargo.lock` (the usual convention for binary/workspace).  
- Path deps: `core = { path = "../core" }`.

### C++: no unified “workspace” semantics

| Tool | How multi-package works |
|---|---|
| CMake | `add_subdirectory` / `FetchContent` / superbuild |
| Conan | multiple recipes, lockfile, `conan workspace` (still evolving; follow current docs) |
| vcpkg | manifest + overlays; ports tree |
| xmake | `includes` / multiple `target`s / repo packages |

**Wei note:** `settings-core` as one package, `gui-qt` / `gui-fyne` as others, joint-debug with workspace/path deps — smooth in Go/Rust; C++ needs a CMake target graph + a package manager first.

---

## 4. Conditional compilation and “feature flags”

**Plain:** The same source can compile only one piece of itself, by platform or by a switch.

**Picture:** Extra questions on a test: only if you tick them. Unticked pages are not bound into your answer booklet.

> **Same:** all can trim by platform / optional features.  
> **Different:** first-class-ness: Cargo features ≈ Go build tags ≈ C++ macros/CMake options (the last is the most scattered).

```go
// Go: file-level build tag
//go:build linux && cgo

package serial
```

```bash
go build -tags=debug,gtk
```

```toml
# Rust: Cargo.toml
[features]
default = ["gui"]
gui = ["dep:eframe"]
serialize = ["serde"]
```

```rust
#[cfg(feature = "gui")]
fn show() { /* ... */ }

#[cfg(target_os = "windows")]
fn os_hint() {}
```

```cmake
# C++: CMake option + macro
option(APP_ENABLE_GUI "Build GUI adapter" ON)
if(APP_ENABLE_GUI)
  target_compile_definitions(core PUBLIC APP_ENABLE_GUI=1)
endif()
```

```cpp
#if defined(APP_ENABLE_GUI)
// ...
#endif
```

---

## 5. Build / test / bench / docs

**Plain:** After you write, you want one-command tests and docs for free. The three commands differ; the goal is the same.

**Picture:** Before handing in, check answers, time yourself, then copy the steps onto the instruction sheet.

| Task | Go | Rust | C++ |
|---|---|---|---|
| Unit tests | `go test ./...` | `cargo test` | CTest + gtest/Catch2/doctest |
| Benchmarks | `testing.B` / benchstat | `cargo bench` (criterion and similar) | Google Benchmark and similar |
| Coverage | `go test -cover` | `tarpaulin` / `llvm-cov` | gcov/llvm-cov |
| Examples | `_test.go` Example | `examples/` · `cargo run --example` | per-repo convention |
| Release artifacts | single binary with a static feel (default dynamic libc depends on platform) | single binary; features affect size | `.a`/`.so`/`.dll` + runtime (Qt and similar) |

```go
// Go test sketch
func TestAdd(t *testing.T) {
  if Add(1, 2) != 3 { t.Fatal("fail") }
}
```

```rust
// Rust
#[cfg(test)]
mod tests {
    #[test]
    fn add() { assert_eq!(crate::add(1, 2), 3); }
}
```

```cpp
// C++ Catch2 sketch
TEST_CASE("add") { REQUIRE(add(1, 2) == 3); }
```

---

## 6. FFI and packaging (advanced)

**Plain:** FFI means one language calling another using C’s most plain function calling convention.

**Picture:** Two classes run an event together. The walkie-talkie can only say short sentences both sides understand. You cannot shout your class’s slang across.

> **Same:** all can expose a C ABI to other languages.  
> **Different:** Go has `cgo`; Rust has `cdylib`/`staticlib` + `bindgen`/`cbindgen`; C++ is born with a C ABI (`extern "C"`) but name mangling needs care.

### Go

```go
/*
#cgo LDFLAGS: -lmylib
#include "mylib.h"
*/
import "C"

func Call() { C.mylib_init() }
```

- Cross-compile + cgo needs a matching C toolchain.  
- Pure Go can set `CGO_ENABLED=0` for easier static deploy.

### Rust

```toml
[lib]
crate-type = ["cdylib", "staticlib", "rlib"]
```

```rust
#[no_mangle]
pub extern "C" fn core_version() -> u32 { 1 }
```

- `bindgen` consumes C headers; `cbindgen`/`uniffi`/`cxx` generate the boundary.  
- GUI-related: `cxx-qt` (Qt), Slint’s build.rs compiling `.slint`.

### C++

```cpp
extern "C" int core_version(void) { return 1; }
```

- Packaging for Go/Rust: provide `.h` + `.a/.so`, or use SWIG.  
- Qt: MOC/RCC/UIC must enter the build graph (`CMAKE_AUTOMOC` and similar).

### Suggested wrapping for a “settings core”

| Goal | Approach |
|---|---|
| Core in Rust, UI in Flutter/other | `flutter_rust_bridge` / Uniffi (mature community path; RustDesk-class) |
| Core in C++, UI in QML | `QObject` + `Q_PROPERTY`; or KDBindings/Aria then a bridge |
| Core in Go, UI in Fyne | same-process packages; no FFI needed |
| Core in Go, UI in WebView | Wails: bind Go methods to the frontend |

---

## 7. Version and compatibility policy (easy to miss)

**Plain:** When you upgrade, say clearly: can old source still compile, and can old compiled libraries still connect to the new program.

**Picture:** A workbook reprint: page numbers moved; last year’s answer sheet may no longer line up.

| | Go | Rust | C++ |
|---|---|---|---|
| SemVer | module path includes major (`/v2`) | SemVer; `0.x` may break by default | no unified ABI; you manage SONAME |
| MSRV | `go` line is the minimum toolchain | `rust-version` in Cargo.toml | mark the C++ standard and compiler |
| Vendoring | `go mod vendor` | `cargo vendor` | Conan download / source tree |
| Private sources | `GOPRIVATE` / enterprise proxy | private registry / git | private Conan remote / vcpkg registry |


Minimal spelling (illustrative). The numbers only show “where you write it,” not that you must upgrade to this version:

```go
// Go — illustrative: major version goes in the module path
// module example.com/app/v2
```

```toml
# Rust — illustrative: minimum compiler is written in the manifest
# [package]
# rust-version = "1.75"
```

```cmake
# C++ — illustrative: the standard is on the target, not in a price or license
target_compile_features(app PRIVATE cxx_std_20)
```
---

## 8. Choosing, in brief

**Plain:** If one person wants to finish fast, use the tools the language ships. If you already have a pile of C++ libraries, do not hire two package managers at once.

**Picture:** If the kitchen is already one brand of pots, do not buy a stove that will not fit those pots.

- **One-person project, fastest closed loop:** Go modules or Cargo.  
- **Already on Qt / lots of C++ deps:** CMake + (Conan **or** vcpkg). Do not let two package managers fight over the same libraries.  
- **Want “feature-level” optional GUI:** Cargo features are the cleanest; Go uses build tags + split packages; C++ uses CMake `option` + optional `target_link_libraries`.  
- **xmake:** a C++ option if you want something closer to Cargo; if the team is already all-CMake, count migration cost.
