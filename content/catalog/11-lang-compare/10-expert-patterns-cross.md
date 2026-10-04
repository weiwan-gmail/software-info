# 10. Expert layer: same intent, three shapes

> Teaching layer (2026-10-04 PT): read **Plain** and **Picture** first in each section; terms come after. First-read path: [00-how-to-read.md](00-how-to-read.md). Code blocks are all illustrative.


Checked: 2026-10-04 PT. The **frozen baseline** of idiomatic patterns is still [04-design-patterns.md](04-design-patterns.md) (do not change it). This page writes the same intent as side-by-side expert fragments: more traps, not a third intro.

Sample code is **illustrative**; it was not compiled line by line. Language-mechanism expansion is in [07](07-expert-cpp.md) / [08](08-expert-rust.md) / [09](09-expert-go.md).

How to read: each section starts with **Plain** and **Picture**, then **same / different**, then one block each for Go, Rust, C++. Terms sit after Plain. If a language has no isomorphic construct, write **N/A**; do not force a translation.

---

## 1. Algebraic data + exhaustive branching ≈ Visitor

**Plain:** When the same message has only a few mutually exclusive shapes, you want omitting one to be caught by the compiler.

**Picture:** Notices have only three stamps. The person stamping must have a handler for all three. They cannot pretend not to see one.


> **Same:** a set of mutually exclusive shapes; do one thing per shape; ideally omitting one fails to compile.  
> **Different:** Rust `enum` + `match` is the native tongue of this intent. C++ uses `std::variant` + `std::visit`, or classic double-dispatch Visitor (still used when things stay open). Go has **no** algebraic types; interface + type switch is **not exhaustive**.

```go
// Go — illustrative. The compiler does not require you to write every case.
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
    default:
        // Omitting default also does not fail to compile. Add a new Msg, old switches silently miss it.
    }
}
```

```rust
// Rust — illustrative. Add a variant and do not change match: compile failure (unless you used _).
enum Msg { Ping, Echo(String) }
fn handle(m: Msg) {
    match m {
        Msg::Ping => {}
        Msg::Echo(s) => { let _ = s; }
    }
}
```

```cpp
// C++17 — illustrative. visit over variant is exhaustive: omit a type and the overload set does not work.
struct Ping {};
struct Echo { std::string s; };
using Msg = std::variant<Ping, Echo>;
void handle(const Msg& m) {
  std::visit([](const auto& x) {
    using T = std::decay_t<decltype(x)>;
    if constexpr (std::is_same_v<T, Echo>) {
      (void)x.s;
    }
  }, m);
}
```

**Classic Visitor (double dispatch)** solves a different thing: both the element kinds and the operation kinds need to extend.

| | Go | Rust | C++ |
|---|---|---|---|
| Data closed, operations often added | type switch (not exhaustive) | `match` | `variant`/`visit` |
| Data often added, operations closed | interface methods | trait methods | virtual functions |
| Both sides often added | no pretty solution; a registry | no perfect solution; trait objects or macros | Visitor, or `variant` plus a layer |
| Missing a branch | only known at runtime | compile time | `visit` compile time; a hand-written switch then no |

**Trap:** Go `default` eats “future new types” as a no-op; that is a silent error. Rust `_` likewise destroys exhaustiveness. C++ `visit` with an `if constexpr` chain turns a missed type into “did nothing” rather than a compile error — for exhaustiveness use an overload set (the `overload` pattern), not one long `if constexpr` chain. A `variant`’s index is positional; swapping order is another type; do not write it to disk.

---

## 2. Type erasure

**Plain:** Fold different concrete types into a box that “only knows these operations.” The caller no longer writes the original type name.

**Picture:** The classroom book-return box only accepts “this is a book.” It does not print each author’s name on the box.


> **Same:** the caller depends only on operations, not the concrete type; values need to go in a container.  
> **Different:** Go interfaces are the default answer. Rust chooses between `dyn` and `enum` (`dyn` has object-safety limits; see [08](08-expert-rust.md)). C++ has virtual pointers, `std::function`, `std::any`, and value-semantic polymorphic values (a pattern; `std::polymorphic` is in the C++26 draft; do not assume implementations have arrived; see [07](07-expert-cpp.md)).

