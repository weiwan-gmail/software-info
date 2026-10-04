# 09. Expert layer: Go (reflection, unsafe, interfaces, iterators, sugar)

> Teaching layer (2026-10-04 PT): read **Plain** and **Picture** first in each section; terms come after. First-read path: [00-how-to-read.md](00-how-to-read.md). Code blocks are all illustrative.


Checked: 2026-10-04 PT. Expert layer; does not change 01–06. Sample code is **illustrative**; it was not `go test`’d.

Go expert topics are often not “more syntax” but rules that are **very short in the spec and expensive to step on**. Cross-language expansion: [10-expert-patterns-cross.md](10-expert-patterns-cross.md).

### Status (2026-10-04)

| Claim | Status | Basis |
|---|---|---|
| `clear` | built-in in Go 1.21 | Go 1.21 release notes |
| Loop variables per iteration | Go 1.22 language change (`:=` and range in `for`) | Go 1.22 release notes |
| range-over-func | **stable in Go 1.23**. `iter.Seq` / `Seq2` | Go 1.23 release notes; `go.dev/blog/range-functions` |
| Generic type aliases | from Go 1.24 aliases may take type parameters; 1.23 needs `GOEXPERIMENT=aliastypeparams` and export is incomplete | Go 1.24 release notes |
| `//go:linkname` | from Go 1.23 the linker checks by default: pulling an unexported standard-library symbol requires the other side also to mark linkname (handshake). `-ldflags=-checklinkname=0` can turn it off; only for experiments | Go 1.23 release notes; issue #67401 |
| `plugin` | still only some Unix, same toolchain; not a portable plugin ABI | `plugin` package docs |
| Methods with their own type parameters | spec still forbids this (functions can, methods cannot) | language spec. If a later version updates, the spec wins |

---

## 1. `reflect`: Kind, Value, settable

**Plain:** Reflection is a program asking at runtime “what type are you, what are the fields called,” and sometimes changing a field.

**Picture:** Without looking at the cover, open the pencil case and count the slots. You cannot put things into a slot you have not opened.


> **Same:** ask types and change values at runtime. The C++ isomorphic construct in the C++26 draft is **compile-time** reflection, not this package (see [07](07-expert-cpp.md)). Rust has no isomorphic runtime reflection (N/A); use interfaces (trait objects) or codegen.  
> **Different:** Go reflection is limited by “unexported fields” and “addressable,” and an interface’s dynamic type can lose precision round-tripping through `Interface()`.

Rob Pike’s three laws (The Laws of Reflection; still this package’s mental model):

1. `Value` comes from `interface{}` (the argument to `TypeOf`/`ValueOf` is `any`).
2. `Value` goes back to `interface{}` (`Interface()`).
3. To change a value, the `Value` must be **settable**: it represents an addressable, exported location.

```go
// illustrative
import "reflect"

type Pt struct {
    X int
    y int // unexported: other packages cannot see it via reflection, cannot Set
}

func setX(p any) {
    v := reflect.ValueOf(p)
    // If p is a Pt value, ValueOf(p) is not settable; you must pass *Pt then Elem()
    if v.Kind() == reflect.Pointer {
        v = v.Elem()
    }
    if v.Kind() == reflect.Struct && v.CanSet() {
        f := v.FieldByName("X")
        if f.CanSet() {
            f.SetInt(1)
        }
    }
}
```

```rust
// Rust — N/A: no reflect::Value. Runtime dispatch is enum or dyn.
```

```cpp
// C++ — runtime RTTI is only typeid/dynamic_cast; you cannot change arbitrary fields.
// Compile-time draft reflection is in 07; it is not the same cell of this table.
```

**Trap:**

- Common reasons `CanSet` is false: you passed a value not a pointer; the field is unexported; the `reflect.Value` is a map element (map elements are not addressable); an indirect value that came from an unexported field.
- `Kind` is the underlying kind (`int`, `struct`, `interface`); `Type` has the name and package path. A named type and its underlying type are different.
- A nil pointer inside an empty interface: asserting after `Interface()` sees a typed nil; see section 4.
- `Value.Interface()` panics on unexported or non-interfaceable values. Check `CanInterface` first.
- Calling methods via reflection (`MethodByName` + `Call`) loses compile-time checks and is slower. Use a little reflection at library boundaries; not on the hot path.

---

## 2. `unsafe.Pointer` rules

