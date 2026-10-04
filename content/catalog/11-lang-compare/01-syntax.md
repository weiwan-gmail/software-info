# 01. Syntax and language core: Go · Rust · C++

> **Same:** all three are statically typed, compiled languages; all have generics (Go 1.18+, Rust from the start, C++ templates); all can express interface-style polymorphism.  
> **Different:** memory model (GC vs ownership vs manual/RAII), error channel, default concurrency shape, and macro/metaprogramming depth differ by an order of magnitude.

Sample code is **illustrative**. It was not compiled here line by line with `go test` / `cargo check` / a C++ build.

---

## 1. Types and memory

| | Go | Rust | C++ |
|---|---|---|---|
| Default value semantics | Value types copy; pointers are explicit `*` | Move by default; `Copy` types may copy implicitly | Copy by default (can delete / can move) |
| Heap | `new`/`make`; GC reclaims | `Box`/`Vec`/`Rc`/`Arc`; no GC | `new`/`unique_ptr`/`shared_ptr`; no GC |
| Null safety | `nil` interfaces/pointers can be nil | `Option<T>`; no null pointers (except unsafe) | Raw pointers can be null; prefer `optional`/`expected` |
| Strings | Immutable `string` (UTF-8 bytes) | `String` / `&str` (UTF-8) | `std::string` (bytes); Unicode is your problem |

### Same intent: hold a mutable buffer

```go
// Go
buf := make([]byte, 0, 64)
buf = append(buf, "hi"...)
```

```rust
// Rust
let mut buf = Vec::with_capacity(64);
buf.extend_from_slice(b"hi");
```

```cpp
// C++
std::vector<std::uint8_t> buf;
buf.reserve(64);
buf.insert(buf.end(), {'h','i'});
```

### Ownership / GC (the core split)

```go
// Go: many aliases can share; GC owns lifetime
type Node struct{ Next *Node }
func cycle() { a, b := &Node{}, &Node{}; a.Next, b.Next = b, a }
```

```rust
// Rust: one mutable XOR many read-only; cycles need Rc+RefCell / weak refs
use std::rc::{Rc, Weak};
struct Node { next: Option<Rc<Node>>, parent: Option<Weak<Node>> }
```

```cpp
// C++: unique_ptr exclusive; shared_ptr shared; cycles need weak_ptr
struct Node {
  std::shared_ptr<Node> next;
  std::weak_ptr<Node> parent;
};
```

---

## 2. Concurrency

> **Same:** all can start threads, all can use locks, all can pass messages.  
> **Different:** Go treats lightweight tasks as first-class; Rust stops data races at compile time; C++’s standard library gives threads and sync primitives, and async is mostly library-level.

| | Go | Rust | C++ |
|---|---|---|---|
| Lightweight concurrency | `go f()` goroutine | `async fn` + runtime (tokio and similar) or `std::thread` | `std::thread` / `jthread`; coroutine libraries (Boost.Asio, folly) |
| Messages | `chan T` | `mpsc` / `crossbeam` / `flume` | No standard channel; `std::async` or third-party |
| Data races | Race detector (runtime) | `Send`/`Sync` at compile time | TSAN / discipline; no language-level ban |
| Cancellation | `context.Context` | `CancellationToken` / drop / `select!` | `stop_token` (C++20), hand-rolled flags |

### Same intent: produce-consume

```go
// Go
ch := make(chan int, 8)
go func() { ch <- 1; close(ch) }()
for v := range ch { _ = v }
```

```rust
// Rust (sync mpsc sketch)
use std::sync::mpsc;
let (tx, rx) = mpsc::channel();
std::thread::spawn(move || { tx.send(1).unwrap(); });
for v in rx { let _ = v; }
```

```cpp
// C++ (no standard channel; queue + condition_variable sketch)
std::mutex m; std::condition_variable cv; std::queue<int> q; bool done=false;
std::thread prod([&]{ { std::lock_guard lk(m); q.push(1); done=true; } cv.notify_one(); });
std::unique_lock lk(m); cv.wait(lk, [&]{ return done; }); int v=q.front(); q.pop();
prod.join();
```

### async shape (advanced)

```go
// Go: usually no async/await; goroutine + select
select {
case v := <-ch:
  _ = v
case <-ctx.Done():
  return ctx.Err()
}
```

```rust
// Rust: async/await + runtime (sketch; needs tokio)
async fn fetch(url: &str) -> Result<String, reqwest::Error> {
    reqwest::get(url).await?.text().await
}
```

```cpp
// C++20 coroutines (skeleton; production code usually uses Asio awaitable)
task<int> compute() { co_return 42; }
```

---

## 3. Generics

> **Same:** parameterized types and functions.  
> **Different:** Go uses interface constraints; Rust uses trait bounds; C++ uses templates + concepts (C++20).

```go
// Go
func Max[T cmp.Ordered](a, b T) T {
  if a > b { return a }
  return b
}
```

```rust
// Rust
fn max<T: Ord>(a: T, b: T) -> T {
    if a > b { a } else { b }
}
```

```cpp
// C++20
template <std::totally_ordered T>
T max_val(T a, T b) { return a > b ? a : b; }
```