Intent: a list of “things that can draw,” with ownership.

```go
// Go — illustrative. An interface value = (dynamic type, data). Large data gets boxed.
type Draw interface{ Draw() }
func render(ds []Draw) {
    for _, d := range ds { d.Draw() }
}
```

```rust
// Rust — illustrative. dyn needs object safety; ownership uses Box. The other path is enum: compile-time exhaustive, no allocation.
trait Draw { fn draw(&self); }
fn render(ds: &[Box<dyn Draw>]) {
    for d in ds { d.draw(); }
}
enum Shape { Dot, Line }
fn render_closed(ds: &[Shape]) {
    for s in ds {
        match s { Shape::Dot => {} Shape::Line => {} }
    }
}
```

```cpp
// C++ — illustrative. Virtual base: the owner is usually unique_ptr; copy needs a separate clone.
struct Draw {
  virtual void draw() const = 0;
  virtual ~Draw() = default;
};
void render(const std::vector<std::unique_ptr<Draw>>& ds) {
  for (const auto& d : ds) d->draw();
}
// std::function<void()> erases “this one call,” not a set of methods.
// std::any erases the type, with no methods attached; the wrong type throws.
```

| Want to erase | Go | Rust | C++ |
|---|---|---|---|
| A set of methods | `interface` | `dyn Trait` (must be dyn-compatible) | virtual base / draft `std::polymorphic` |
| One call | `func(...)` | `Box<dyn Fn...>` | `std::function` / `move_only_function` |
| An arbitrary value, retrieved later | `any` + assert | `Any` (`&dyn Any`, needs `'static`) | `std::any` |
| A closed set | no ADT; hand-write an interface | `enum` (often better) | `std::variant` (often better) |

**Trap:** if you can use a closed enum / variant, do not erase — errors move from compile time to runtime. Go’s nil interface vs “a nil pointer inside an interface” are not the same thing ([09](09-expert-go.md)). Rust `async fn` methods currently break dyn compatibility. C++ `std::function` is copyable and will not hold a move-only lambda (use C++23 `move_only_function`).

---

## 3. Dependency injection, options, builder

**Plain:** Pass dependencies such as address and logging in at creation. Optionals use options or a builder. Required ones should be something the compiler can watch.

**Picture:** Before opening the shop, hand the address and the ledger to the manager. Do not open if the ledger is missing.


> **Same:** inject storage, clock, address at construction, rather than reaching for globals inside the function.  
> **Different:** Go functional options are the idiomatic default. Rust uses a builder; typestate can leave “required field not set yet” in the type. C++ uses an aggregate config or constructor parameters; concepts can constrain template parameters, but there is no language-level builder.

```go
// Go — illustrative
type Server struct{ addr string; log Logger }
type Option func(*Server)
func WithAddr(a string) Option { return func(s *Server) { s.addr = a } }
func WithLogger(l Logger) Option { return func(s *Server) { s.log = l } }
func NewServer(opts ...Option) *Server {
    s := &Server{addr: ":8080", log: noopLogger{}}
    for _, o := range opts { o(s) }
    return s
}
```

```rust
// Rust — illustrative. Put required fields in build()’s Result, or use typestate.
struct Server { addr: String, log: Box<dyn Log> }
struct ServerBuilder { addr: String, log: Option<Box<dyn Log>> }
impl ServerBuilder {
    fn new() -> Self { Self { addr: ":8080".into(), log: None } }
    fn addr(mut self, a: impl Into<String>) -> Self { self.addr = a.into(); self }
    fn log(mut self, l: Box<dyn Log>) -> Self { self.log = Some(l); self }
    fn build(self) -> Result<Server, &'static str> {
        Ok(Server { addr: self.addr, log: self.log.ok_or("log required")? })
    }
}
```

