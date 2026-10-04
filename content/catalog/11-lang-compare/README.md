# 11. Language / stack comparison: Go · Rust · C++

Checked: 2026-10-03 PT. This is a **language / ecosystem comparison**, not a product shopping table. Do not invent prices. Library names and package-manager facts follow public docs/repos as closely as possible (illustrative code was not compiled line by line here).

Use it to pick a language, estimate GUI-adapter cost, and compare “same intent, different spelling.” Wei’s settings-core + thin GUI adapter notes are in [05-gui-binding.md](05-gui-binding.md) and [ui-settings-binding-stacks.md](../../ui-settings-binding-stacks.md).

Related experiment (not this directory; a separate private repo, not part of this site): [qt-reactive-compare](https://github.com/weiwan-gmail/qt-reactive-compare) (reaction / Aria / sigslot ↔ Qt Widgets/QML).

---

## How to read this

**Plain:** Get the intuition in plain language first, then look at the side-by-side examples. Leave deep-water templates, Pin, and reflection until you actually hit them.

**Picture:** Read the table of contents and the sample problems first. Do not start from the proof problems in the appendix.

If this is your first visit, start with [00-how-to-read.md](00-how-to-read.md). The short path is **Plain and Picture in 01 → the side-by-side examples in 10 → 07 / 08 / 09 only when you are curious about one language’s deep tools**. Treat 02, 03, 05, and 06 as dictionaries.

1. Skim the **same / different** table on this page first.
2. Each section starts with **Plain** (what this is) and **Picture**, then the terms. When comparing, look at **same / different**. Code blocks are tagged `Go` / `Rust` / `C++`. All of them are illustrative (shape is right; they are not guaranteed to have been run on this machine).
3. Named libraries get an official repo or docs entry. Status changes; treat upstream as source of truth. Dates and “draft vs present” still sit after the Plain lead. The teaching rewrite does not delete those sentences.
4. To drill into mechanisms (templates, macros, reflection, unsafe), go to 07–09. Do not open new topics inside 01–10 just to make them easier.

---

## Same / different (high level)

**Plain:** One table to keep: all three are compiled and strongly typed. The default spelling of memory, errors, and concurrency differs the most.

**Picture:** Three menus all have a main dish. The soup is served differently.

| Dimension | Roughly the same | Clearly different |
|---|---|---|
| Static types, compile-time checks | All three are strongly typed and compiled | Go has no lifetimes; Rust has ownership; C++ is manual / RAII |
| Concurrency primitives | All can multithread | Go: goroutine+channel; Rust: `async`/`await`+`Send`/`Sync`; C++: `std::thread`/`jthread`+library-level async |
| Error model | All can handle failure explicitly | Go: `error` multiple return values; Rust: `Result`/`?`; C++: exceptions / `expected` / error codes coexist |
| Package management | All have a lock-the-deps idea | Go modules / Cargo are integrated; C++ is CMake + Conan/vcpkg/xmake and similar, a mix |
| Metaprogramming | All have some form of “generate” | Go: `go generate`/weak reflection; Rust: macros+proc-macro; C++: templates+macros+concepts |
| GUI | All can do desktop | C++ Qt is the most mature; Go Fyne/Wails/Gio; Rust Slint/egui/iced/Tauri; binding paradigms differ a lot |
| Settings core ↔ UI | “Core owns dependencies; UI is a thin adapter” holds in all three | Adapter API shape differs (binding / Property / channel / FFI) |

---

## Subfile index

**Plain:** 01 through 10 are the fixed topics. This teaching rewrite does not add topics.

**Picture:** The textbook is still the original ten chapters. Each chapter just got a lead-in.

| # | File | Contents |
|---|---|---|
| 1 | [01-syntax.md](01-syntax.md) | Types, ownership/GC, concurrency, generics, errors, macros, interface/trait; small side-by-side examples |
| 2 | [02-package-tooling.md](02-package-tooling.md) | modules / cargo / CMake·Conan·vcpkg·xmake; tests and docs; workspace, features, build tags, FFI packaging |
| 3 | [03-libraries.md](03-libraries.md) | Standard-library highlights + common advanced libraries (JSON, HTTP, async, collections, reflection/codegen, logging) |
| 4 | [04-design-patterns.md](04-design-patterns.md) | Idiomatic patterns (not a GoF dump): RAII/defer/Drop, visitor/enum match, DI/options, actor/channel, CRTP/traits, plugins |
| 5 | [05-gui-binding.md](05-gui-binding.md) | Per-language GUI stacks + binding paradigms; Qt / Fyne / Wails / Slint / egui / iced / Tauri; vs Wei’s adapter idea |
| 6 | [06-advanced-cross.md](06-advanced-cross.md) | FFI, embedding, when to pick which |

01–10 are still the original topic structure (no new eleventh technical topic). The reading path [00-how-to-read.md](00-how-to-read.md) only teaches how to read; it does not add a topic. The expert layer starts at 07 in a separate table.

---

## Expert-layer index (07+)

**Plain:** 07, 08, and 09 each cover tools in one language that are easy to get hurt by. 10 writes the same sentence in three shapes, side by side.

**Picture:** The programming club’s advanced class. Not required on day one.

Deep dive: reflection / macros / templates and TMP, type erasure, CRTP, concepts, coroutines, and the same-magnitude topics in Rust and Go. Each section has **same / different**, with side-by-side examples; if a language has no isomorphic construct, it is marked N/A. Sample code is illustrative. This is not a pretend-exhaustive awesome list. Unstable features carry a checked date in the page.

| # | File | Contents |
|---|---|---|
| 7 | [07-expert-cpp.md](07-expert-cpp.md) | Value categories, perfect forwarding, `<=>`, fold, SFINAE→concepts, CTAD/NTTP, the `constexpr` trio, CRTP/mixin/deducing this, EBO, ADL, expression templates, type erasure, coroutines, modules overview, P2996 reflection direction |
| 8 | [08-expert-rust.md](08-expert-rust.md) | `macro_rules` and proc-macros, HRTB, GAT, `Pin`, dyn compatibility, `PhantomData`, interior mutability, `Drop`/`ManuallyDrop`, async Drop, `Send`/`Sync`, niches, `!`, const generics, specialization, unsafe provenance, DST, reborrowing and `?` |
| 9 | [09-expert-go.md](09-expert-go.md) | `reflect`, `unsafe.Pointer`, escape analysis, interface nil, embedding ≠ inheritance, type sets and generic gaps, `go:generate`, cgo, atomics and race, `context`, `GOMAXPROCS`, plugin, `linkname`, assembly stubs, range-over-func, `clear`, aliases, odd sugar |
| 10 | [10-expert-patterns-cross.md](10-expert-patterns-cross.md) | Same intent, different shape: visitor/ADT, type erasure, DI/options, actor/channel, RAII↔defer↔Drop, plugin ABI, CRTP↔trait default methods↔generic functions |

---

## Deliberately omitted / deferred

**Plain:** No prices, no copy-paste of internet awesome lists, and no expansion of kernels or shaders here.

**Picture:** The workbook does not come with a price list.

- No salaries, license price lists, or commercial-compiler price lists.
- No exhaustive walk of awesome-go / awesome-rust / awesome-cpp (see the [02-awesome-github](../02-awesome-github/README.md) queue).
- Bare-metal embedded, kernel modules, and GPU shader languages are not expanded.
- Official Go bindings for Slint are still experimental/WIP (public PR in 2026); the text flags that.

---

**Content freeze (baseline 01–06):** 2026-10-03 PT. Entries and structure of these six pages are not expanded. Corrections go through the English translation / PR flow.

**Content freeze (expert layer 07–10):** 2026-10-04 PT. 07–10 are the expert deep-dive layer; Chinese is the source. Do not expand these four. Status claims (reflection, specialization, iterators, never type) follow the dates in the pages; if they go stale, open a separate correction rather than rewriting the baseline.

**Teaching rewrite (teach-pass):** 2026-10-04 PT. The baseline structure is still 01–10. Chinese is the source. This pass only adds Plain and Picture leads on existing sections, and illustrative mini-examples where a section previously had a claim and no example. Do not invent prices. Do not open new topics. Status dates and technical conclusions stay, after the Plain lead.
