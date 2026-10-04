# 07. Expert layer: C++ (templates, types, coroutines, reflection direction)

> Teaching layer (2026-10-04 PT): read **Plain** and **Picture** first in each section; terms come after. First-read path: [00-how-to-read.md](00-how-to-read.md). Code blocks are all illustrative.


Checked: 2026-10-04 PT. This page is the **07+ expert layer** in [README](README.md). It does not change the frozen baseline in [01-syntax.md](01-syntax.md)–[06-advanced-cross.md](06-advanced-cross.md). The baseline only says “there are templates / concepts / coroutines”; this page is the pits people with ten-plus years still argue about.

Sample code is all **illustrative**. It was not compiled here line by line with any particular compiler version. Standard adoption ≠ all three major compilers have a production switch.

Expanded cross-language examples: [10-expert-patterns-cross.md](10-expert-patterns-cross.md). Rust / Go deep dives: [08](08-expert-rust.md) / [09](09-expert-go.md).

### Status (dates written in; do not treat drafts as shipping)

| Claim | Status (2026-10-04) | Basis |
|---|---|---|
| Concepts, `<=>`, coroutines, `consteval`/`constinit`, modules, NTTP relaxation | C++20 text; implementation maturity is per-feature | Standard text, not measured in this directory |
| `std::move_only_function`, deducing `this`, `if consteval` | C++23 | Same as above |
| Reflection P2996 and companions (annotations, function-parameter reflection, `std::meta` errors, expansion statements) | **Already in the C++26 draft** (adopted 2025-06 Sofia). 2026-03 Croydon ended C++26 **technical work**; it entered DIS / editorial. ISO publication date is ISO’s | Herb Sutter 2026-03-29 trip report; libc++ C++26 status page lists P2996R13 |
| `std::indirect` / `std::polymorphic` (P3019R14) | Draft vocabulary types, not “std everyone can link” | 2025-02 LWG motion into the draft; libc++ implementation has lagged the text |
| GCC reflection | Public reports that GCC 16.1 (2026-04) ships `-freflection` | Second-hand reports; treat that version’s release notes as source of truth |
| Clang reflection | Upstream incomplete; Bloomberg `clang-p2996` describes itself as experimental, **do not use for production artifacts** | That repo’s README |

**Opinion (opinion):** new libraries in 2026 can write interfaces against C++20/23; reflection and `std::polymorphic` are only fit for “draft experiments,” not an ABI you need to keep compatible for three years.

---

## 1. Value categories (glvalue / prvalue / xvalue)

**Plain:** C++ asks of an expression: is it a named, living object, or a temporary result used right away to initialize something else.

**Picture:** “My water cup” is a concrete cup. “Pour a cup of water” is the result of an action; it does not need a cup-slot on the table until you set it down.


> **Same:** all three languages distinguish “an object with identity” from “a temporary result.”  
> **Different:** only C++ makes this part of overload resolution. Rust’s move / reborrow and Go’s value copies are different axes; they **do not** have the glvalue vocabulary.

From C++17, expressions are first split by whether they have identity and whether they can be moved from:

| Category | Meaning | Typical |
|---|---|---|
| glvalue | has identity | variable, `*p`, member |
| lvalue | a glvalue that should not be stolen | named object |
| xvalue | “about to die” glvalue | `std::move(x)`, returning an rvalue reference |
| prvalue | used to initialize; need not occupy an object of its own | `42`, a function that returns `T` |
| rvalue | xvalue or prvalue | can bind to `T&&` |

C++17 **guaranteed copy elision**: when a returned prvalue initializes the target, there is no longer “construct a temporary then copy.” Temporary materialization turns a prvalue into an xvalue so it has identity. `decltype(auto)`, `auto&&`, and perfect forwarding all sit on this line.