```cpp
// C++ — illustrative. Config is a value; dependencies are references or smart pointers; lifetime is in the type.
struct ServerConfig { std::string addr{":8080"}; };
struct Server {
  Server(ServerConfig cfg, Logger& log) : cfg_(std::move(cfg)), log_(log) {}
  ServerConfig cfg_;
  Logger& log_; // does not own. To own, unique_ptr / shared_ptr; do not mix.
};
```

| | Go | Rust | C++ |
|---|---|---|---|
| Optional parameters | functional options | builder / `Option` fields | default members, overloads (use sparingly) |
| Missed a required | runtime zero value | `Result` or typestate | missing one from the constructor signature fails to compile |
| Frameworks | `wire` (generate) / `fx` (runtime) | containers are uncommon | Boost.DI and similar, not required |
| Global singleton | can write it, don’t | can write it, don’t | can write it, don’t |

**Trap:** when Go options override each other, last one wins; order is an implicit contract. Starting a goroutine inside an option makes tests dirty. Rust builders pass by value; forgetting to move `self`’s fields into the result means you still want to use them after `build`. Registering a callback in a C++ constructor that then touches other members of `this` — the object is not fully constructed yet.

**Opinion:** a settings core (schema / store / clock) can use any of these three. A container framework is optional; the interface shape is not.

---

## 4. Actor, channel, event pump

**Plain:** One piece of data is changed by one owner, in message order. Others only send letters. They do not reach into someone else’s drawer.

**Picture:** Only the class monitor opens the class monitor’s drawer. You drop a note in the mailbox.


> **Same:** messages instead of shared mutable state. Who holds the data serializes the messages.  
> **Different:** Go channels are part of the language and runtime. Rust has no language-level channel; `std::sync::mpsc` or a runtime’s async channel is a library. C++ has no language-level channel (N/A for syntax); use a queue, the `std::execution` draft, or Qt signals. Actor frameworks (CAF and similar) are libraries, not the same type in a trinity.

```go
// Go — illustrative. One goroutine owns the map; others only send messages.
type cmd struct {
    key string
    reply chan string
}
func loop(cmds <-chan cmd) {
    m := map[string]string{}
    for c := range cmds {
        c.reply <- m[c.key]
    }
}
```

```rust
// Rust — illustrative. Async channel; the Send bound forces you to decide at compile time whether it can cross threads.
// async fn loop_(mut rx: tokio::sync::mpsc::Receiver<Cmd>) {
//     let mut m = std::collections::HashMap::new();
//     while let Some(c) = rx.recv().await {
//         let _ = c.reply.send(m.get(&c.key).cloned());
//     }
// }
// Standard-library std::sync::mpsc is the blocking version; similar shape, no .await.
```

```cpp
// C++ — N/A: no chan keyword. The minimal isomorphic is queue + mutex + condition variable, or an asio strand
// (a strand guarantees a set of handlers is not concurrent; that is the core of an actor mailbox, not syntactic sugar).
// Sketch: strand.post([this, cmd]{ this->handle(cmd); });
```

| Intent | Go | Rust | C++ |
|---|---|---|---|
| One-to-one mailbox | `chan` | `mpsc` (std or tokio) | queue / strand / actor library |
| Broadcast | not in the language; build it or a library | tokio `broadcast` and similar | Qt signal; build it |
| Request-response | a `chan` reply in the message | oneshot | `promise`/`future`, or a callback |
| Backpressure | buffer length; unbuffered blocks the sender | bounded channel `send().await` | you decide the policy when the queue is full |
| Cancellation | `context` or close the channel | drop `Receiver` / `CancellationToken` | `stop_token`, close the queue |
| Shared-memory fallback | `sync.Mutex` | `Mutex` (lock poisoning is Rust-specific) | `std::mutex` |

**Trap:** closing the same channel from multiple goroutines panics; who `close`s must be unique. Forgetting to receive on a reply channel, the sender blocks forever. Holding `std::sync::Mutex` across `.await` in Rust `async` is an easy deadlock (the lock is not async-aware). Synchronously waiting on a background queue from a C++ GUI thread is the textbook of reentrancy and deadlock.

