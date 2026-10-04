# 04. Idiomatic design patterns (not a GoF dump)

> Teaching layer (2026-10-04 PT): read **Plain** and **Picture** first in each section; terms come after. First-read path: [00-how-to-read.md](00-how-to-read.md). Code blocks are all illustrative.

> **Same:** resource release, dependency injection, plugins, message-driven work, walking complex structure — all three languages hit these.  
> **Different:** **same intent, different shape**: C++ leans on RAII/destructors; Go leans on `defer`; Rust leans on `Drop` + ownership. Do not force Java-style GoF into Go.

Sample code is **illustrative**.

---

## 1. Resource lifetime: RAII · defer · Drop

**Plain:** When you are done with a file, a lock, or a network connection, give it back automatically as you leave this piece of code.

**Picture:** Borrowing the lab key: lock the door as you walk out, not when you happen to remember.

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

**Plain:** When a thing has only a few mutually exclusive shapes, you want every shape written down so a miss can be caught.

**Picture:** Notices are only “meeting, exam, holiday.” The blackboard needs a box for all three. You cannot quietly skip one.

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

**Plain:** Hand in the helpers an object needs (clock, log, address) at construction. Do not sneak off inside a function to grab the global one.

**Picture:** Before the experiment, the teacher puts the beaker and stopwatch on the desk. Students do not each run to the storeroom.

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

**Plain:** Do not let several execution flows edit the same table at once. Instead, drop messages into one “owner” mailbox.

**Picture:** Only the class monitor changes the seating chart. Everyone else writes a note and hands it over.

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
// Rust — illustrative. The standard-library channel already shows the shape; tokio’s .await version is in 10
use std::sync::mpsc;
let (tx, rx) = mpsc::channel::<i32>();
std::thread::spawn(move || { let _ = tx.send(1); });
let _v = rx.recv();
```

```cpp
// C++ — illustrative. No chan keyword; the smallest isomorphic form is a queue plus a lock
void send_job(std::mutex& mu, std::queue<int>& q, int job) {
  std::lock_guard lk(mu);
  q.push(job);
}
```

| Pattern | Fits |
|---|---|
| Many producers, one consumer | logging, disk writes, UI update pump |
| Request-response | with a reply channel / oneshot |
| Broadcast | Go you build it; Rust `broadcast`; Qt signal to many slots |

**With GUI:** the UI thread only receives “already-serialized state patches” — the same discipline in all three languages. See [05-gui-binding.md](05-gui-binding.md).

---

## 5. Static polymorphism: CRTP · traits · generic constraints

**Plain:** Pick the concrete type at compile time so the call can be inlined like an ordinary function. You do not wait until runtime to look up a table.

**Picture:** The print shop prints from your class template in advance, instead of asking which class you are each time you queue.

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

**Plain:** Keep the core program stable. New features plug in like appliances on a power strip.

**Picture:** The power strip stays. You can swap a lamp or a fan.

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

**Plain:** When failure goes up, take “what you were doing then” with it, so the outer layer can later understand the inner reason.

**Picture:** A leave slip says not only “sick,” but also “temperature taken before PE.”

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

**Plain:** The real rules (defaults, validation, save) live in the core. The window only displays and hands clicks back.

**Picture:** The grade book is in the office. The blackboard is a copied layer. Erasing the blackboard does not change the grade book.

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

The core only knows storage, not windows (illustrative):

```go
// Go — illustrative
type Store interface{ Get(string) (string, error); Set(string, string) error }
```

```rust
// Rust — illustrative
trait Store { fn get(&self, k: &str) -> Option<String>; fn set(&mut self, k: &str, v: &str); }
```

```cpp
// C++ — illustrative
struct ISettingsStore {
  virtual ~ISettingsStore() = default;
  virtual std::string get(std::string_view) = 0;
  virtual void set(std::string_view, std::string) = 0;
};
```

See [ui-settings-binding-stacks.md](../../ui-settings-binding-stacks.md) and [qt-reactive-compare](https://github.com/weiwan-gmail/qt-reactive-compare) (separate private repo, not part of this site).

---

## 9. Easy-to-misuse “pseudo-patterns”

**Plain:** Some habits borrowed from other languages do not help in these three. They twist the structure.

**Picture:** Taking basketball rules onto a football pitch. Both are balls. Every call is wrong.

| Pseudo-pattern | Problem |
|---|---|
| Deep inheritance trees in Go | no inheritance; use embedding and interfaces |
| `Arc<Mutex<T>>` everywhere in Rust | think ownership and messages first |
| Bare `new` with no owner in C++ | use smart pointers/containers |
| One giant global EventBus shared by all three languages | hard to test; split channels at boundaries |
| UI writing disk directly | breaks “core owns dependencies” |


Each block below is a **do not write this** sketch (illustrative):

```go
// Go — illustrative. The language has no class inheritance; do not build a “base-class tree” and pretend to override
// type Animal struct{}
// type Dog struct{ Animal } // this only embeds a field; see 09
```

```rust
// Rust — illustrative. Sharing first, then locks everywhere, often means ownership was not thought through
// let state = Arc::new(Mutex::new(State::default())); // it compiles, but it smells
```

```cpp
// C++ — illustrative. Bare new has no owner; forget delete and it leaks
// Widget* w = new Widget; // make it unique_ptr, or put it on the stack / in a container
```
---

## 10. Same-intent comparison table (wrap-up)

**Plain:** One table to keep: the same sentence, three sets of part names. Full mini-examples are in the sections above.

**Picture:** A glossary, not a new lesson.

| Intent | Go | Rust | C++ |
|---|---|---|---|
| Clean up on leave | defer | Drop | RAII destructor |
| Exhaustive branch | type switch | match | visit / Visitor |
| Configurable construction | functional options | builder | config struct |
| Concurrent decoupling | goroutine+chan | async+mpsc / actor | thread+queue / CAF / Qt signals |
| Extension point | interface registry | trait + registry | virtual interface / plugin DLL |
| Static reuse | generics | trait | CRTP / concepts |

The smallest side-by-side for the table’s first row, “clean up on leave” (full examples for the other rows are in sections 1–7, illustrative):

```go
// Go — illustrative
// defer f.Close()
```

```rust
// Rust — illustrative
// let _f = File::open(path)?; // leaving the block Drops
```

```cpp
// C++ — illustrative
// std::ifstream f{path}; // leaving the block destructs
```