```cpp
// C++ — illustrative
Widget factory();          // returns a prvalue
Widget w = factory();      // initializes w directly, not “temporary + copy”
auto&& r = factory();      // materialize a temporary, bind r to it, destroy at end of statement
using X = decltype(std::move(w)); // X is Widget&& (xvalue)
```

```rust
// Rust — the nearest analogue is move and reborrow, not value categories. N/A: no glvalue/prvalue.
fn factory() -> Widget { Widget }
let w = factory();       // move
let r = &mut w;          // reborrow; see 08
```

```go
// Go — N/A: no value categories. Assignment and argument passing copy the header or the value depending on the type.
func factory() Widget { return Widget{} }
w := factory() // value copy; slices/maps/interfaces copy the header
```

**Trap:** `const auto& x = factory();` can extend the temporary’s lifetime; `auto&` cannot bind a prvalue. Returning a reference to a local is still dangling; elision does not save you.

---

## 2. Perfect forwarding

**Plain:** A wrapper function should hand the parameters it received to the next layer as they were: copy when a copy is wanted, move when a move is wanted. Do not get it wrong in the middle.

**Picture:** The reception desk forwards an envelope. Do not open it, photocopy it, and reseal it, unless the other person asked for a copy.


> **Same:** all want to “hand the caller’s value to the next layer as-is.”  
> **Different:** C++ uses forwarding references + `std::forward`. Rust uses ownership / `impl Trait` / macros. Go has **no** overloading and no forwarding references (N/A).

`T&&` is a forwarding reference (universal reference) only when **T is a deduced template parameter**. `Widget&&` is always an rvalue reference. Reference collapsing: `T& &` → `T&`, everything else → `T&&`.

```cpp
// C++ — illustrative
template <class T>
void sink(T&& x) { real(std::forward<T>(x)); }

template <class... Ts>
auto make(Ts&&... xs) {
  return Widget{std::forward<Ts>(xs)...};
}
```

```rust
// Rust — illustrative. Generics + ownership *are* the “forwarding”; there is no std::forward.
fn sink(x: impl Into<Widget>) { let _w = x.into(); }
```

```go
// Go — N/A. No overloading, and no forwarding by value category. To keep an interface’s dynamic type, keep passing the interface value.
func sink(x any) { _ = x }
```

**Trap (C++):**

- Brace-init lists like `{1,2}` cannot deduce `T`.
- Overloaded function names and template names cannot be forwarding arguments; write a function pointer first.
- `0` / `NULL` deduce as integer, not pointer; use `nullptr`.
- Forwarding a parameter and then storing it in a member does not automatically extend lifetime.
- Using the wrong type with `std::forward` steals from an lvalue. C++23 deducing `this` does not replace `std::forward`.

---

## 3. Three-way comparison `<=>` (spaceship)

**Plain:** One comparison can answer less-than, equal, or greater-than, instead of writing only a `<`.

**Picture:** In a line, you can say who is taller in one go. You do not first ask “are you shorter?” and then “are you the same height?”


> **Same:** all three can define order.  
> **Different:** only C++20 has compiler-synthesized `<=>` and “rewritten candidates.” Rust is `Ord`/`PartialOrd` (floats have no total order, so `PartialOrd`). Go’s `<` covers only a few types; structs you write yourself; in generics use `cmp.Ordered`.

```cpp
// C++ — illustrative
struct Pt {
  int x{}, y{};
  // Defaulting <=> alone does not give you ==. This is the most common crash.
  friend auto operator<=>(const Pt&, const Pt&) = default;
  friend bool operator==(const Pt&, const Pt&) = default;
};
// The type of (a <=> b) is partial/weak/strong_ordering, not bool.
```

```rust
// Rust — illustrative
#[derive(PartialEq, Eq, PartialOrd, Ord)]
struct Pt { x: i32, y: i32 }
// f64 is only PartialOrd: NaN is incomparable. No <=> operator.
```