The UI only eats already-folded state patches — that discipline is in [04](04-design-patterns.md) and [05-gui-binding.md](05-gui-binding.md); this page does not repeat the product structure.


Side-by-side you can read in the standard library. The Go example is earlier in this section; here are uncommented Rust / C++ (illustrative). The tokio block stays comments, because the runtime is not the language itself.

```rust
// Rust — illustrative. Blocking channel; no tokio needed
use std::sync::mpsc;
let (tx, rx) = mpsc::channel::<i32>();
std::thread::spawn(move || { let _ = tx.send(1); });
let _v = rx.recv();
```

```cpp
// C++ — illustrative. No chan keyword
void post(std::mutex& mu, std::queue<int>& q, int v) {
  std::lock_guard lk(mu);
  q.push(v);
}
```

```go
// Go — illustrative. Unbuffered: if nobody is receiving, send waits
ch := make(chan int)
go func() { ch <- 1 }()
v := <-ch
_ = v
```
---

## 5. RAII ↔ `defer` ↔ `Drop` (including async cancel)

**Plain:** Leaving a range means giving resources back. The three languages define “leaving” differently: function return, end of a variable’s scope, or an async task being thrown away.

**Picture:** Borrowed keys: Go usually returns them at the end of the whole period. Rust and C++ often return them as you walk out of this classroom.


> **Same:** leaving a scope means giving resources back.  
> **Different:** who calls, what happens on failure, whether cancel is the same cleanup.

```go
// Go — illustrative
func read(path string) (err error) {
    f, err := os.Open(path)
    if err != nil { return err }
    defer f.Close() // Close’s error is dropped by default
    // defer arguments evaluate immediately; the call is deferred until the function returns, not “end of the current block”
    return nil
}
```

```rust
// Rust — illustrative
fn read(path: &str) -> std::io::Result<()> {
    let _f = std::fs::File::open(path)?; // leaving the scope Drop::drop
    // Want to close early: drop(_f);  forgetting to close will not forget, unless mem::forget
    Ok(())
}
```

```cpp
// C++ — illustrative
void read(const std::string& path) {
  std::ifstream f{path}; // destructor closes. Failure is failbit / exception policy, not a second return channel
}
```

| | Go `defer` | Rust `Drop` | C++ destructor |
|---|---|---|---|
| When it runs | function return (not end of block, unless you wrap another function) | when the value’s scope ends, or after it is moved, at the new owner | end of scope, members reverse order |
| Acquiring resources in a loop | **trap**: defers pile until function end | each iteration’s value drops at end of iteration | block scope destructs each iteration |
| Cleanup failure | you have to catch `Close() error` | `Drop` cannot fail (cannot return Result) | destructors **must not throw** |
| Guaranteed to run? | process crash, `os.Exit` will not | `mem::forget`, leaked `Rc` cycles will not | `terminate`, leaks will not; the normal path will |
| Async cancel | clean up yourself after `ctx.Done()`; defer is still synchronous | drop future = cancel; **cannot await in Drop** (stable) | destructors run when the coroutine frame is destroyed; cancel is library |

The async cell is the core of the expert disagreement:

- Go: cancel is cooperative. `defer` still runs when the goroutine function returns. A call that is stuck and does not look at `ctx` will not cancel.
- Rust: cancel is dropping the future. Locks and task registration must be finishable in synchronous `drop`. Shutdown that really needs `await` (TLS, protocol shutdown) is an explicit `async fn close`.
- C++: destroying a coroutine frame destructs members; `co_await` itself has no “cancel” keyword. Polling `stop_token` is another channel.

**Trap:** writing Go `defer mu.Unlock()` before `Lock` unlocks first. A Rust guard `mem::forget`’d holds the lock forever — safe, but wrong. Calling a virtual function from a C++ destructor sees the already-destroyed derived part.

---

## 6. Plugins and a stable ABI

**Plain:** The boundary that can really load across compilers is C’s simple functions, not each language’s objects, interfaces, or traits.

**Picture:** Two schools exchange students only under the education bureau’s exam rules, not under each school’s internal nicknames.