**Plain:** unsafe.Pointer lets you temporarily drop the type and look at the same memory. Only the patterns in the docs are legal, not “it ran, so it is right.”

**Picture:** Taking a name tag off for another reading is allowed. You cannot keep the number on the slip as another desk’s address until tomorrow.


> **Same:** all can leave the type system and look at bytes.  
> **Different:** Go writes the legal conversions as **a limited set of patterns** in the `unsafe` package docs. A conversion not in those patterns is wrong even if “it runs today.” C++ pointer conversions are much wider; getting them wrong is UB. Rust also has provenance; see [08](08-expert-rust.md).

The patterns in the docs, compressed (the current `unsafe` package docs win; do not add an eighth from memory):

1. `*T1` → `unsafe.Pointer` → `*T2`, if `T2` is not larger than `T1` and alignment is legal.
2. `unsafe.Pointer` → `uintptr` **is not stored**; do arithmetic and convert back in the same expression (pointing inside the same object).
3. Do not split a pointer/`uintptr` round-trip across two statements: GC can move the object in between, and a stored `uintptr` is not updated.
4. When a syscall needs `uintptr`, use the dedicated conversion; still do not keep that integer as a pointer after the call.
5. `uintptr` from `reflect.Value` address-related methods must be converted back to `unsafe.Pointer` immediately.
6. `reflect.SliceHeader` / `StringHeader` are deprecated. Use `unsafe.Slice`, `unsafe.String`, `unsafe.StringData` (the 1.17 / 1.20 batch) for slice and string headers.

```go
// illustrative — shape of pattern 2: arithmetic must stay in the same expression
func idx(p *int, i int) *int {
    return (*int)(unsafe.Add(unsafe.Pointer(p), i*int(unsafe.Sizeof(*p))))
}
```

```rust
// Rust — pointer arithmetic on the same allocation uses add/with_addr; do not go around through usize.
```

```cpp
// C++ — p + i is built into the language; there is no “uintptr is ignored by GC” rule, because there is no moving GC.
```

**Relation to GC:** a Go pointer must point at an allocated object or nil. Disguising an integer as a pointer in a pointer slot, GC treats it as an edge. `unsafe` cannot be used to “implement your own heap that GC does not see.”

---

## 3. Escape analysis

**Plain:** The compiler decides whether a local variable will still be used outside the function. If yes, it goes on the heap so garbage collection can collect it later.

**Picture:** Scratch paper that must be handed in cannot stay only on a desk that will be cleared.


> **Same:** all want short-lived objects on the stack.  
> **Different:** Go’s choice is **the compiler’s**, not a language guarantee. Rust proves it with lifetimes. C++: you decide storage duration; getting it wrong is dangling (there is no course called escape analysis, N/A for “the compiler moves it to the heap for you” — there are optimizations, but the semantics are what you wrote).

```go
// illustrative
func leak() *int {
    x := 1
    return &x // x escapes to the heap
}
func stay() int {
    x := 1
    return x // generally stays on the stack
}
// go build -gcflags="-m" to see "escapes to heap"
```

```rust
// Rust — returning a reference needs a lifetime source; the compiler will not quietly move it to the heap.
// fn leak() -> &'static i32 { let x = 1; &x } // compile failure
```

```cpp
// C++ — return &x; if x is a local, it dangles; it is not “automatically moved to the heap.”
```

**Common reasons an object is forced onto the heap:** returning a pointer or an interface that references it; storing a pointer into an interface, slice, or map; a closure capturing then escaping the function; `fmt` arguments are `any`, so arguments often escape. `new` does not mean heap; `make` does not mean stack.

**Opinion:** do not rewrite into obscure code for escape analysis unless `-m` and a benchmark prove it is a hotspot. Escape logs change; they are not ABI.

---

## 4. The interface nil trap

**Plain:** Whether a Go interface is empty depends on both “is there a type inside” and “is the value empty.” Only when both are empty does the interface equal nil.

**Picture:** An envelope: an empty envelope really has no letter. An envelope with a recipient written on it but blank paper inside is not “there is no letter.”


> **Same:** all have “empty.”  
> **Different:** a Go interface is **two words (type, value)**. When the type is non-empty and the value is a nil pointer, the interface itself `!= nil`. Rust `Option` does not fuse “typed empty” and “no value” into one `nil`. C++ empty `unique_ptr` or empty `function` each compare on their own; they do not have this one pit.