```go
// Go — structs have no synthesized <. cmp.Ordered does not include structs.
// N/A: no spaceship. Sort with sort.Slice / slices.SortFunc.
```

**Trap:**

1. `= default` `<=>` does **not** generate `==` / `!=`. If you want equality, default `==` as well. When both are defaulted, the compiler can short-circuit `==` without computing the three-way result first.
2. `a < b` can be rewritten as `(a <=> b) < 0`, and arguments can be reversed. Heterogeneous comparison (different types on the two sides of `operator<=>`) is easy to make ambiguous.
3. `float` is `partial_ordering` (NaN). Do not assume every `<=>` is `strong_ordering`.
4. If a member has no `<=>`, the outer default becomes deleted. Wrapping an old type that only has `operator<` does not automatically make it strong.
5. Using the result as a boolean does not compile. `std::rel_ops` is obsolete and can still be found via ADL.

---

## 4. Template metaprogramming and fold expressions

**Plain:** A template is a compile-time formula expanded by type. A fold writes “add them all up” once for a pack of the same operation.

**Picture:** Write “add each person’s score into the total” as an ellipsis, instead of copying ten lines of addition.


> **Same:** all can branch on types at compile time.  
> **Different:** C++ templates are a **Turing-complete overloading game** (SFINAE, specialization, pack expansion). Rust uses traits + const generics + macros; coherence forbids arbitrary specialization. Go generics have no specialization and no type packs; compile-time branching is shallow (see [09](09-expert-go.md)).

```cpp
// C++17 fold — illustrative
template <class... Ts>
auto sum(Ts... xs) { return (xs + ... + 0); } // binary right fold; empty pack yields 0

template <class... Ts>
void print_all(const Ts&... xs) { (std::cout << ... << xs); }
```

A unary fold over an empty pack is defined only for a few operators: `&&` yields `true`, `||` yields `false`, comma yields `void()`. A unary fold of `+` over an empty pack is an error.

```rust
// Rust — no parameter packs. Variadic is macros, or a runtime slice.
macro_rules! sum {
    ($($x:expr),* $(,)?) => { 0 $(+ $x)* }; // illustrative
}
```

```go
// Go — N/A: no type packs, no fold. Variadic ...T is a runtime slice.
func sum(xs ...int) int {
    n := 0
    for _, x := range xs { n += x }
    return n
}
```

**Classic TMP (you will still hit it; do not pile it into new code):** type lists, `std::integer_sequence`, recursive `if constexpr` instead of SFINAE chains. A discarded `if constexpr` branch still has to be **syntactically instantiable**; it just does not instantiate the bits of the template body that depend on the discarded path — that distinction is a dedicated trap.

---

## 5. SFINAE → concepts / requires

**Plain:** If a type does not fit this function, switch to another one, instead of dumping a pile of unreadable inner errors.

**Picture:** Signing up for basketball: if you are not tall enough, switch to another sport. Do not tear up the form halfway through filling it and refuse to say why.


> **Same:** “if this type does not work, take another path.”  
> **Different:** only C++ treats **substitution failure is not an error** (SFINAE) as the engine of overloading. In Rust, substitution failure is an error (specialization is still unstable and cannot stand in for SFINAE). In Go, a failed constraint is an error; there is no next candidate.

```cpp
// Old: SFINAE — illustrative
template <class T>
auto f(T x) -> std::enable_if_t<std::is_integral_v<T>, int> { return (int)x; }

// New: constraints are first-class in overload resolution
template <class T>
  requires std::integral<T>
int f2(T x) { return (int)x; }

template <class T>
int f2(T x) requires std::floating_point<T> { return (int)x; }

// Requires-expression: if it is valid, the constraint holds; if not, constraint failure (not a hard error)
template <class T>
concept Addable = requires(T a, T b) { { a + b } -> std::convertible_to<T>; };
```

```rust
// Rust — illustrative. This is a constraint, not SFINAE.
fn f2<T: Into<i32>>(x: T) -> i32 { x.into() }
```