> **Same:** the core does not want to know every extension at compile time.  
> **Different:** “in-process function pointers” and “a stable ABI across compilers” differ by an order of magnitude. **None** of the three languages’ object models can be a plugin boundary directly.

### In-process registry (holds in all three; prefer this)

```go
// Go — illustrative
type Driver interface{ Open() error }
var reg = map[string]Driver{}
func Register(name string, d Driver) { reg[name] = d }
```

```rust
// Rust — illustrative. inventory/linkme are ecosystem, not language. Hand-written is fine too.
// static REG: Mutex<Vec<&'static dyn Driver>> = Mutex::new(Vec::new());
trait Driver { fn open(&self) -> Result<(), ()>; }
```

```cpp
// C++ — illustrative. Static initialization order is a trap: the registry itself should be a function-local static.
struct Reg {
  Reg(const char* name, Driver* (*make)());
  static auto& table() -> std::map<std::string, Driver* (*)()>&;
};
```

### Dynamic libraries / cross-module

| | Go | Rust | C++ |
|---|---|---|---|
| Mechanism | `plugin` package | `libloading` + `extern "C"` | `dlopen` / `LoadLibrary` |
| Isomorphic to a “stable C ABI”? | **No**. Same Go toolchain is barely enough | only when you export C symbols | only the `extern "C"` layer; C++ names and vtable layout are not a stable ABI |
| Passing objects across | do not pass `interface`, slices, maps | do not pass `String`, `Vec`, `Box<dyn _>` | do not pass `std::string`, virtual C++ objects |
| Practical | subprocess, RPC, Wasm | same as left | same as left; Qt’s plugin system is another already-constrained C++ ABI, not a general answer |

```go
// plugin — N/A as a “portable plugin.” Limits in 09. Do not copy an Open call here as a recommended architecture.
```

```rust
// illustrative — the only shape recommended across compilers
// #[no_mangle] pub extern "C" fn driver_open() -> i32 { 0 }
```

```cpp
// illustrative
extern "C" int driver_open(void);
```

**Versioning:** a C ABI also needs a version number (function-name suffix or an explicit `api_version()`). Plugin and host allocators must pair (who mallocs, who frees).

**Opinion:** in-app extensions use a registry. Third-party binary extensions use a process or Wasm. `plugin`, C++ virtual destructors across DLLs, Rust trait objects across a cdylib, are all accident templates.

---

## 7. CRTP ↔ trait default methods ↔ Go generic functions

**Plain:** To reuse an algorithm at compile time: C++ hands the derived class to a base-class template, Rust writes a default method on a trait, Go writes a generic function.

**Picture:** The same duty procedure: some print it on a class template, some write it in the class pact, some make a form anyone can fill a name into.


> **Same:** stick a “shared algorithm” onto a “concrete type” at compile time, without a vtable.  
> **Different:** C++’s hole is “the base does not know the derived class,” so the derived class is a template parameter (curiously recurring). Rust `Self` is already in the trait; a default method calls `self.next()` directly and **does not need** CRTP. Go has no inheritance and no default methods; the shared algorithm is a **generic function**, not a base class.

Intent: `write_all` is implemented with the concrete type’s `write_one`, and can inline.

```go
// Go — N/A: no CRTP, no default methods. This is the nearest isomorphic intent.
type OneWriter interface{ WriteOne() }
func WriteAll[T OneWriter](w T, n int) {
    for i := 0; i < n; i++ { w.WriteOne() }
}
```

```rust
// Rust — illustrative. Default method. The concrete type can override write_all.
trait OneWriter {
    fn write_one(&mut self);
    fn write_all(&mut self, n: u32) {
        for _ in 0..n { self.write_one(); }
    }
}
```

```cpp
// C++ — illustrative. CRTP. From C++23 many scenes become deducing this; see 07.
template <class D>
struct Repeat {
  void write_all(int n) {
    for (int i = 0; i < n; ++i) static_cast<D&>(*this).write_one();
  }
};
struct Dot : Repeat<Dot> { void write_one(); };
```