**Advanced gap:** Rust has associated types, GATs, and (partial) specialization; C++ has partial specialization, SFINAE/concepts, and template metaprogramming; Go generics are deliberately conservative (no specialization, no associated types).

---

## 4. Error handling

> **Same:** explicit handling is encouraged; do not swallow failures everywhere.  
> **Different:** the channel shape is completely different.

```go
// Go: multiple return values
f, err := os.Open(path)
if err != nil { return fmt.Errorf("open: %w", err) }
defer f.Close()
```

```rust
// Rust: Result + ?
let f = std::fs::File::open(path)?;
```

```cpp
// C++: at least three common paths
// 1) exceptions
try { auto f = std::ifstream(path); } catch (...) { /* ... */ }
// 2) C++23 expected (or tl::expected)
std::expected<File, Error> open_file(const std::string&);
// 3) error-code / HRESULT style
```

| Idiom | Go | Rust | C++ |
|---|---|---|---|
| Propagation | `return ..., err` / `%w` | `?` / `map_err` | `throw` / `return unexpected` |
| panic | `panic` / `recover` | `panic!` / `unwrap` | undefined behavior or `terminate` |
| Multiple errors | `errors.Join` | `anyhow`/`eyre` or hand-rolled | library-level |

---

## 5. Interface / trait / virtual functions

> **Same:** you can abstract over “capability,” not a required inheritance tree.  
> **Different:** Go satisfies interfaces implicitly; Rust uses explicit `impl Trait`; C++ uses vtables or concepts/CRTP.

```go
// Go: implicit
type Writer interface{ Write([]byte) (int, error) }
// any type with that method satisfies it
```

```rust
// Rust: explicit
trait Writer { fn write(&mut self, buf: &[u8]) -> std::io::Result<usize>; }
impl Writer for File { fn write(&mut self, buf: &[u8]) -> std::io::Result<usize> { /* ... */ } }
```

```cpp
// C++: runtime polymorphism
struct Writer { virtual ~Writer() = default; virtual size_t write(std::span<const std::byte>) = 0; };
// or compile-time: template <class W> concept Writable = requires(W& w, std::span<const std::byte> s) { w.write(s); };
```

**Advanced:** a Rust trait object (`dyn Trait`) ≈ a boxed Go interface ≈ a C++ virtual base. Rust static dispatch (zero-cost) is more common.

---

## 6. Macros and metaprogramming

> **Same:** all can cut boilerplate.  
> **Different:** capability and risk differ enormously.

| | Go | Rust | C++ |
|---|---|---|---|
| Text macros | None (except `go generate`) | `macro_rules!` | `#define` preprocessor |
| Syntax macros | — | procedural macros (derive and similar) | no equivalent (reflection proposals/experiments exist) |
| Compile-time computation | Limited | `const fn` | `constexpr` / `consteval` |
| Reflection | `reflect` (runtime, slow) | almost none built in; macros | limited RTTI; Qt MOC and other externals |

```rust
// Rust: derive sketch
#[derive(Debug, Clone, serde::Serialize)]
struct Cfg { port: u16 }
```

```go
// Go: commonly go generate + stringer and similar tools, not language macros
//go:generate stringer -type=Kind
type Kind int
```

```cpp
// C++: template metaprogramming + macros (sketch)
#define DECLARE_PROP(Type, name) Type name_{}; Type name() const { return name_; }
```

---

## 7. Other easy-to-miss comparisons

| Topic | Go | Rust | C++ |
|---|---|---|---|
| Module system | package = directory; `internal/` | crate + `mod` + visibility | headers/sources + namespaces; C++20 modules are in progress |
| Empty interface / Any | `any` / `interface{}` | `dyn Any` | `std::any` |
| Iteration | `for range`; no standard Iterator trait | `Iterator` chains are very strong | range-for + `<ranges>` |
| Algebraic data types | structs + interfaces as a stand-in | `enum` with data + `match` | `std::variant` + `visit`; or inheritance |
| unsafe | rare (cgo) | explicit `unsafe` blocks | “can be unsafe” by default |
| Build tags | `//go:build` | `#[cfg(...)]` | preprocessor / CMake options |

### Same intent: a “result enum” that carries data

```go
// Go: often split into an interface or a type switch
type Event interface{ isEvent() }
type Click struct{ X, Y int }
func (Click) isEvent() {}
```

```rust
// Rust
enum Event { Click { x: i32, y: i32 }, Quit }
match ev {
    Event::Click { x, y } => { let _ = (x, y); }
    Event::Quit => {}
}
```

```cpp
// C++
using Event = std::variant<Click, Quit>;
std::visit([](auto&& e){ /* if constexpr ... */ }, event);
```

---

## Cheat sheet

- **Want GC, simple deploy, short concurrency syntax** → start with Go.  
- **Want a no-data-race proof, zero-cost abstraction, strong ADTs** → start with Rust.  
- **Want the deepest systems/GUI/game-engine ecosystem, seamless with existing C ABI** → start with C++.  
- All three can write a “settings core”; the difference is **boundary and adapter cost**. See [05-gui-binding.md](05-gui-binding.md).