```go
// illustrative
type P *int
func f() *int { return nil }
func g() error {
    var p P = nil
    return p // dynamic type is P, dynamic value is nil; caller’s err != nil is true
}
func h() error { return f() } // is this returning an untyped nil interface?
// Actual: f() has type *int; returning into an error interface boxes it. *int(nil) inside error is != nil.
// Only a bare `return nil` is a true nil interface.
```

```rust
// Rust — Option and Result are separate. None is not “an empty pointer inside Some” unless you write that.
fn g() -> Option<*mut i32> { None }
```

```cpp
// C++ — N/A: no two-word interface. A null pointer is a null pointer.
int* p = nullptr;
```

**How to tell:** functions that return `error` should `return nil` or `return errors.New(...)` on the failure path, not `return (*MyErr)(nil)`. If the receiver must look at the pointer inside the interface, type-assert then compare with nil.

---

## 5. Embedding is not inheritance

**Plain:** Putting another struct in as a field “promotes” its methods, but this is not object-oriented inheritance you can override.

**Picture:** Slip a booklet into a bigger notebook. The table of contents can show the booklet’s chapters, but “see this chapter” inside the booklet still points at the booklet itself.


> **Same:** all want to reuse a chunk of implementation.  
> **Different:** Go embedding is **a field + method promotion**. There is no subtype polymorphism: an outer method does not virtually replace a call already bound on the inner type. C++ public inheritance can be polymorphic. Rust has no inheritance (N/A); use composition + traits.

```go
// illustrative
type Inner struct{}
func (Inner) Name() string { return "inner" }
func (Inner) Hi() string   { return "hi " + /* what is bound is Inner.Name */ "x" }

type Outer struct{ Inner }
func (Outer) Name() string { return "outer" }
// o.Name() is outer. But if Inner’s own method body calls Name, it still sees Inner;
// there is no “virtual dispatch” to Outer.Name. Promotion ≠ override.
```

```cpp
// C++ — only virtual functions override
struct Inner { virtual const char* name() const { return "inner"; } };
struct Outer : Inner { const char* name() const override { return "outer"; } };
```

```rust
// Rust — N/A: no embedding. Composition + trait default methods; see 10’s CRTP comparison.
```

**Name clashes:** when two embedded types have the same method, the outer call must write the field name; promotion becomes ambiguous. When an embedded pointer (`*Inner`) is nil, a promoted value-receiver method panics.

---

## 6. Type sets, `comparable`, generic gaps

**Plain:** A Go constraint is a set of allowed types. It deliberately has no specialization, no associated types, and no extra type parameters on methods.

**Picture:** The club only admits “types that can do integer arithmetic.” It does not let you rewrite the club charter for one particular integer.


> **Same:** all have generic constraints.  
> **Different:** Go constraints are **type sets** (interfaces). There is no C++-concept subsumption overloading, no Rust associated types and specialization.

```go
// illustrative
type Number interface{ ~int | ~int64 } // ~ means underlying type
func Add[T Number](a, b T) T { return a + b }

// comparable: types that can use ==. When an interface is a type argument, the dynamic type must also be comparable, or it panics at runtime.
func Keys[M ~map[K]V, K comparable, V any](m M) []K {
    out := make([]K, 0, len(m))
    for k := range m { out = append(out, k) }
    return out
}
```

```rust
// Rust — associated types + where. Specialization is unstable.
trait Add { type Out; fn add(self, other: Self) -> Self::Out; }
```

```cpp
// C++ — concept subsumption; failure can pick another overload (SFINAE/constraints).
template <class T> requires std::integral<T>
T Add(T a, T b) { return a + b; }
```

**What Go deliberately does not have, compared with Rust/C++ (as of 1.24 docs, not “an unfinished bug”):**

| Capability | Go | Rust | C++ |
|---|---|---|---|
| Methods with their own type parameters | no | yes | member templates |
| Associated types | no | yes (including GAT) | member typedef / alias templates |
| Specialization | no | unstable | partial specialization is everyday |
| Const generics | no | limited stable | NTTP |
| Type packs / fold | no | simulated with macros | yes |
| Algebraic data types + exhaustiveness | no (simulate with interfaces) | enum | `variant` + visit |
| HKT | no | no (GAT is a piece) | template template parameters count as one kind |

If it cannot infer, write the type arguments by hand. A failed constraint is a hard error; it will not SFINAE to the next function — Go also has no overloading.

---

## 7. `go:generate`, cgo cost

**Plain:** go generate is a separate step you run, so another program can write Go files. cgo can call C, but every call crosses a bridge.