| | Go | Rust | C++ |
|---|---|---|---|
| Static dispatch | generic instantiation | monomorphized trait | templates / CRTP / deducing this |
| Where the default lives | a function (not in the interface) | trait default method | base class template or C++23 `this auto` |
| Overriding the default | write another function; no virtual override | write a same-named method in the impl | derived class provides `write_one`; overriding `write_all` needs another design |
| Replacing the impl at runtime | interface | `dyn` (default methods can enter the vtable if dyn-compatible) | `virtual` |

**Trap:** a Go interface **cannot** write a default method; stuffing the algorithm into the interface cannot be done; do not half-learn this and embed a struct with methods as a fake. If a Rust default method calls other methods that also have defaults, overriding one does not automatically change the other’s behavior unless the call chain actually reaches the overridden one. C++ CRTP calling back into the derived class from a constructor is an undefined-behavior risk.

---

## 8. Error pipelines (expert differences; baseline is 04)

**Plain:** Failure must travel up with context. Cleanup itself often cannot report another error.

**Picture:** Returning the key, you find the lock is broken. You still cannot file a new leave slip inside the “leave the room” action.


> **Same:** failure has to walk up with context.  
> **Different:** whether cleanup can fail; whether the type system has “cannot fail.”

```go
// illustrative
return fmt.Errorf("load %s: %w", path, err) // errors.Is / As look at the chain
```

```rust
// illustrative
// let cfg = load(path).context("load")?;  // anyhow is ecosystem
// A library’s public error prefers thiserror or a hand-written enum, not anyhow::Error
```

```cpp
// illustrative — three sets coexist; pick one and write it into the module boundary
// std::expected<Cfg, Err> e = load(path);
// Exceptions must not leave a destructor; do not mix error codes and exceptions in the same layer and pretend they are unified
```

| | Go | Rust | C++ |
|---|---|---|---|
| Main channel | `error` multiple return values | `Result` + `?` | you pick: exceptions / `expected` / codes |
| Extra context | `%w` chain | `source()` / ecosystem context | `system_error`, nested exceptions, or your own struct |
| Impossible errors | no `!`; use panic for bugs | `Infallible` / never (whether stable already equals `!`: see [08](08-expert-rust.md)) | `[[noreturn]]` is not a type |
| Cleanup failure | `Close` in `defer` is often dropped | `Drop` cannot return an error | destructors cannot throw |

---

## 9. The same intent: “generate code”

**Plain:** Enum-to-string, serialization, and similar boilerplate: all three want it generated, but when and with which tools differ completely.

**Picture:** Everyone wants to copy the list less. Some use a stamp, some a mimeograph, some make a separate trip to the print shop at night.


> **Same:** some boilerplate you do not want to write a second time (stringify enums, serialize, register).  
> **Different:** the three mechanisms do not substitute for each other. Details in 07–09; this section only blocks mistranslation.

| Intent | Go | Rust | C++ |
|---|---|---|---|
| Generate methods from a type | `go:generate` writes a **file** (does not automatically enter `go build`) | derive macros, expand during compile | templates, or draft reflection splice; macros have no hygiene |
| Look at fields at runtime | `reflect` | **N/A** (no isomorphic runtime reflection) | RTTI is not enough; P2996 is compile-time |
| Compile-time branch fails, take another path | **N/A** (no SFINAE) | **N/A** (specialization is unstable; cannot stand in for SFINAE) | SFINAE / concept subsumption |
| Hygienic macros | **N/A** | `macro_rules` has it; proc-macros rely on spans | preprocessor has **none** |

```go
//go:generate stringer -type=Kind
```

```rust
#[derive(Debug)]
struct Kind;
```

```cpp
// No standard derive. Macro: #define STRINGIFY(x) #x
// Only draft reflection can “ask for a member list”; see 07. Here N/A for portable code.
```

---

## 10. Interior mutability / write while sharing

**Plain:** Logically many people look at the same data at once, and you still need to change it. Only Rust forbids this by default, so it needs a dedicated hatch.