```go
// Go — illustrative. Constraint failure is a compile error; there is no “pick another overload.”
func f2[T ~int | ~int64](x T) int { return int(x) }
```

**Concept notes:**

- **Constraint subsumption:** when `Integral` is more general than `SignedIntegral`, the more specific overload wins. This is the real gain of concepts over `enable_if`, not just prettier diagnostics.
- A `requires` clause and a `requires` expression are two different things. The former hangs on a declaration; the latter is a boolean constraint.
- Concepts are not “contracts”: satisfying `Addable` does not guarantee `+` is side-effect-free or commutative. Semantics are still written by people.
- Short-circuit: `requires A && requires B` vs `requires(A && B)` differ in atomic-constraint granularity, which affects subsumption.
- Do not do heavy work inside concepts, or depend on surprise overloads found by ADL; concepts are checked repeatedly.

---

## 6. CTAD, NTTP, constexpr / consteval / constinit

**Plain:** Some information the compiler can finish at compile time: a type can be guessed from constructor arguments, and some functions may only be called at compile time.

**Picture:** Some arithmetic teachers require the sum finished in mental math. You may not bring a calculator into the exam hall.


> **Same:** all have some compile-time computation.  
> **Different:** C++ `constexpr` is a runtime function that **can also** run at compile time; `consteval` **must** be compile time. Rust `const fn` is closer to a restricted constexpr, and the stable subset is narrower than C++ (see [08](08-expert-rust.md)). Go `const` is only numbers/strings/bools; there are **no** const functions (N/A).

```cpp
// illustrative
template <class T>
struct Box { T value; Box(T v) : value(std::move(v)) {} };
Box b(1);                 // CTAD → Box<int>
// CTAD for alias templates needs C++20 alias deduction guides

template <class T, std::size_t N>
struct Arr { T data[N]; };

struct Tag { int id; };  // public, literal, no mutable → can be a structural NTTP (C++20 rules are narrow)
template <Tag tag>
constexpr int tag_id() { return tag.id; }

constexpr int twice(int x) { return x * 2; }     // can also be called at runtime
consteval int must(int x) { return x * 2; }      // arguments must be constant expressions
constinit int g = twice(2);                      // static initialization; g is not const
```

```rust
// Rust — the stable subset of const fn is usable; generic const parameters are still limited, see 08.
const fn twice(x: i32) -> i32 { x * 2 }
```

```go
// Go — N/A: no const fn, no non-type template parameters. const folds at compile time, but it is literal arithmetic.
const g = 4
```

**Trap:**

- CTAD has exceptions for aggregates, deduction guides, and `explicit` constructors. If you cannot read it, write `Box<int>`.
- NTTP “structural type” requirements: literal type; bases public and themselves structural; non-static data members public and structural; no mutable/volatile. Not “any class can be a template argument.”
- Things once banned in `constexpr` functions (`new`, virtual calls, `try`) have been relaxed across standard versions; when **writing a library**, write to the `-std` you promise, not “clang on my machine can compile it.”
- `constinit` prevents dynamic initialization in the static-initialization-order mess; it is not thread safety, and it is not constant folding.
- C++23 `if consteval` takes another path during constant evaluation, with fewer misuses than `std::is_constant_evaluated()`.

---

## 7. CRTP, mixin, deducing this

**Plain:** When a base class wants to call a function on “the real derived class,” it takes the derived class’s name as a template parameter.

**Picture:** A generic duty roster leaves “class” blank. Each class prints its own name onto it, so the roster can call the right people.


> **Same:** compile-time polymorphism, avoiding virtual calls. Expanded comparison: [10](10-expert-patterns-cross.md).  
> **Different:** C++ uses the curiously recurring template (derived class as the base’s template argument). Rust uses trait default methods and **does not** need to pass `Self` as a template parameter again (that is the hole CRTP fills). Go has no inheritance, N/A; use small interfaces + generic functions.