**Picture:** The print shop does not automatically print the extra sheet when you hand in the paper. You have to go there first. Asking another class for help also means a trip down the corridor.


> **Same:** all can run external tools at build time; all can call C.  
> **Different:** `go generate` does **not** run automatically inside `go build`; you run it separately. cgo is not zero-cost FFI.

```go
//go:generate stringer -type=Kind
// illustrative: the line above is a directive for go generate, not a compiler directive.
```

```rust
// Rust — build.rs runs automatically on cargo build. Proc-macros run during compilation.
```

```cpp
// C++ — no standard generate directive. The build system has custom commands.
```

**cgo cost (practical, not benchmark numbers):**

- Calls cross the Go stack and the C stack; they cannot inline like ordinary functions.
- Callbacks into Go must `//export`, and there are thread and signal limits (docs: do not create threads in C and then callback casually unless you have read the `cgo` rules).
- `CGO_ENABLED=0` is what you need for fully static, easy cross-compile; once cgo is on, cross-compile becomes “you need the target platform’s C toolchain.”
- A pointer passed into C must be considered live by Go for that duration (`runtime.KeepAlive`, or the explicit cgo pointer-passing rules). Long-term storage of a Go pointer in C is forbidden.

**Opinion:** if you can use pure Go or a separate process (stdin/stdout, a local socket), do not take cgo for two functions.

---

## 8. Atomics, race detection, `context`, `GOMAXPROCS`

**Plain:** An atomic operation is add-or-subtract that cannot be torn in half. context announces “you may stop.” GOMAXPROCS is the cap on how many Go workers really run on the CPU at once.

**Picture:** A relay baton is in only one person’s hand at a time. The teacher’s whistle stops everyone. The track has a limited number of lanes that can start at once.


> **Same:** all have atomics, cancellation, thread counts.  
> **Different:** Go puts cancellation in an explicit `context.Context` parameter; a data race is **not** a type error.

```go
// illustrative
import (
    "context"
    "sync/atomic"
)

var n atomic.Int64 // typed atomics from Go 1.19; prefer over atomic.AddInt64

func worker(ctx context.Context) error {
    select {
    case <-ctx.Done():
        return ctx.Err() // Canceled or DeadlineExceeded
    default:
        n.Add(1)
        return nil
    }
}
```

```rust
// Rust — AtomicI64; cancellation is often drop future, not a Context parameter.
```

```cpp
// C++ — std::atomic; cancellation commonly uses stop_token.
```

**`-race`:** the compiler instruments; the runtime reports data races that happened. No report ≠ none. It is not a proof. Overhead is large; put it in tests and pre-prod. Do not make it the production default and then assume zero false positives and zero misses.

**`context`:** official use is cancellation, deadlines, and a few request-scoped values. Do not treat it as a bag of optional parameters (the official blog has long opposed “passing business config through context”). Functions from `WithCancel` should `defer cancel()`, or derived goroutines and timers live until the parent ends. Keys for `context.Value` should be a private type, to avoid collisions.

**`GOMAXPROCS`:** since Go 1.5 the default is `runtime.NumCPU`. In a container “CPU count” and “quota” are often not the same thing; the process may over-parallelize. The community has cgroup-based adjustment; whether the runtime automatically respects quota in your minor version follows that version’s release notes. This page does not freeze some automatic behavior.

---

## 9. Plugins, `linkname`, assembly stubs

**Plain:** plugin wants to load another Go compile result at runtime, with many limits. linkname and hand-written assembly reach into language internals. They are not ordinary extension methods.

**Picture:** You wanted a hot-swappable socket. The socket only accepts plugs from the same production line, made on the same day.


> **Same:** all can dynamically load or hand-write assembly.  
> **Different:** Go `plugin` is almost unusable as a product extension ABI. `linkname` is an escape hatch inside the standard library. Assembly follows Go’s calling convention, not a free C ABI.

### `plugin`

Limits from the package docs (summary): Linux, macOS, FreeBSD; host and plugin must use **the same version** of the toolchain, compatible compile options and deps; Windows is not supported; types in the main program and the plugin do not share identity even if they “look the same,” unless they come from the same package. Failure modes are often a crash at startup, not a clean `error`.

**Opinion:** for an extension point, use an in-process registry, or a subprocess / RPC / Wasm. See [10](10-expert-patterns-cross.md).

### `//go:linkname`