**Picture:** Everyone can read the notice board. Go and C++ let you walk up and change it; the risk is yours. Rust requires a locked pen or a single-thread special pen.


> **Same:** logically one shared copy, and you still need to mutate.  
> **Different:** only Rust makes “shared therefore immutable” the default, so it needs a dedicated escape hatch.

| | Go | Rust | C++ |
|---|---|---|---|
| Default | mutate freely; data races are a runtime problem | `&T` cannot mutate | `const` methods cannot mutate non-mutable members |
| Escape hatch | the language does not need one (N/A for UnsafeCell) | `UnsafeCell`, `Cell`, `RefCell`, `Mutex`, atomics | `mutable`, `const_cast` (the latter is easy UB) |
| On violation | `-race` may see it | `RefCell` panics; a data race in safe code should fail to compile | UB |

This is not the same API in three spellings. Do not write the Go/C++ cell as a translation of `UnsafeCell`.


The same sentence “shared by name, still mutate an integer inside” (illustrative):

```go
// Go — illustrative. The language does not forbid mutating through a shared pointer; data races are what -race may see in tests
type Box struct{ N int }
func bump(b *Box) { b.N++ }
```

```rust
// Rust — illustrative. &Box is a shared reference; Cell allows mutating a Copy field (single-threaded)
use std::cell::Cell;
struct Box { n: Cell<i32> }
fn bump(b: &Box) { b.n.set(b.n.get() + 1); }
```

```cpp
// C++ — illustrative. Mutate a mutable member in a const method. Do not const_cast away const; that easily becomes undefined behavior
struct Box {
  mutable int n = 0;
  void bump() const { ++n; }
};
```
---

## 11. How to pick a shape (wrap-up)

**Plain:** When migrating, first ask whether this cell is N/A. Do not hard-translate one family’s syntax into another’s.

**Picture:** In a glossary, stop when you see “no equivalent.” Do not invent a near-homophone.


| Intent you want | Prefer |
|---|---|
| Shapes closed, need exhaustiveness | Rust `enum`; C++ `variant`; Go accept non-exhaustive or switch to interface methods |
| Shapes open, caller depends only on operations | Go interface; Rust `dyn`; C++ virtual interface or value-semantic type erasure |
| Inject at construction | Go options; Rust builder; C++ config struct + references/smart pointers |
| Fold shared state into one owner | Go channel; Rust mpsc; C++ queue or strand |
| Give back on leaving scope | Go `defer`; Rust `Drop`; C++ RAII. Async close is a separate explicit function |
| Third-party binary extensions | all three fall back to a C ABI or a process. Do not pass each language’s object model |
| Reuse an algorithm at compile time | Go generic function; Rust trait default method; C++ template or deducing this. CRTP is not a required translation for Rust/Go |

**Opinion:** the comparison is so that when you migrate you know **which cell is N/A**. Translating CRTP into Go embedding, `defer` into “block-scope destructor,” `plugin` into a Rust trait object across a `.so` — those three are the mistranslations this page is here to block.

Do not write these three mistranslations as code (illustrative; only mark “not a counterpart”):

```go
// Go — illustrative. defer waits until the function returns, not the current braces
// defer f.Close()
```

```rust
// Rust — illustrative. A trait object is not a stable ABI across a .so
// let _: &dyn Driver;
```

```cpp
// C++ — illustrative. CRTP is not Go’s embedded field
// struct Dot : Repeat<Dot> {};
```

---

## 12. Not expanded (deferred)

**Plain:** Concrete widgets, distributed actors, and a compilable three-language sample repo are not on this page.

**Picture:** Stop here.


- Concrete widgets of each language’s UI binding (still only in [05-gui-binding.md](05-gui-binding.md)).
- Distributed actors (cluster membership, supervision trees). That is framework docs, not a language comparison.
- Persistent schema evolution and compatibility strategy.
- Turning every cell of this section into a compilable three-language example repo ([06](06-advanced-cross.md) already marks an isomorphic settings-core benchmark repo as a gap; this page did not build one either).

Back to the index: [README](README.md).