```cpp
// CRTP — illustrative
template <class D>
struct Repeat {
  void write_n(int n) {
    auto& d = static_cast<D&>(*this);
    for (int i = 0; i < n; ++i) d.write_one();
  }
};
struct Dot : Repeat<Dot> { void write_one(); };

// C++23 explicit object parameter; a lot of CRTP can retire
struct Dot23 {
  void write_one();
  void write_n(this auto& self, int n) {
    for (int i = 0; i < n; ++i) self.write_one();
  }
};
```

```rust
// Rust — trait default methods, not CRTP
trait Repeat {
    fn write_one(&mut self);
    fn write_n(&mut self, n: u32) {
        for _ in 0..n { self.write_one(); }
    }
}
```

```go
// Go — N/A: no CRTP. Generic functions wrapped around an interface.
type One interface{ WriteOne() }
func WriteN[T One](t T, n int) {
    for i := 0; i < n; i++ { t.WriteOne() }
}
```

**Mixin:** stacking several CRTP bases as policies (policy-based design) is an old C++-library tradition. The cost is diagnostics, which layer holds state, and whether empty-base optimization actually fires. C++20 can `requires` that `D` have `write_one`, which removes one silent `static_cast` disaster.

**Trap:** calling a derived function from a CRTP base while the derived object is not fully constructed yet (a callback from a constructor) is a UB risk. `static_cast<D*>` does not check that you really are a `D`.

---

## 8. EBO and `[[no_unique_address]]`

**Plain:** An empty tag with no data should not take its own extra seat.

**Picture:** A blank extra page can stick to the back of the main text. Do not bind it as its own page.


> **Same:** all want a “data-less tag” to take no space. Rust `PhantomData` / empty structs are often ZSTs. Go’s empty `struct{}` has width 0, but **array/slice elements** still have implementation-defined details, and that is not EBO.  
> **Different:** C++ empty-base optimization is an ABI layout rule, not a type-system feature.

```cpp
// illustrative
struct Empty {};
template <class T>
struct Pair : Empty {  // empty bases often do not increase sizeof
  T value;
};
struct Member {
  Empty e;
  int value;
  // C++20: members may overlap too. Do not lock sizeof across compilers.
  [[no_unique_address]] Empty tag{};
};
```

```rust
// Rust — empty structs / PhantomData are usually ZSTs; layout is the compiler’s, not called EBO.
struct Empty;
struct Pair<T> { _tag: Empty, value: T }
```

```go
// Go — struct{} has size 0. Not empty-base optimization (there are no bases).
type Pair struct {
    tag   struct{}
    value int
}
```

**Trap:** two empty subobjects of the **same type** must have different addresses (object identity). Different empty bases can stack. Historical MSVC vs Itanium behavior for `[[no_unique_address]]` is inconsistent; **do not** write `sizeof` into a serialization format.

---

## 9. ADL (Koenig lookup)

**Plain:** When you write `a + b`, the compiler also looks in the namespaces of `a` and `b` for a suitable `+`.

**Picture:** Looking up class rules: besides school-wide rules, you also open this class’s own folder.


> **Same:** operators and “swap” want to use the type’s own implementation.  
> **Different:** only C++ **additionally** pulls free functions from the associated namespaces of the arguments. Rust trait-method lookup is a different system (method resolution + coherence). Go method sets only see the type’s own methods; there is no ADL (N/A).

```cpp
// illustrative — hidden friend: found only via ADL, not ordinary lookup
struct Qty {
  int n{};
  friend Qty operator+(Qty a, Qty b) { return {a.n + b.n}; }
};
// customization point: using std::swap; swap(a, b); lets ADL pick a better swap
```

```rust
// Rust — traits, not ADL. The orphan rule limits where you may impl for someone else’s type.
trait QtyAdd { fn add(self, other: Self) -> Self; }
```

