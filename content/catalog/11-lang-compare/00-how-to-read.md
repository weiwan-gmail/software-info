# 00. How to read this comparison

For people opening this directory for the first time, including middle-school students and programming-club members. Chinese is the source; this is the English translation. Do not invent prices.

**Plain:** This is not a shopping list. Go, Rust, and C++ can all write programs. The main differences are “where the data lives, how failure is handed up, and how several jobs run at once.”

**Picture:** Three workbooks, same set of problems. Look at the sample problems first. Do not start from the hard questions at the back.

---

## Suggested path

1. Finish this page, then skim the **same / different** table in [README](README.md) (one page is enough).
2. Open [01-syntax.md](01-syntax.md). In each section, read **Plain** and **Picture** first, then the code. Code is marked illustrative: the shape is right; it is not a guarantee that copy-paste will compile on your machine.
3. After the syntax is readable, jump to [10-expert-patterns-cross.md](10-expert-patterns-cross.md). That page is the same sentence written three ways, left to right. If a term is unfamiliar, look at the example first. The traps sit after the examples.
4. If 10 is too dense, read [04-design-patterns.md](04-design-patterns.md) first (the intro version of the same intents), then come back to 10.
5. Open a deep-tools page only when you are curious about **one** language:
   - C++ templates, value categories, coroutines, draft reflection → [07-expert-cpp.md](07-expert-cpp.md)
   - Rust macros, Pin, unsafe → [08-expert-rust.md](08-expert-rust.md)
   - Go reflection, interface nil, odd sugar → [09-expert-go.md](09-expert-go.md)
   You do not have to finish these three in order, and you do not have to read them on day one.
6. Treat [02-package-tooling.md](02-package-tooling.md), [03-libraries.md](03-libraries.md), [05-gui-binding.md](05-gui-binding.md), and [06-advanced-cross.md](06-advanced-cross.md) as dictionaries: look them up when you are building a project. Do not read them cover to cover on day one.

---

## What each section looks like

- **Plain:** one sentence: what this section is.
- **Picture:** a school or everyday analogue. Skip it if you are not sure.
- **Code:** Go / Rust / C++ blocks are marked illustrative when they sit side by side. If a language has no same kind of thing, write N/A; do not force a translation.
- **Same / different:** only in comparison sections, after Plain.
- Terms (ownership, trait, RAII, SFINAE…) appear only after Plain. Status, standard versions, and checked dates also stay later. The teaching rewrite did not delete those sentences.

---

## Do not drill into these yet

- The “is this draft already shipping?” table at the start of 07 is for later checking, not lesson one.
- Places marked “deferred / not expanded” stopped on purpose. They are not omissions. Do not add new topics onto those lists.

Back to the index: [README](README.md).