You can bind a local symbol to a symbol in another package, and thereby touch unexported runtime functions. From Go 1.23, **new** “pull without handshake” standard-library linknames are rejected by the linker by default. This is official tightening, not an invitation.

```go
// illustrative — do not copy this into application code
// import _ "unsafe"
// //go:linkname foo runtime.something
// func foo()
```

A flag that turns the check off will become a maintenance accident on the next toolchain upgrade.

### Assembly stubs (shape, not a tutorial)

Go assembly is the Plan 9 set, not GAS. Function frames must follow the current ABI: from Go 1.17 internal calls use the register ABI (`ABIInternal`); C still has `ABI0`. A skeleton like `TEXT ·Add(SB),NOSPLIT,$0` is only written after you have read the current version of the Go assembly docs. Whether arguments are on the stack or in registers **changes with the ABI**. Getting it wrong is not a link error; it is a wrong result.

```cpp
// C++ — inline assembly or a .S file; the calling convention is the C ABI, not Go ABIInternal.
```

```rust
// Rust — the asm! macro; calling convention follows extern "C" / the platform ABI, not Go’s.
```

---

## 10. Iterators (Go 1.23+), `clear`, aliases

**Plain:** From Go 1.23 you can pair `for range` with a function that keeps handing over the next element. clear zeros a container but does not change a slice’s length. An alias and a defined new type are not the same thing.

**Picture:** At roll call someone keeps saying “next” until you say stop. Erasing the blackboard wipes the writing; the board’s size stays. A nickname and a legal rename are also different.


> **Same:** all can walk a user-defined sequence.  
> **Different:** a Go iterator is a function that pulls a yield callback; it is not Rust’s `Iterator` trait, and not C++ iterator pairs.

```go
// illustrative — go 1.23, module language version at least 1.23
func count(n int) func(yield func(int) bool) {
    return func(yield func(int) bool) {
        for i := 0; i < n; i++ {
            if !yield(i) { // false = caller break / return
                return
            }
        }
    }
}
// for i := range count(3) { _ = i }
// Standard shape: iter.Seq[V], iter.Seq2[K, V]
```

```rust
// Rust — Iterator::next. Lazy, adaptable. No language convention of a yield callback (async gen is another story).
```

```cpp
// C++ — iterator pairs or ranges. A coroutine generator is not the only approach in the standard.
```

**Expert notes:**

- The language only accepts a specific function shape: `func(func(...) bool)`, 0–2 parameters. Not an arbitrary callback.
- `yield` must be called synchronously on **the same goroutine**. Sending yield to another goroutine and calling it there breaks the semantics (the compiler rewrites the loop as synchronous).
- `break`, `return`, `panic` end the iterator function through yield’s return value or a runtime mechanism. Using `panic`/`recover` as control flow inside the iterator function is a known hard area; read the range-over-func blog before writing a library.
- `iter.Pull` turns push into pull; remember the `stop` function or you leak.

**`clear` (1.21):** for a map, delete all keys; for a slice, set elements to the zero value, **do not change length**; on a nil map/slice it is a no-op. It is not `s = s[:0]` (that changes length and keeps capacity), and not a fresh `make`.

**Alias vs defined type:**

```go
type Celsius float64       // new type; method set is its own
type Temp = float64        // alias; exactly the same type as float64
// Go 1.24: type Set[T comparable] = map[T]struct{}
```

An alias cannot have methods of its own (methods hang on the underlying named type). A defined type does not inherit the underlying type’s methods. Using an alias as a refactoring transition has been a use since 1.9; generic aliases were only completed in 1.24.


`clear` and “an alias is not a new type” get a readable mini-example (illustrative). The iterator example is earlier in this section.

```go
// Go — illustrative
s := []int{1, 2}
clear(s) // elements become 0, 0; len is still 2

type Celsius float64 // new type
type Temp = float64  // alias; the same type as float64
```

```rust
// Rust — illustrative. Clearing a Vec changes length; this is not Go’s clear
let mut s = vec![1, 2];
s.clear(); // len becomes 0
```

```cpp
// C++ — illustrative. There is no one thing with the same name as Go clear
std::vector<int> s{1, 2};
s.clear(); // size becomes 0
```
---

## 11. Odd sugar

**Plain:** Go has little shorthand, but `:=`, defer, and append are the ones that most often make people think they changed the outer variable.

**Picture:** Two pens with the same name. You changed the one you just took from the pencil case. The one on the desk did not move.