```go
// Go — N/A: no ADL. Methods must be declared in the type’s package.
```

**Trap:** unconstrained templates + ADL = names that suddenly appear depending on the arguments (two-phase lookup). Concepts can pin down the legal operations and cut “it happened to compile.” Do not make a customization point both an ADL function and a same-named function in `std`, unless you are writing the classic `swap` pattern. Ranges CPOs (customization point objects) are the committee’s answer to ADL running away, not another piece of syntactic sugar.

---

## 10. Expression templates

**Plain:** Record `a + b + c` first as “addition to do later,” and finish it in one loop, instead of building a new array after each `+`.

**Picture:** Write the shopping list first, then add it up at the checkout. Do not pay once for every item you pick up.


> **Same:** want `a+b+c` fused into one loop, not a materialization on every `+`.  
> **Different:** this is a C++ numeric-library technique (Eigen and similar). Rust uses iterator adapters; Go has no isomorphic construct (N/A) — write a loop.

```cpp
// illustrative — skeleton, not usable as a library
template <class L, class R>
struct Sum { const L& l; const R& r; };
template <class L, class R>
Sum<L, R> operator+(const L& l, const R& r) { return {l, r}; }
// auto s = a + b + c;  // s holds references. If a,b,c die, it dangles.
```

```rust
// Rust — iterator chains are lazy; ownership rules block most dangling.
// xs.iter().zip(ys).map(|(a, b)| a + b)  // illustrative
```

```go
// Go — N/A.
```

**Trap:** catching an expression template with `auto` is almost always wrong (dangling or accidental laziness). Aliasing and self-assignment (`a = a + b`) need an assignment special case. Prefer `std::ranges` / explicit loops in new code; leave expression templates for when you are actually maintaining a numeric kernel.

---

## 11. Type erasure

**Plain:** The caller only cares that something “can be called” or “can draw.” They do not have to write the concrete type name.

**Picture:** The homework basket only requires a workbook. It does not print a particular student’s name on the basket.


> **Same:** collect different concrete types into one copyable/callable value. Three-language comparison: [10](10-expert-patterns-cross.md).  
> **Different:** the C++ standard library has throwing `any`, possibly-allocating `function`, the C++23 move-only version, and value-semantic polymorphism in the C++26 draft.

| Tool | What it erases | Remember |
|---|---|---|
| `std::function` | callable objects | may heap-allocate; calling an empty one throws `bad_function_call`; signature is fixed, often requires copyable |
| `std::move_only_function` (C++23) | move-only callables | fits a lambda that captured `unique_ptr` |
| `std::any` | any copyable type | `any_cast<T>` throws if the type is wrong; pointer form returns null |
| Hand-written virtual interface / `unique_ptr<Base>` | a set of operations | allocation; no value-semantic copy unless you write clone |
| `std::polymorphic<T>` / `std::indirect<T>` (C++26 draft, P3019) | heap object / polymorphic value with value semantics | **the text is in the draft; do not assume implementations shipped with your compiler** |

```cpp
// illustrative
std::function<int(int)> f = [](int x) { return x + 1; };
std::any a = 3;
// std::move_only_function<void()> g = [p = std::make_unique<int>(1)] {};
```

```rust
// Rust — trait objects or enum; see 08 / 10
let f: Box<dyn Fn(i32) -> i32> = Box::new(|x| x + 1);
```

```go
// Go — interfaces are erasure
var f func(int) int = func(x int) int { return x + 1 }
var a any = 3
```

**Hand-written type erasure** (the Sean Parent “inheritance is the base class of evil” line): the virtual base lives only in the `.cpp`; the outer type is a value type; copies go through `clone()`. That is the polymorphic-value pattern. Draft `std::polymorphic` wants to standardize this; until it lands, the pattern is still hand-written.

