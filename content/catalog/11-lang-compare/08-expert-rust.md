# 08. Expert layer: Rust (macros, variance, Pin, object safety, unsafe)

Checked: 2026-10-04 PT. Expert layer; does not change the frozen 01–06 bodies. Sample code is **illustrative**; it was not `cargo check`’d.

Cross-language expansion: [10-expert-patterns-cross.md](10-expert-patterns-cross.md). C++ / Go: [07](07-expert-cpp.md) / [09](09-expert-go.md).

### Status (2026-10-04)

| Claim | Status | Basis |
|---|---|---|
| GAT | stable in 1.65 (2022-11) | Rust 1.65 release notes |
| `async fn` in trait (static dispatch) | stable in 1.75 | official blog 2023-12-21 |
| A trait with `async fn` used as `dyn Trait` | **still no**. The 2026 project goal puts “native dyn dispatch” in progress, not a shipped language | original blog post and `goals.rust-lang.org` 2026 afidt goal |
| async Drop | **unstable**. Nightly has codegen tracking (#126482); destructors are still synchronous | tracking issue; 2026 “guaranteed destructors” is still a goal, not the present |
| specialization (RFC 1210) | **unstable and the current implementation is unsound**. `min_specialization` is a subset for the standard library, not a stable user interface. The 2026 goal is a redesign, not an announced stabilization date | tracking #31844; unstable book; 2026 specialization goal |
| const generics | integers / `char` / `bool` are stable; arbitrary ADTs as const parameters is still a 2026 goal, unfinished | 2026 const-generics goal |
| `!` never as a first-class type | diverging from a return position has long been available. Stabilization PR #155499 **merged to master 2026-08-24** (including changing never fallback to `!` on all editions, `Infallible = !`). In the public version index **1.99 released 2026-10-01**; that merge was after its branch window. Do not assume a stable release can freely write `Result<T, !>` at the time this page was written | PR #155499; version index. Treat `rustc -V` as source of truth |
| Strict provenance APIs | the `with_addr` / `exposed_provenance` family is already on stable (from about 1.84) | standard-library docs. Stacked/Tree Borrows are a **model**, not the full spec |

---

## 1. Declarative macros `macro_rules` and procedural macros

> **Same:** all three can generate code before compile. C++ has preprocessor macros **and** templates; Go has `go:generate` (another program writes files; see [09](09-expert-go.md)).  
> **Different:** Rust declarative macros match token trees and have hygiene. Procedural macros eat tokens and are **not** automatically hygienic; spans decide where names land. C++ macros have no hygiene. Go has no isomorphic macros (N/A).

```rust
// illustrative — declarative macro: fragment specifiers, repetition, hygiene
macro_rules! hash_map {
    ($($k:expr => $v:expr),* $(,)?) => {{
        let mut m = ::std::collections::HashMap::new();
        $( m.insert($k, $v); )*
        m
    }};
}
// Locals written inside the macro do not collide with same-named variables at the call site by default (hygiene).
// $crate still points at the crate that defined the macro after expansion.
```

```cpp
// C++ — the preprocessor has no hygiene; templates are the type-safe generation.
#define HASH_MAP_INSERT(m, k, v) (m).insert({(k), (v)})
```

```go
// Go — N/A: no macro_rules. Generate by having go:generate invoke an external program.
```

**Three kinds of proc-macro:** function-like (`#[proc_macro]`), attribute (`proc_macro_attribute`), derive (`proc_macro_derive`). They run in a crate outside the compiler process; input is `TokenStream`. In the ecosystem `syn` / `quote` are de facto standard, **not** std.

**Expert notes:**

- Derive macros cannot see “future” type inference; they only see syntax. For type information you have to parse again, or use a mechanism outside proc-macros.
- `Span::call_site` vs `Span::mixed_site` / def-site decides whether identifiers resolve at the call site or the definition site. Get it wrong and you punch a hygiene hole or the name cannot be found.
- Proc-macros **should** attach a span when expansion fails, not `panic` a string.
- Declarative-macro `tt` munchers (recursively eating the token tree) can fake a little “specialization”; compile time and recursion depth both explode. Prefer traits over munchers when you can.
- Macros 2.0 (the `macro` keyword set) has been unstable for years. This page does not treat unstable syntax as available.

---

## 2. HRTB (higher-ranked trait bounds)

> **Same:** all need to say “this holds for any short borrow.”  
> **Different:** Rust writes `for<'a> Trait<'a>`. C++ binds references at instantiation time with templates; there is no same syntax. Go interface-method references are GC pointers; there are no lifetime parameters (N/A).

```rust
// illustrative
fn apply<F>(f: F)
where
    F: for<'a> Fn(&'a str) -> usize,
{
    let _ = f("hi");
}
```

```cpp
// C++ — templates bind at the call. No for<'a>.
template <class F>
void apply(F f) { f(std::string_view{"hi"}); }
```

```go
// Go — N/A: no lifetime parameters. func(string) int is enough.
```

**Trap:** `impl for<'a> Trait<'a>` is stricter than “pick some `'a` at the call.” Many `Fn(&T)` are HRTB in practice. Before GAT, people used HRTB to dodge “a borrowed associated type”; now prefer seeing whether GAT can say it directly.

---

## 3. GAT (generic associated types)

> **Same:** associated types let a trait impl pick a type.  
> **Different:** GAT lets that associated type itself take a lifetime or type parameter. C++ member templates / alias templates are freer, and have no orphan rule. Go has **no** associated types (N/A); interfaces can only hold methods.

```rust
// illustrative — lending iteration: the next item borrows the container
trait Lending {
    type Item<'a> where Self: 'a;
    fn next<'a>(&'a mut self) -> Option<Self::Item<'a>>;
}
```

```cpp
// C++ — member templates, not trait associated types
template <class C>
struct Lending { template <class... > struct Item; };
```

```go
// Go — N/A: no associated types. Return an interface or a generic function; the expressiveness is not equivalent.
```

**Trap:** GAT being stable does not mean every trait-solver edge is smooth. Combined with trait objects, `dyn`, and “implied HRTB,” diagnostics still look like an internal compiler. Public-API GATs need example tests; do not rely on “it is stable” alone.

---

## 4. `Pin` / `Unpin` and pin projection

> **Same:** all three have self-referential structs as a **problem**.  
> **Different:** only Rust makes “must not move again” a type, `Pin<&mut T>`. C++ self-reference is you guaranteeing a stable address (the object inside a `unique_ptr`). Go stacks can grow and the compiler rewrites pointers; user code **cannot** safely do self-reference (N/A; the runtime forbids this dangerous thing).

```rust
// illustrative
// If an async fn state machine captured an internal reference, it must be Pin.
// Unpin types can be moved out of Pin safely (most ordinary types are Unpin automatically).
use std::marker::PhantomPinned;
struct SelfRef {
    _pin: PhantomPinned, // opt out of automatic Unpin
}
```

```cpp
// C++ — no Pin type. Address stability is a documentation convention.
// auto p = std::make_unique<Node>(); p->self = p.get();
```

```go
// Go — N/A: the language does not provide a safe user-space “fixed-address self-reference” pattern.
```

**Projection:** getting `Pin<&mut Field>` safely from `Pin<&mut Struct>` is valid only when the field is **structurally pinned** (if the struct is pinned, the field is pinned). `pin-project` / `pin-project-lite` generate that unsafe code with macros. Before writing `unsafe { Pin::new_unchecked }` you must prove: you never handed that field out as an unpinned `&mut`, and you never `mem::replace`’d the whole struct.

**Trap:** `Pin` is not “the heap.” `Pin<Box<T>>` and a stack `pin!` macro both work. `Pin` of an Unpin type is almost a no-op, which easily gives the illusion “I pinned it so self-reference is safe.”

---

## 5. `dyn Trait` and dyn compatibility (object safety)

> **Same:** pick an implementation at runtime. C++ virtual functions, Go interfaces, Rust trait objects.  
> **Different:** a Rust trait is **not** an object by default. Generic methods, returning `Self` by value, associated constants, and similar make a trait lose dyn compatibility. The official term changed from object-safe to **dyn-compatible**.

```rust
// illustrative
trait Draw {
    fn draw(&self);
    // fn clone_box(&self) -> Box<dyn Draw>; // returning Self, the size must be known; this pattern is common
}
fn paint(d: &dyn Draw) { d.draw(); }

// Static-dispatch async methods (1.75+) currently make the trait not dyn:
// trait Fetch { async fn get(&self); } // cannot write &dyn Fetch
```

```cpp
// C++ — virtual-function table. Template methods cannot be virtual.
struct Draw { virtual void draw() const = 0; virtual ~Draw() = default; };
```

```go
// Go — interfaces are inherently dynamic; there is no object-safety rule that “this set of methods cannot be an interface.”
type Draw interface{ Draw() }
```

**Rule skeleton (the reference manual is source of truth; this is compressed for memory):** methods on the object, the receiver must be some reference to `self`, or `self` with `Self: Sized` excluded; methods cannot have their own generic parameters; the return type cannot be bare `Self` (unknown size). A method with `where Self: Sized` is excluded from the vtable, which **rescues** the rest.

**async:** static `async fn` in trait has been stable since 1.75, desugaring to an anonymous associated type (RPITIT). `dyn` still does not work: the caller does not know how big the future is. `async-trait` boxes the future into `Pin<Box<dyn Future + Send>>`, trading allocation for dyn. Requiring the future to be `Send` also cannot be written as a stable, usable first-class bound on the trait — return-type notation (RTN) is still in progress. The 2026 language goal is to fill in dyn and `Send`, **not** “already filled in.”

---

## 6. `PhantomData` and variance

> **Same:** all have “this type parameter only appears at compile time.” C++ can use empty bases or unused template parameters. Go unused type parameters in generics must appear somewhere in the signature; there is no PhantomData (usually N/A).  
> **Different:** Rust uses `PhantomData` to tell the compiler **ownership, drop check, and variance** at once.

| Writing | Variance (compressed; details follow the nomicon) |
|---|---|
| `PhantomData<T>` | covariant, and dropck thinks you own `T` |
| `PhantomData<fn() -> T>` | covariant in `T`, but does not own |
| `PhantomData<fn(T)>` | contravariant in `T` |
| `PhantomData<*mut T>` | invariant |
| `PhantomData<Cell<T>>` / invariant containers | invariant |

```rust
// illustrative — owning-T raw-pointer wrapper: covariant + drop check
use std::marker::PhantomData;
struct Own<T> { ptr: *mut u8, _tag: PhantomData<T> }
```

```cpp
// C++ — variance is almost “do not cast wrong”; template parameters have no co/contravariance checking (function pointers are a separate layer).
template <class T>
struct Own { T* ptr; };
```

```go
// Go — N/A. An unused type parameter is a compile error; you cannot express variance with a marker field (the language has no such variance either).
```

**Trap:** covariant + mutable is the classic hole (`&mut T` must be invariant). `PhantomData<T>` makes drop check think the destructor might touch `T`, so it rejects “a short lifetime dropped into a long-lived struct.” That is often what you want; if not, use a non-owning form like `fn() -> T`, or unsafe `#[may_dangle]` (unstable, see below).

---

## 7. Interior mutability, Drop, `ManuallyDrop`

> **Same:** mutate while sharing; clean up on leaving scope. Comparison: [10](10-expert-patterns-cross.md).  
> **Different:** Rust makes “shared XOR mutable” a type rule; interior mutability is an **escape hatch**, rooted in `UnsafeCell`. C++ `mutable` is looser. Go has no aliasing rule; atomics and locks are convention (N/A for UnsafeCell).

```rust
// illustrative
use std::cell::{Cell, RefCell};
use std::mem::ManuallyDrop;
struct Cache { n: Cell<i32> }           // can mutate through &self; small T: Copy objects
// RefCell is runtime borrow/return; violating it panics. Mutex is cross-thread interior mutability.
// ManuallyDrop: suppress automatic Drop. Skipping ManuallyDrop::drop leaks; double drop is UB.
fn take<T>(x: &mut ManuallyDrop<T>) -> T { unsafe { ManuallyDrop::take(x) } }
```

```cpp
// C++ — mutable members can be changed in const methods. Destructors always run automatically (unless leak/placement).
struct Cache { mutable int n; };
```

```go
// Go — no exclusive borrows. Mutate cache fields directly; concurrency uses atomic / mutex.
type Cache struct{ n int }
```

**Drop order:** struct fields drop in **reverse** declaration order; locals reverse; “drop the value then drop the heap it owns” has to be read per concrete type. Inside a `Drop` impl, do not count on other fields still being alive — the order is part of the spec.

**`mem::forget` is safe**, so destruction is **not** guaranteed to run (`Rc` cycles, forget, leaks all count). That differs from C++ destructors running on the normal path, and from the intuition that “leak is a defect.” If an RAII guard is forgotten, the lock is never released.

**async Drop:** dropping a future = cancel. Cleanup must finish in **synchronous** `drop`; you cannot `.await`. To close a socket asynchronously, write an explicit `close().await` in the protocol; do not wait for Drop. Nightly async-drop work has not changed this discipline on the 2026-10 stable release.

---

## 8. `Send` / `Sync`, niches, `!`

> **Same:** all face “can this value go onto another thread.”  
> **Different:** Rust uses auto traits. Go goroutines can share almost anything; data races rely on the race detector and convention. C++ has no `Send`; `std::thread` only requires movable; a data race is UB, not a type error.

```rust
// illustrative
// Send: ownership can be sent to another thread. Sync: &T can be shared (i.e. T can be shared by reference across threads).
// *const T is !Send + !Sync. Rc is !Send + !Sync. Mutex<T> is Sync when T: Send.
fn assert_send<T: Send>() {}
```

```cpp
// C++ — N/A: no Send/Sync. The callable for std::thread must be movable.
```

```go
// Go — N/A: no auto traits. chan and goroutine do not check data races.
```

**Negative impls** `impl !Send for T` are a stable use of these two auto traits. General negative impls (arbitrary traits) are still unstable.

**Niche (niche optimization):** `Option<&T>`, `Option<NonNull<T>>`, `Option<NonZeroU32>` have the same width as a raw pointer / integer, because references and `NonZero` have no all-zero (or some) bit pattern. Same for `Option<Box<T>>`. Do not `transmute` yourself to “optimize”; you are depending on the library type’s valid-value invariant.

**`!`:** the type of a function that never returns. `Infallible` was historically an empty enum, used to simulate `!`. Once stabilization lands with your compiler, fallback changing from `()` to `!` makes `foo()?` error when the type cannot be inferred — it used to infer `()`, now it infers `!`. This is a known break. Read the release notes before upgrading, rather than inferring your machine’s rustc from this page’s dates.

---

## 9. Specialization (unstable) and the bounds of const generics

> **Same:** all want “a faster impl for a more specific type.”  
> **Different:** C++ partial specialization is everyday. Rust specialization **cannot be written on stable**. Go has no specialization (N/A).

```rust
// Do not write default fn + overlapping impls on stable. The following is the unstable shape, not usable code.
// impl<T> Trait for T { default fn f(&self) {} }
// impl Trait for u32 { fn f(&self) {} }
```

```cpp
// C++ — partial specialization is a normal tool
template <class T> struct Id { using type = T; };
template <class T> struct Id<T*> { using type = T; };
```

```go
// Go — N/A: no specialization. Write a faster path as an ordinary function, or a runtime type switch.
```

**Why it is stuck:** when lifetimes are type parameters, “more specific” can depend on a lifetime, and you can manufacture UB in safe code. `min_specialization` tries to keep only the “always applies” subset for `std`; the docs say it is not a stable user feature, and it still has implementation bugs. The 2026 project goal is to survey use cases and redesign. **Do not** turn on `#![feature(specialization)]` in an application crate as a performance switch.

**const generics:** `struct Buf<const N: usize>` is stable. Which operations `N` can do, and whether a struct can be a const parameter, the stable subset is still narrow. When you need “a const value of an arbitrary type,” treat it as unfinished and fall back to macros or a runtime field.

---

## 10. `unsafe`, provenance, DST, `CoerceUnsized`, dropck

> **Same:** all can touch raw memory.  
> **Different:** Rust `unsafe` is a **contract boundary**: a safe function must not have UB, even if it contains unsafe inside. C++ is that boundary for the whole language. Go `unsafe` is narrower; what you violate are the `unsafe.Pointer` rules (see [09](09-expert-go.md)).

**Provenance:** a pointer is not just an integer. Turning a pointer into an integer and back is allowed under the strict provenance model only when the provenance was **exposed**. `with_exposed_provenance` is the API for that path; if you can `with_addr` to change the address **in the same allocation**, do not go through an integer. Stacked Borrows / Tree Borrows explain aliasing; Miri checks them; they are stricter or more specific than the reference, so a failure is not necessarily “the spec calls this UB,” but it is warning enough.

```rust
// illustrative — do not dereference an arbitrary usize as a pointer in a safe API
let p = &1u32 as *const u32;
let _addr = p as usize; // whether this exposes depends on the API path you used; new code uses expose_provenance
```

```cpp
// C++ — pointer/integer conversions are a mix of implementation-defined/undefined; there is no Rust-style API.
```

```go
// Go — conversions between unsafe.Pointer and uintptr have a few patterns in the spec; see 09.
```

**DST:** `str`, `[T]`, `dyn Trait` have unknown size at compile time and can only sit behind a pointer (`&`, `Box`, last field). Fat pointer = data address + metadata (length or vtable).

**`CoerceUnsized`:** coercions like `&[T; N]` → `&[T]`, `Box<T>` → `Box<dyn Trait>` are a mix of compiler built-ins and an unstable trait. User types that want the same coercion usually need nightly `CoerceUnsized`. Do not depend on impl’ing it yourself on stable unless you are writing the standard library.

**dropck:** a type parameter the destructor might access cannot have a lifetime shorter than the struct. `#[may_dangle]` (dropck eyepatch) says “I do not touch `T` in the destructor”; it is unstable; `Vec` uses it so `Vec<&'a T>` can end in a shorter scope. Application code should change the structure first, not turn this feature on.

---

## 11. Syntactic sugar: reborrow, `?`, `Try`

> **Same:** all have “write a little less” syntax.  
> **Different:** this sugar changes borrowing and type inference; it is not as obvious as macro expansion.

**Reborrow:** `&mut T` is not `Copy`, but on `&mut *r` or a method call the compiler reborrows so the original `r` can be used again after the short borrow ends. Two-phase borrows let `v.push(v.len())` — “shared read then mutate” — pass in specific cases. When you cannot read a borrow error, write the reborrow explicitly first.

**Match binding modes (match ergonomics):** `match &opt { Some(x) =>` auto-derefs and may bind `x` as a reference. `ref` / `ref mut` is the old writing. Editions did not tear this down and rebuild it by default, but you will hit it reading macro expansions.

**`?`:** stable for `Result` and `Option`. It is sugar for `Try`: failure `return`s, success unwraps. **Implementing `Try` for your own type** has long sat behind `try_trait_v2`; treat it as an unstable interface at the time this page was written. Check the tracking issue before use; do not assume you can impl it in a stable library’s public trait.

```rust
// illustrative
fn parse(s: &str) -> Result<i32, std::num::ParseIntError> {
    let n = s.parse::<i32>()?; // fail and return early
    Ok(n)
}
```

```cpp
// C++ — no ?. The nearest analogue is expected’s and_then, or a macro.
```

```go
// Go — no ?. if err != nil { return err }.
```

**Other sugar that makes people pause:** autoderef / autoref in method resolution; `return` having type `!` so it can nest in expressions; `async` block captures became more precise in the 2024 edition (precise capturing), so lifetimes show up in signatures more often. `.await` has lower precedence than the method-call dot and higher than most operators — parenthesize when you should.

---

## 12. One comparison table with C++ / Go (Rust view)

| Topic | Rust | C++ | Go |
|---|---|---|---|
| Code generation | macro_rules + proc-macro | macros + templates + draft reflection | go:generate / no macros |
| Compile-time polymorphism | trait + GAT | templates / CRTP | generics, no associated types |
| Runtime polymorphism | dyn, with compatibility rules | virtual functions | interface |
| Must not move | Pin | docs + heap address | do not self-reference |
| Data races | Send/Sync; banned in safe code | UB | allowed; rely on the detector |
| Canceling async | drop the future (synchronous destructor) | library (stop_token and similar) | context cancel |

---

## 13. Not expanded (deferred)

- Replacing the borrow checker with Polonius, remaining NLL edges.
- `async` iterators (`Stream`) and library design for lending iteration.
- Effect systems / keyword generics (`const`/`async` as effects); unstabilized proposals.
- Inline-assembly templates, platform tables of ABI calling conventions.
- An inventory of every unstable feature in the standard library.

Back to the index: [README](README.md).