> **Same:** all have shorthand that beginners step on.  
> **Different:** Go has little sugar, but every piece is common.

### `:=` and shadowing

`:=` requires **at least one** variable to be new; the rest may already exist in the same scope. `err` is therefore often redeclared in an `if`, and the outer one stays nil forever.

```go
// illustrative
var err error
if debug {
    f, err := os.Open("x") // a new err, shadows the outer
    _ = f
    _ = err
}
// outer err is still nil
```

### `defer` arguments evaluate immediately

The function call is deferred; **the arguments are not**. `defer f.Close()` in a loop does not close at the end of each iteration; it waits until the function returns. `defer` in a loop can therefore pile file descriptors until function exit.

```go
func later() {
    i := 1
    defer fmt.Println(i) // prints 1, not i at the end of the function
    i = 2
}
```

### Loop variables before Go 1.22

From 1.22, `i` in `for i := range s` is a new variable each iteration; capturing it in a closure is much safer. In 1.21 and earlier, closures and go statements captured the same variable. When maintaining an old module (the `go` line still says 1.21), this still applies.

### Other

| Sugar | Behavior |
|---|---|
| naked return | returns the current values of named result parameters. Readability is poor in long functions, and it stacks with `:=` shadowing |
| `append` | reuses the backing array if capacity is enough; otherwise allocates new. Other slices may see your writes |
| `select` | when several cases are ready, picks **pseudo-randomly**, not source order |
| `switch` | does not fall through by default; `fallthrough` does not re-evaluate the next case’s condition |
| `iota` | each `const` block starts at 0 and increments; repeating the expression is implicit |
| `new` vs `make` | `new(T)` returns a zero `*T`; slices/maps/channels use `make` |
| receivers | value receivers copy; pointer receivers can mutate. A method value binds the receiver |

Two more from the table (illustrative). `append` / `iota` / `new` examples are later in this section.

```go
// naked return — illustrative. Returns the current values of the named results
func parse(ok bool) (n int, err error) {
    if !ok { err = io.ErrUnexpectedEOF; return }
    n = 1
    return
}

// select — illustrative. When both cases are ready, which one runs is not source order
select {
case <-a:
case <-b:
}
```

```rust
// Rust — shadowing exists too (let err = ...), but there is no := “at least one new.”
// Drop runs at end of scope, not defer’s “arguments evaluate immediately” set.
```

```cpp
// C++ — no defer. RAII destructors run at end of scope; arguments of course evaluate at the call.
```


Two more common pieces of sugar from the table (illustrative). The `:=` and defer examples are earlier in this section.

```go
// Go — illustrative
s := []int{1}
s2 := s
s2 = append(s2, 2) // if capacity is enough, s may see the same array; if not, a new one

const (
    A = iota // 0
    B        // 1
)
p := new(int)      // *int, pointing at 0
m := make(map[string]int)
```

```rust
// Rust — illustrative. let can shadow, but there is no := that requires “at least one new name”
let err = 1;
let err = 2; // a new err; the old one is covered
```

```cpp
// C++ — N/A: no iota, no :=. Write numeric enum constants yourself
enum { A = 0, B = 1 };
```
---

## 12. Comparison (Go view)

**Plain:** An index table. Examples are in the earlier sections.

**Picture:** A review.


| Topic | Go | Rust | C++ |
|---|---|---|---|
| Runtime types | `reflect` | no isomorphic | RTTI is narrow; the draft is compile-time |
| Raw pointers | a few legal patterns | unsafe + provenance | default capability of the language |
| Empty interface / null pointer | two-word nil trap | `Option` | null pointer / empty smart pointer |
| Reusing implementation | embedding, no virtual override | composition + trait | inheritance + virtual |
| Iterating generic containers | 1.23 function iterators | `Iterator` | ranges / iterator pairs |
| Plugins | `plugin` is very brittle | C ABI / Wasm | `dlopen` / stable C ABI |

---

## 13. Not expanded (deferred)

**Plain:** The full memory model, GC tuning, and experimental arenas are not expanded on this page.

**Picture:** Stop here.


- Line-by-line happens-before of the memory model (that page of the `sync` package docs is the body; this page does not copy it).
- GC tuning (`GOGC`, `GOMEMLIMIT`) and latency distributions.
- Fate of the experimental `arena` package (it has always been experimental; do not put it in a library API).
- Linker internals, build cache, PGO operational steps.
- Wasm / WASI portability differences.

Back to the index: [README](README.md).