**Trap:** the small-object-optimization capacity of `std::function` is implementation-defined. Stuffing something that throws into a destructor path tangles with exception safety. `any` cannot hold move-only types (that is `any`’s design, not you using it wrong).

---

## 12. Coroutines (`co_await` / promise)

**Plain:** Write “wait for the result, then continue” as straight-line code. C++ only cuts the function into a state machine; it does not schedule threads for you.

**Picture:** You write “wait for the water to boil, then add noodles.” If nobody at home watches the kettle, you have to hire that person separately.


> **Same:** all can write an “async function” as straight-line code.  
> **Different:** C++20 coroutines are **stackless**, the compiler turns them into a state machine, and **the language has no scheduler**. Go goroutines are stacked runtime threads. Rust `async` is also a stackless state machine, but it is welded to `Future` + `Pin` (see [08](08-expert-rust.md)).

You write `co_await` / `co_yield` / `co_return`. The compiler looks up the **promise type** (`promise_type`) and generates a `coroutine_handle`. Where it actually waits is decided by `await_suspend`: return `bool`, return another handle (symmetric transfer), or `void`.

```cpp
// illustrative — shape only. No executor; not a mini runtime.
template <class T>
struct Task {
  struct promise_type {
    Task get_return_object();
    std::suspend_always initial_suspend() noexcept;
    std::suspend_always final_suspend() noexcept;
    void return_value(T);
    void unhandled_exception();
  };
};
// Task<int> work() { int x = co_await read(); co_return x; }
```

```rust
// Rust — async fn desugars to a Future; see 08. The language has .await.
// async fn work() -> i32 { let x = read().await; x }
```

```go
// Go — not a coroutine transform. The runtime schedules blocking points.
// x := read() // the call looks synchronous; the goroutine can be suspended
```

**Expert notes:**

- Frames may heap-allocate by default. Whether that is elided (HALO) is **not a standard guarantee**.
- The operand of `co_await` needs `await_ready` / `await_suspend` / `await_resume`, or goes through `operator co_await` / `await_transform`.
- Cancellation is not a language feature. `std::stop_token`, a custom awaiter, or dropping the coroutine into a sender (`std::execution`, a separate case, not expanded here) are all library.
- Destructors run when you **resume to completion or destroy the handle**. Forgetting `destroy` leaks the frame. `destroy` on an already-finished handle is wrong.
- Exceptions leaving a coroutine boundary go through `unhandled_exception`; they do not automatically become ordinary exceptions at the caller unless the promise is written that way.
- Symmetric transfer is for avoiding stack overflow (coroutines waiting on each other). Only people writing schedulers need it; application code uses an existing library (cppcoro is old; asio, folly, libcoro, and similar — naming is not an endorsement).

**Opinion:** do not hand-write a promise at the application layer. If you hand-write one, treat it as implementing an executor, not a syntax-sugar exercise.

---

## 13. Modules (overview, not a build handbook)

**Plain:** Modules want to replace “paste the whole header in as text.” The compiler reads the interface at module boundaries.

**Picture:** Hand in a book report as a table of contents plus a summary, instead of photocopying the whole book into your notebook.


> **Same:** all want to replace “copy-paste headers / infinite compiles.”  
> **Different:** a Go package *is* the translation unit. Rust `mod` is an in-language tree; the crate is the boundary. C++20 modules grew up **beside** the header ecosystem; BMIs do not cross compilers.

```cpp
// illustrative — syntax skeleton
// export module demo;
// export import <vector>;
// export int answer();
```

```rust
// Rust — modules are not C++ modules. Crate root + mod declarations.
// mod demo { pub fn answer() -> i32 { 42 } }
```

```go
// Go — package is the unit. N/A: no headers, no BMI.
package demo
func Answer() int { return 42 }
```

