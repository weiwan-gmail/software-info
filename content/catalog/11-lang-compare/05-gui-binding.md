# 05. GUI stacks and data binding

> Teaching layer (2026-10-04 PT): read **Plain** and **Picture** first in each section; terms come after. First-read path: [00-how-to-read.md](00-how-to-read.md). Code blocks are all illustrative.

> **Same:** all can do desktop GUI; all can push “state changed” onto controls. Wei’s architecture goal is the same — **the settings core owns dependencies and rules; UI is a thin adapter**.  
> **Different:** binding paradigms differ a lot: signals/slots, reactive Property, immediate mode, Elm/MVU, WebView RPC, FFI bridges.

Sidecar (fuller cross-stack settings comparison): [ui-settings-binding-stacks.md](../../ui-settings-binding-stacks.md)  
C++ experiment in a separate private repo, not part of this site: [qt-reactive-compare](https://github.com/weiwan-gmail/qt-reactive-compare) (reaction / Aria / sigslot ↔ Widgets/QML)

Sample code is **illustrative**. Do not invent prices. Qt commercial-license form is on the Qt site; this page does not list prices.

---

## 0. Wei’s adapter model (nail this first)

**Plain:** The core owns the data and the rules. The UI is a thin adapter you can swap. The two sides talk only through a narrow “read / write / subscribe.”

**Picture:** There is one textbook. You can change the cover. Writing the exercises on the cover does not count as finishing.

```text
┌─────────────────────────────────────┐
│  Settings Core (language of choice) │
│  Schema · Store · Validate · Events │
│  Owns: file / registry / secrets / defaults │
└─────────────────┬───────────────────┘
                  │ narrow interface (get/set/subscribe)
     ┌────────────┼────────────┐
     ▼            ▼            ▼
 Fyne Adapter  Qt Adapter  Slint/egui/...
 (widget details) (widget details) (widget details)
```

| Principle | Meaning |
|---|---|
| Core does not import GUI | unit-testable, skin-swappable, can run headless |
| Adapter is disposable | swapping Fyne→Qt does not change Schema |
| Mostly one-way | UI events → Intent → Core; Core events → project onto controls |
| Property-panel thinking | like Blender/Unreal: controls are thin views of properties, not the business owner |


The narrow interface looks like this: the UI can only read, write, and listen for changes. It cannot open the config file itself (illustrative):

```go
// Go — illustrative
type Store interface {
    Get(key string) (string, error)
    Set(key, val string) error
}
```

```rust
// Rust — illustrative
trait Store {
    fn get(&self, key: &str) -> Option<String>;
    fn set(&mut self, key: &str, val: &str);
}
```

```cpp
// C++ — illustrative
struct Store {
  virtual ~Store() = default;
  virtual std::string get(std::string_view key) = 0;
  virtual void set(std::string_view key, std::string val) = 0;
};
```
---

## 1. Per-language GUI stack cheat sheet

**Plain:** A GUI stack is “the set of libraries used to draw windows.” Below lists only common ones and how they attach data to controls.

**Picture:** Different brands of stationery can all write. Caps, ink, and grip differ.

### Go

| Stack | Form | Binding | Public entry |
|---|---|---|---|
| **Fyne** | self-drawn cross-platform (desktop+mobile) | `data/binding`, Preferences binding | [fyne-io/fyne](https://github.com/fyne-io/fyne) · [docs.fyne.io](https://docs.fyne.io) |
| **Wails** | Go backend + WebView frontend | methods bound to JS; Events Emit | [wailsapp/wails](https://github.com/wailsapp/wails) |
| **Gio** | immediate mode | read state every frame | [gioui.org](https://gioui.org) |
| Qt bindings | cgo → Qt (therecipe/qt and similar) | follow Qt signals/slots; **maintenance cost is high** | community bindings; check upstream activity before choosing |
| Walk / andlabs/ui | Windows or thin native | callbacks | narrow platforms |

### Rust

| Stack | Form | Binding | Public entry |
|---|---|---|---|
| **Slint** | `.slint` declarative; Rust/C++/JS/Python | Property + callbacks; core/UI split is friendly | [slint-ui/slint](https://github.com/slint-ui/slint) |
| **egui / eframe** | immediate mode | `&mut` state every frame | [emilk/egui](https://github.com/emilk/egui) |
| **iced** | Elm/MVU | Message → update → view | [iced-rs/iced](https://github.com/iced-rs/iced) |
| **Tauri** | Rust backend + WebView | commands/events; similar to Wails | [tauri-apps/tauri](https://github.com/tauri-apps/tauri) |
| **Dioxus** | React-style RSX; multi-target | signals/state hooks | [DioxusLabs/dioxus](https://github.com/DioxusLabs/dioxus) |
| **gtk-rs** | GTK4 | GObject properties | [gtk-rs](https://gtk-rs.org) |
| **cxx-qt** | Rust ↔ Qt | QObject bridge | [KDAB/cxx-qt](https://github.com/KDAB/cxx-qt) |
| GPUI | highly custom desktop (young) | component-style | Zed-ecosystem related |

### C++

| Stack | Form | Binding | Public entry |
|---|---|---|---|
| **Qt Widgets** | classic controls | signals/slots; properties | Qt docs |
| **Qt QML / Quick** | declarative | property binding + `Q_PROPERTY` | Qt docs |
| **Slint** | same as Rust | CMake + C++ API | Slint C++ docs |
| **Dear ImGui** | immediate | every frame | [ocornut/imgui](https://github.com/ocornut/imgui) |
| **GTK** | native GNOME | GObject properties / GSettings | GTK docs |
| **wxWidgets / FLTK** | cross-platform | event tables | each project’s site |
| Unreal / Blender-style panels | inside the engine | Reflection + property drawers | learn “thin adapter”; do not embed the engine |

**Slint × Go:** official primary support is Rust/C++/JS/Python; Go has an experimental PR / third-party (e.g. community go-slint), **not a production default** — mark experimental at time of writing.


Section 2 has the full binding text for the libraries in the tables. Here is only the shared shape of “the UI sends one change back to the core” (illustrative):

```go
// Go + Fyne — illustrative
// port := binding.BindPreferenceInt("port", app.Preferences())
```

```rust
// Rust + Slint — illustrative
// ui.on_port_edited(|v| core.set_port(v));
```

```cpp
// C++ + Qt — illustrative
// QObject::connect(box, &QSpinBox::valueChanged, [&](int v){ core.setPort(v); });
```
---

## 2. Binding-paradigm comparison (same intent)

**Plain:** Binding means: the number in the spin box and the setting in the core stay the same. Change one side, the other must follow.

**Picture:** The date on the blackboard and the calendar are the same day. Change the board, change the book. Change the book, change the board. Do not change back and forth until you cannot stop.

Intent: `port: int` setting ↔ a numeric box; UI edits write back to the core; core changes refresh the UI.

### 2.1 Fyne (Go) — explicit data binding

```go
// Go + Fyne (sketch) — https://docs.fyne.io
prefs := app.Preferences()
port := binding.BindPreferenceInt("port", prefs)
entry := widget.NewEntryWithData(binding.IntToString(port))
// custom core: implement binding.Int or sync Store changes into binding.NewInt()
```

**Adapter point:** Fyne Preferences can be reskinned — the core implements the same interface, then `Bind…` onto controls.

### 2.2 Wails (Go) — RPC / events

```go
// Go: export to the frontend
func (a *App) GetPort() int { return a.core.Port() }
func (a *App) SetPort(p int) error { return a.core.SetPort(p) }
// core changes: runtime.EventsEmit(ctx, "port", p)
```

```js
// frontend sketch
await window.go.main.App.SetPort(8080)
```

**Adapter point:** HTML is the skin; **do not put validation in JS** — `SetPort` goes into the core.

### 2.3 Qt Widgets + signals/slots (C++)

```cpp
// C++ Qt (sketch)
QSpinBox* box = new QSpinBox;
QObject::connect(box, qOverload<int>(&QSpinBox::valueChanged),
  [&core](int v){ core.setPort(v); });
QObject::connect(&core, &Core::portChanged, box, &QSpinBox::setValue);
// watch for echo: setValue may fire valueChanged again → blockSignals or a guard bool
```

### 2.4 Qt QML + Q_PROPERTY

```cpp
// C++: expose to QML
class SettingsFacade : public QObject {
  Q_OBJECT
  Q_PROPERTY(int port READ port WRITE setPort NOTIFY portChanged)
public:
  int port() const { return core_.port(); }
  void setPort(int v) { if (core_.setPort(v)) emit portChanged(); }
signals:
  void portChanged();
private:
  Core core_;
};
```

```qml
// QML
SpinBox {
  value: facade.port
  onValueModified: facade.port = value
}
```

### 2.5 Reactive Property (C++ KDBindings / Aria / reaction)

```cpp
// KDBindings sketch — https://github.com/KDAB/KDBindings
KDBindings::Property<int> width{800};
KDBindings::Property<int> height{600};
auto bytes = KDBindings::makeBoundProperty(width * height);
width = 1920; // bytes updates automatically
```

```cpp
// Aria idea (qt-reactive-compare, separate private repo): Property / Computed / Effect
// + QtAdapter::bind_int / bind_text and similar two-way binds
```

| Library | Computation graph | Qt Widgets | QML |
|---|---|---|---|
| KDBindings | yes | hand-bridge or self-wired | hand-bridge |
| reaction | yes | hand-bridge (comparison repo) | hand-bridge |
| Aria | yes | **official adapter is better** | needs a hand-bridge (comparison-repo conclusion) |
| sigslot | **no** | hand-written assignment | hand-written |
| RxCpp | used to | **stalled; use with care** | use with care |

### 2.6 Slint (Rust / C++)

```slint
// app.slint sketch
export component App inherits Window {
  in-out property <int> port: 8080;
  callback port-edited(int);
  SpinBox {
    value: root.port;
    edited(v) => { root.port-edited(v); }
  }
}
```

```rust
// Rust: core lives in the callback
let ui = App::new()?;
ui.on_port_edited(|v| { core.set_port(v); });
// core → UI: ui.set_port(core.port());
```

**Adapter point:** `.slint` is like QML — **declarative skin**; business stays in Rust/C++. Highly isomorphic with Wei’s “thin adapter.”

### 2.7 egui (Rust) — immediate

```rust
// every frame
egui::Window::new("settings").show(ctx, |ui| {
    ui.add(egui::DragValue::new(&mut state.port));
});
// end of frame: if dirty, core.set_port(state.port)
```

**Adapter point:** there is no persistent binding object; **the state struct is the binding**. The core can sync between frames.

### 2.8 iced (Rust) — Elm

```rust
enum Message { PortChanged(i32) }
fn update(core: &mut Core, msg: Message) {
    match msg { Message::PortChanged(v) => { let _ = core.set_port(v); } }
}
fn view(core: &Core) -> Element<Message> {
    // spin → Message::PortChanged
}
```

### 2.9 Tauri / Dioxus (Rust web skin)

**Plain:** The window is a web page. The function that really changes settings still lives in Rust. The page only calls it.

**Picture:** The blackboard is a projection. Grades are still written in the office book.

- **Tauri:** like Wails — `invoke` + events; core in Rust.  
- **Dioxus:** component state; desktop/Web possible; do not let components persist directly.

```rust
// Tauri — illustrative. Commands go into the core; do not have the frontend write files itself
// #[tauri::command]
// fn set_port(p: i32) -> Result<(), String> { core_set(p) }
```

### 2.10 gtk-rs

```rust
// sketch: GObject property binding / connect_closure
spin.connect_value_changed(move |s| { core.set_port(s.value() as i32); });
```

---

## 3. “Property panel” comparison (Blender / Unreal style)

**Plain:** A property panel is a column of “name + control,” generated from a field description. It is not a separate business path inside each button.

**Picture:** Each line on a student card is a blank. The table style can change. What the blanks mean lives in the card’s legend.

Goal: a column of property names + controls, **schema-driven**, not a hand-written business path per control.

| Layer | What it does |
|---|---|
| Schema | field name, type, range, group, readonly |
| Row adapter | `int`→SpinBox, `bool`→Check, `enum`→Combo |
| Panel | walk the schema and generate rows |
| Core | get/set by key or strongly typed accessors |

```text
Schema["port"] = Int{default:8080, min:1, max:65535}
        │
        ▼
Adapter.row(field) → QSpinBox / Fyne widget / Slint SpinBox
        │
        ▼
onChange → core.set("port", v) → notify → other panels refresh
```

| Language stack | Implementation hint |
|---|---|
| Qt | `QFormLayout` add rows dynamically; or QML `Repeater`+model |
| Fyne | `widget.Form` + binding, dynamic |
| Slint | model + component factory (when complex, the core still drives) |
| egui | walk Vec\<Field\> every frame `ui.horizontal` |
| Unreal | `UPROPERTY` metadata → details panel (learn metadata; no need to chain the engine) |
| Blender | RNA properties → panel draw (learn “property descriptions in one place”) |

Walk the description, generate a row, send changes only back to the core (illustrative):

```go
// Go — illustrative
// for _, f := range schema { form.Append(f.Name, widgetFor(f)) }
```

```rust
// Rust egui — illustrative
// for f in &mut schema { ui.add(egui::DragValue::new(&mut f.value)); }
```

```cpp
// C++ Qt — illustrative
// for (const Field& f : schema) form->addRow(f.name, makeSpin(f));
```

---

## 4. Threads and the update pump (common to all three)

**Plain:** Only the execution flow that draws the window may touch controls. When background work finishes, send the result back to that flow, then change the UI.

**Picture:** Only the duty student may erase the blackboard. Everyone else hands them the sentence to write.

> GUI controls almost always require the **UI thread** to touch controls.

| Stack | Typical approach |
|---|---|
| Qt | `QMetaObject::invokeMethod` / signals queued to the main thread |
| Fyne | `fyne.Do` / main event loop |
| Wails/Tauri | events to the frontend; backend rarely touches the DOM |
| egui | state on the UI thread; background only sends messages |
| Slint | event-loop API as documented |

```go
// background → Fyne UI (sketch)
fyne.Do(func() { label.SetText(v) })
```

```cpp
// background → Qt
QMetaObject::invokeMethod(label, [label, v]{ label->setText(v); });
```

```rust
// background → UI thread — illustrative. The concrete API differs for egui/Slint; the intent is “send the result back to the side that draws the window”
// ui_tx.send(v);
```

---

## 5. FFI / cross-language UI (advanced)

**Plain:** When the core is one language and the UI is another, you usually cross a C interface or a dedicated bridge. The cost is higher than staying in one language.

**Picture:** Two classes hold a party together. The host has to translate. One class running its own event is cheaper.

| Combo | Path | Notes |
|---|---|---|
| Rust core + Flutter UI | flutter_rust_bridge | RustDesk as a production-facing reference |
| Rust core + Qt | cxx-qt | typed QObject |
| C++ core + Slint | official C++ API | declarative UI |
| C++ core + Go UI | cgo calling `.so` | possible but painful; same-language adapter is better |
| Go core + Qt | cgo bindings | heavy maintenance |

**Opinion (marked opinion):** for Wei’s toolset, **prefer a same-language thin adapter**; only take FFI when mobile / an existing Flutter shell requires it.


Put only ordinary functions on the bridge. Do not pass UI control pointers around as objects in the other language (illustrative):

```rust
// Rust core export — illustrative
// #[no_mangle] pub extern "C" fn core_set_port(p: i32) -> i32 { 0 }
```

```cpp
// C++ core export — illustrative
extern "C" int core_set_port(int p);
```

```go
// Go UI side consumes — illustrative
// C.core_set_port(C.int(8080))
```
---

## 6. Same / different callout (GUI chapter)

**Plain:** All can build a settings page. The difference is whether “binding” is a first-class part in the language/library, and whether the UI is declared or redrawn every frame.

**Picture:** Everyone hands in a form. Some use a carbon-copy sheet. Some draw each row with a ruler.

**Same**

- All can build “settings page + live status.”  
- All need to prevent **echo loops** (UI→model→UI).  
- All can test the core cleanly, then hang a skin on it.

**Different**

| | First-class binding | Declarative UI | Mobile |
|---|---|---|---|
| Fyne | high (binding package) | code-style layout | official support |
| Qt | high (property system) | QML is strong | exists; binary size and store friction are large |
| Slint | high (property) | `.slint` is strong | embedded/desktop-facing |
| egui | “no binding” is the binding | none | rough |
| iced | Message one-way | view function | not the main battlefield |
| Wails/Tauri | Web tech | HTML/CSS | depends on WebView |


“Echo” means: the UI changes, so it notifies the core; the core changes, so it writes back to the UI; that becomes a loop. Block signals before you change the control (illustrative):

```cpp
// C++ Qt — illustrative
box->blockSignals(true);
box->setValue(core.port());
box->blockSignals(false);
```

```go
// Go — illustrative. With no signals/slots, a bool “refreshing from the core” skips the write-back
// if !refreshing { core.SetPort(v) }
```

```rust
// Rust egui — illustrative. Each frame copy the core into state; write back only if the user really dragged
// if ui.add(egui::DragValue::new(&mut state.port)).changed() { core.set_port(state.port); }
```
---

## 7. Choosing, in brief (close to Wei)

**Plain:** First pick whether core and skin are the same language, then pick the widget library. Concrete binding examples are in section 2.

**Picture:** First decide whether it is the same notebook, then choose pencil or pen.

| Scene | Reasonable first try |
|---|---|
| Desktop tools, want clear two-way prefs binding | **Fyne** or **Qt + (Aria/KDBindings)** |
| Declarative UI, core/skin split | **Slint** or **QML** |
| Internal debugger, editor, oscilloscope shell | **egui** / ImGui |
| Team already does Web | **Wails** (Go) or **Tauri** (Rust) |
| Existing C++/Qt assets | keep Qt; use a facade; do not let Widgets touch disk |
| Learning property panels | schema-driven Form; borrow Blender/Unreal **thinking** |

---

## 8. Deliberately deferred

**Plain:** Full widget catalogs, store listing, and accessibility details are not expanded on this page.

**Picture:** This page only says how to attach the notebook to the cover, not every cover’s pattern.

- Full widget catalogs, accessibility APIs, i18n details.  
- iOS/Android store listing and permission matrices (see [ui-settings-binding-stacks.md](../../ui-settings-binding-stacks.md)).  
- Full game-engine integration (only borrow the “property panel” metaphor).
