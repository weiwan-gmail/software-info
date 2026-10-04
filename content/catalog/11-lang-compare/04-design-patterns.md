# 04. Idiomatic design patterns (not a GoF dump)

> **Same:** resource release, dependency injection, plugins, message-driven work, walking complex structure — all three languages hit these.  
> **Different:** **same intent, different shape**: C++ leans on RAII/destructors; Go leans on `defer`; Rust leans on `Drop` + ownership. Do not force Java-style GoF into Go.

Sample code is **illustrative**.

---

## 1. Resource lifetime: RAII · defer · Drop

> **Same:** “leaving the scope cleans up.”  
> **Different:** who guarantees it, whether cleanup can fail, and how it interacts with async.

```go
// Go: defer is LIFO; errors need separate handling
f, err := os.Open(path)
if err != nil { return err }
defer f.Close() // Close’s error is often ignored or wrapped again
```

```rust
// Rust: Drop is automatic; defer crates exist, but ownership is the idiom
{
    let f = File::open(path)?;
    // leaving the scope closes automatically
}
```

```cpp
// C++: RAII
{
  std::ifstream f(path);
  // destructor closes; unique_ptr owns heap resources
}
```

| Trap | Go | Rust | C++ |
|---|---|---|---|
| `defer` in a loop | delayed until function end (easy leak) | N/A | N/A |
| async cancel | Context | drop Future / abort | stop_token / cancel slot |
| Double close | needs to be idempotent | Drop once | destructor once; hand-written code must guard |

---

## 2. Algebraic data + exhaustive match ≈ Visitor

> **Same:** branch on “a few mutually exclusive shapes.”  
> **Different:** Rust `match` is exhaustive at compile time; Go type switch; C++ `variant`+`visit` or classic Visitor.

```rust
// Rust: closest to algebraic data types
enum Msg { Ping, Echo(String), Set { key: String, val: String } }
fn handle(m: Msg) {
    match m {
        Msg::Ping => {}
        Msg::Echo(s) => { let _ = s; }
        Msg::Set { key, val } => { let _ = (key, val); }
    }
}
```

```go
// Go
type Msg interface{ msg() }
type Ping struct{}
func (Ping) msg() {}
type Echo struct{ S string }
func (Echo) msg() {}

func handle(m Msg) {
  switch x := m.(type) {
  case Ping:
  case Echo:
    _ = x.S
  }
}
```

```cpp
// C++17
struct Ping {};
struct Echo { std::string s; };
using Msg = std::variant<Ping, Echo>;
void handle(const Msg& m) {
  std::visit([](auto&& x) {
    using T = std::decay_t<decltype(x)>;
    if constexpr (std::is_same_v<T, Echo>) { /* x.s */ }
  }, m);
}
```

**Classic Visitor (still common in C++ when types stay open):** double dispatch; Rust/Go more often use “data enum + function.”

---

## 3. Dependency injection · Options · functional options

> **Same:** inject dependencies at construction; avoid a global singleton.  
> **Different:** Go likes functional options; Rust likes builder + typestate; C++ likes a parameter struct / concept constraints.

```go
// Go: functional options
type Option func(*Server)
func WithAddr(a string) Option { return func(s *Server) { s.addr = a } }
func NewServer(opts ...Option) *Server {
  s := &Server{addr: ":8080"}
  for _, o := range opts { o(s) }
  return s
}
```

```rust
// Rust: builder
struct Server { addr: String }
struct ServerBuilder { addr: String }
impl ServerBuilder {
    fn new() -> Self { Self { addr: ":8080".into() } }
    fn addr(mut self, a: impl Into<String>) -> Self { self.addr = a.into(); self }
    fn build(self) -> Server { Server { addr: self.addr } }
}
```

```cpp
// C++: aggregate config
struct ServerConfig { std::string addr{":8080"}; };
struct Server {
  explicit Server(ServerConfig c) : cfg_(std::move(c)) {}
  ServerConfig cfg_;
};
```

**DI containers:** Go `uber/fx`, `wire`; Rust has less “container religion”; C++ Boost.DI / hand-written. Wei’s settings core: **inject storage and clock through interfaces** — more important than a framework.

---

## 4. Actor · Channel · event bus

> **Same:** use messages to reduce shared mutable state.  
> **Different:** Go has language-level channels; Rust picks a crate; C++ is library-level.

```go
// Go: worker
jobs := make(chan Job, 16)
go func() {
  for j := range jobs { do(j) }
}()
jobs <- Job{}
close(jobs)
```

```rust
// Rust: tokio mpsc sketch
// let (tx, mut rx) = tokio::sync::mpsc::channel(16);
// tokio::spawn(async move { while let Some(j) = rx.recv().await { do_job(j).await; } });
```

```cpp
// C++: Asio strand or lock-free queue + thread; or CAF actor
// actor->send(Ping{});
```

| Pattern | Fits |
|---|---|
| Many producers, one consumer | logging, disk writes, UI update pump |
| Request-response | with a reply channel / oneshot |
| Broadcast | Go you build it; Rust `broadcast`; Qt signal to many slots |