**2026 practice (opinion):** `import std;` (the C++23 standard-library module) is much more usable on major compilers than in 2020; you still have to align with CMake/build versions. Large old libraries continuing with headers + PCH/precompiled headers is normal. Modules do **not** solve macros, do not solve ODR destroyed by macros, and do not provide a stable ABI. Header units are a transition, not the destination.

---

## 14. Reflection: P2996 direction (C++26 draft)

**Plain:** Reflection lets a program ask at compile time “which members does this type have,” then generate code from that list.

**Picture:** A roll sheet can ask “which columns does this row have,” instead of copying column names by hand again. In C++ this is still a draft, not a daily switch on all three compilers.


> **Same:** all want to ask “what members does this type have?” from the program.  
> **Different:** Go `reflect` is **runtime**. C++26 P2996 is **compile-time** `std::meta::info`. Rust has **no** isomorphic runtime reflection; compile time uses macros (see [08](08-expert-rust.md)). Do not write these three things as one word.

Shape that keeps showing up in public papers and draft discussion (**syntax follows the current working draft**; the following is not a compilable promise):

- `^^T` / `^^expr` produces a reflection value `std::meta::info`.
- `[: refl :]` splices the reflection back into source (name, type, expression).
- Queries such as `std::meta::nonstatic_data_members_of`.
- Companions: expansion statements (`template for`, P1306), annotations (P3394), function-parameter reflection (P3096).
- Generating new code is splice + constant evaluation, not Go-style `Value.Set`.

```cpp
// illustrative — draft flavor, not a production snippet
// constexpr auto mems = std::meta::nonstatic_data_members_of(^^Pt);
// template for (constexpr auto m : mems) { /* use [:m:] */ }
```

```rust
// Rust — N/A: no std::meta. Derive macros look at tokens/syntax trees at compile time.
#[derive(Debug)] struct Pt { x: i32, y: i32 }
```

```go
// Go — runtime
// t := reflect.TypeOf(Pt{}); t.Field(0).Name
```

**Difference from macros / templates:** templates “happen to” know members at instantiation time, but there is no first-class “member list” object. Reflection gives a queryable value, so generating serde, enum-to-string, and member walks no longer needs macros to write the declaration twice. The cost is another compile-time programming model; diagnostics and compile times are still evolving.

**Do not write this exaggeration into this page:** “C++26 has shipped so all three compilers can `^^`.” Technical work ending in 2026-03 ≠ the ISO catalog already has a general implementation you can link. Before using it, look at the compiler version and whether `-freflection` is actually in your toolchain.

---

## 15. One comparison table with Rust / Go (C++ view)

**Plain:** This table is only an index. Examples for each cell are in the matching section above. It does not open a new topic here.

**Picture:** A review comparison table.


| Topic | C++ | Rust | Go |
|---|---|---|---|
| Compile-time branching | overloads + requires + if constexpr | trait solving | constraints; fail and stop |
| Static polymorphism | CRTP / deducing this / templates | trait default methods | generic functions (no CRTP) |
| Type erasure | any / function / vtable / draft polymorphic | dyn / enum | interface |
| Async straight-line code | stackless coroutines, no scheduler | async/Future/Pin | goroutine |
| Reflection | draft compile-time | macros | runtime reflect |
| Value categories | yes | no (move/reborrow) | no |

---

## 16. Not expanded here (deferred)

**Plain:** Executor frameworks, contracts, and proofs of memory order are not expanded on this page.

**Picture:** Stop the pen here, so a new lesson is not added.


- Algorithms and scheduler customization of `std::execution` / senders-receivers.
- Semantics of C++26 contracts (observe / enforce / quick-enforce) — also still in draft, and not the same thing as reflection.
- Sequenced memory-model details (`memory_order`) and correctness proofs of lock-free structures.
- Itanium ABI name mangling and vtable-layout details.
- The full inventory of standard-library concepts (that is a reference manual, not this page).

Back to the index: [README](README.md). Pattern comparison: [10-expert-patterns-cross.md](10-expert-patterns-cross.md).