**With GUI:** the UI thread only receives “already-serialized state patches” — the same discipline in all three languages. See [05-gui-binding.md](05-gui-binding.md).

---

## 5. Static polymorphism: CRTP · traits · generic constraints

> **Same:** compile-time polymorphism, no vtable.  
> **Different:** names and error-message experience differ a lot.

```cpp
// C++: CRTP
template <class D>
struct WriterBase {
  void write_all(std::span<const std::byte> b) {
    static_cast<D*>(this)->write_impl(b);
  }
};
struct FileWriter : WriterBase<FileWriter> {
  void write_impl(std::span<const std::byte>);
};
```

```rust
// Rust: trait default methods
trait Writer {
    fn write_impl(&mut self, b: &[u8]);
    fn write_all(&mut self, b: &[u8]) { self.write_impl(b); }
}
```

```go
// Go: generic constraints (no CRTP; interface composition)
type Writer interface{ Write([]byte) (int, error) }
func WriteAll[W Writer](w W, b []byte) error {
  _, err := w.Write(b)
  return err
}
```

---

## 6. Plugin architecture

> **Same:** keep the core stable; features are pluggable.  
> **Different:** dynamic-load difficulty: C/C++ `.so` is the most traditional; Go `plugin` has **large limits** (same build tree); Rust dynamic plugins want a stable ABI (often fall back to C ABI).

### In-process “registry” plugins (all three languages work well)

```go
// Go
type Driver interface{ Name() string; Open() error }
var registry = map[string]Driver{}
func Register(d Driver) { registry[d.Name()] = d }
```

```rust
// Rust: inventory / linkme or a hand-written once_cell HashMap
// inventory::submit! { Plugin { name: "serial", ... } }
```

```cpp
// C++: global self-registration (watch static initialization order)
struct Reg {
  Reg(const char* n, Factory f) { map()[n] = f; }
  static auto& map();
};
```

### Dynamic-library plugins

| | Go | Rust | C++ |
|---|---|---|---|
| Mechanism | `plugin` package (mostly Linux, many limits) | `libloading` + `extern "C"` | `dlopen` / LoadLibrary |
| ABI | extremely brittle | use C ABI or an ABI-stable crate | `extern "C"` + a version number |
| Practical advice | multi-process + RPC/grpc is often sturdier | same as left, or Wasm plugins | Qt’s plugin system is mature |

---

## 7. Error and result pipelines (pattern layer)

```go
// Go: wrap the error chain
return fmt.Errorf("load cfg: %w", err)
```

```rust
// Rust: ? + context (anyhow)
use anyhow::{Context, Result};
let cfg = load().context("load cfg")?;
```

```cpp
// C++: expected chaining (sketch)
return load().and_then(parse).transform_error([](Error e){ /* ... */ return e; });
```

---

## 8. Idiomatic “settings core” shape (aligned with Wei)

Collect GUI-irrelevant rules into a core. The three languages are isomorphic:

| Component | Responsibility |
|---|---|
| `Schema` / types | settings items, defaults, validation |
| `Store` | persistence (file/registry/Preferences) |
| `Bus` / subscribe | change notification (channel / signal / callback) |
| `Tracked` | runtime observed values (not persistent) |
| **Does not include** | concrete Widget / QML / HTML |

```text
[ Core: Schema + Store + Events ]
        ↑ dependency direction
[ Adapter: Fyne | Qt | Slint | egui | Wails ]
```

- Go: small interfaces; inject a Preferences implementation.  
- Rust: trait objects or a generic Store; optional GUI feature compile.  
- C++: abstract `ISettingsStore` + KDBindings/Aria/`Q_PROPERTY` bridge.

See [ui-settings-binding-stacks.md](../../ui-settings-binding-stacks.md) and [qt-reactive-compare](https://github.com/weiwan-gmail/qt-reactive-compare) (separate private repo, not part of this site).

---

## 9. Easy-to-misuse “pseudo-patterns”

| Pseudo-pattern | Problem |
|---|---|
| Deep inheritance trees in Go | no inheritance; use embedding and interfaces |
| `Arc<Mutex<T>>` everywhere in Rust | think ownership and messages first |
| Bare `new` with no owner in C++ | use smart pointers/containers |
| One giant global EventBus shared by all three languages | hard to test; split channels at boundaries |
| UI writing disk directly | breaks “core owns dependencies” |

---

## 10. Same-intent comparison table (wrap-up)

| Intent | Go | Rust | C++ |
|---|---|---|---|
| Clean up on leave | defer | Drop | RAII destructor |
| Exhaustive branch | type switch | match | visit / Visitor |
| Configurable construction | functional options | builder | config struct |
| Concurrent decoupling | goroutine+chan | async+mpsc / actor | thread+queue / CAF / Qt signals |
| Extension point | interface registry | trait + registry | virtual interface / plugin DLL |
| Static reuse | generics | trait | CRTP / concepts |
