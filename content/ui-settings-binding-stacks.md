# UI / settings / two-way binding stacks

Comparison for building (or later swapping) a **custom settings core** under network/hardware utility UIs.  
**Fact vs opinion:** tables and numbered answers lean on official docs/repos; “Fit” and “plug custom core” difficulty include engineering judgment marked *(opinion)*.

Verified references checked 2026-09-16 via docs sites + GitHub.

---

## Compare table (quick)

| Stack | Settings store | Two-way to controls | Custom core under UI | Fit for sockets/VPN/Wi‑Fi/GPS/bg | Learnable slice |
|-------|----------------|---------------------|----------------------|----------------------------------|-----------------|
| Flutter / Dart | SharedPreferences, Hive, etc. via providers | Controllers / FormField / Riverpod; not WPF-style bindings | Easy *(op)* — isolate repo behind Riverpod | Strong cross-mobile; VPN/Wi‑Fi need platform channels | https://github.com/rrousselGit/riverpod · Flutter `shared_preferences` |
| KMP + Compose MP | DataStore Preferences (KMP) | `State` / `collectAsState`; unidirectional common | Easy-moderate *(op)* | Strong Android; iOS via expect/actual; VPN APIs native | https://developer.android.com/topic/libraries/architecture/datastore · https://github.com/JetBrains/compose-multiplatform |
| SwiftUI + Observation / Combine | `UserDefaults` / `@AppStorage` | Property wrappers; Observation for models | Moderate *(op)* — wrap UserDefaults | Excellent Apple APIs; Network Extension for VPN | Apple SwiftUI + AppStorage docs |
| React Native / Expo | AsyncStorage, MMKV | React state + RHF; no native two-way binding | Easy *(op)* | Good JS sockets; VPN/Wi‑Fi need native modules | https://github.com/react-hook-form/react-hook-form · https://github.com/mrousavy/react-native-mmkv |
| .NET MAUI | `Preferences` / SecureStorage | `Binding` + `INotifyPropertyChanged` | Moderate *(op)* | Mature sockets; platform APIs via handlers | https://github.com/dotnet/maui · MAUI Preferences docs |
| Avalonia | App-defined (no MAUI Preferences) | XAML `Binding` + INPC / ReactiveUI | Easy *(op)* for desktop; mobile maturing | Desktop-first; mobile exists but thinner for phone radios *(op)* | https://github.com/AvaloniaUI/Avalonia |
| Qt / QML | `Qt.labs.settings` / QSettings | QML property bindings | Moderate *(op)* | Strong networking; mobile deploy heavier | Qt QML Settings docs · https://github.com/qt/qtdeclarative |
| Native Android Views + DB/VB | SharedPreferences / DataStore | Data Binding `@={}` or manual | Easy with repository pattern *(op)* | Best Android radio/VPN access | Android Data Binding + DataStore guides |
| Native Android Compose | DataStore | Unidirectional State + events | Easy *(op)* | Same as Views for APIs | Android Compose state docs |
| Native iOS UIKit + Combine | UserDefaults | Combine pipelines / delegates | Moderate *(op)* | Full iOS APIs | Apple Combine + UserDefaults |
| Rust GUI (egui / iced) | DIY (files, confy, etc.) | Immediate mode (egui) or Elm messages (iced) | N/A — you own it | Mobile immature; better as core + FFI *(op)* | https://github.com/emilk/egui · https://github.com/iced-rs/iced · https://github.com/fzyzcjy/flutter_rust_bridge |
| Go / Fyne | `fyne.Preferences` + `binding.BindPreference*` | First-class data binding to widgets | Easy *(op)* | Android/iOS supported; serial demos exist; VPN/Wi‑Fi via native | https://github.com/fyne-io/fyne · https://docs.fyne.io |

---

## Per-stack notes

### 1. Flutter / Dart

1. **Settings:** Typically key-value (`shared_preferences`) or NoSQL boxes (Hive/Isar). Reactive layer is **not** the store — you wrap reads/writes in `InheritedWidget`, Provider, Riverpod, or signals.  
2. **Two-way binding:** No automatic WPF-style binding. Pattern: `TextEditingController` ↔ state; `FormField`/`TextFormField` with `onChanged`; Riverpod `Notifier` updates + rebuild.  
3. **Custom settings core:** **Easy** *(opinion)* — keep a pure Dart settings repository; inject via Riverpod overrides. UI never touches SharedPreferences directly.  
4. **Fit for utilities:** Excellent UI productivity. Sockets via `dart:io`; Wi‑Fi scan, VpnService, GNSS raw, USB serial need **platform channels / FFI** (see RustDesk Flutter tree). Background: Workmanager / foreground services via plugins.  
5. **Learnable slice:** https://github.com/rrousselGit/riverpod ; RustDesk `flutter/` for a real network utility shell — https://github.com/rustdesk/rustdesk

### 2. Kotlin Multiplatform + Compose Multiplatform

1. **Settings:** **DataStore Preferences** is the modern typed, Flow-based key-value store (AndroidX; KMP variants documented in community + JetBrains samples). Prefer over deprecated `SharedPreferences` for new code *(fact: Google recommends DataStore)*.  
2. **Two-way:** Compose is **unidirectional**: `var state by remember { mutableStateOf }` / `collectAsState`; writes call ViewModel intents. `rememberSaveable` for process death. No XML `@={}`.  
3. **Custom core:** **Easy–moderate** *(opinion)* — expose `Flow<Settings>` + suspend `update`; UI stays dumb.  
4. **Fit:** Best-in-class on Android for VPN (`VpnService`), Wi‑Fi, location. iOS via expect/actual for Network Extension / CoreLocation — more glue.  
5. **Learnable slice:** https://developer.android.com/topic/libraries/architecture/datastore ; https://github.com/JetBrains/compose-multiplatform

### 3. SwiftUI + Observation / Combine / AppStorage

1. **Settings:** `UserDefaults` with `@AppStorage` for simple keys; typed schemas via custom `Observable` models persisting to UserDefaults/Keychain/files.  
2. **Two-way:** `@State`, `@Binding`, `@AppStorage`, `@Observable` / Observation framework. Toggles/TextFields bind with `$property`. Combine still used for older pipelines / NotificationCenter.  
3. **Custom core:** **Moderate** *(opinion)* — bridge custom store into `@Observable` or wrap UserDefaults; `@AppStorage` alone fights complex schemas.  
4. **Fit:** First-party location, BLE (CoreBluetooth), Network framework. VPN requires Network Extension entitlements. Wi‑Fi scan APIs heavily limited vs Android.  
5. **Learnable slice:** Apple “Managing user interface state” / AppStorage; Observation migration notes (WWDC). Companion: https://github.com/ish-app/ish (not SwiftUI settings demo, but serious iOS systems app).

### 4. React Native / Expo

1. **Settings:** `@react-native-async-storage/async-storage` (async KV) or **MMKV** (fast sync KV). Expo SecureStore for secrets.  
2. **Two-way:** React controlled components (`value` + `onChangeText`). **React Hook Form** for forms. No native two-way binding engine.  
3. **Custom core:** **Easy** *(opinion)* — context/Zustand/Jotai over a settings module.  
4. **Fit:** Fine for HTTP/SSH-in-JS. VPN, packet capture, Wi‑Fi scan need **native modules** (Expo config plugins / bare). Background limits similar to other hybrids.  
5. **Learnable slice:** https://github.com/react-hook-form/react-hook-form ; https://github.com/mrousavy/react-native-mmkv (note: package moved under `margelo/react-native-mmkv` on GitHub)

### 5. .NET MAUI / Avalonia

**MAUI**
1. **Settings:** `Microsoft.Maui.Storage.Preferences` (KV primitives) + `SecureStorage`.  
2. **Two-way:** XAML `{Binding}` with `INotifyPropertyChanged` / `ObservableObject` (CommunityToolkit).  
3. **Custom core:** **Moderate** *(opinion)* — implement settings service; bind ViewModels; replace Preferences later.  
4. **Fit:** Solid for cross-platform tools with sockets; platform-specific VPN/Wi‑Fi via partial classes/handlers.  

**Avalonia**
1. **Settings:** Bring-your-own (JSON file, etc.); no MAUI Preferences equivalent built-in.  
2. **Two-way:** Mature XAML binding + INPC / ReactiveUI.  
3. **Custom core:** **Easy** *(opinion)* on desktop.  
4. **Fit:** Strong desktop; **mobile is real but ecosystem thinner for phone radio APIs** *(opinion)*.  
5. **Learnable slice:** https://github.com/dotnet/maui ; https://github.com/AvaloniaUI/Avalonia ; Avalonia binding docs (`INotifyPropertyChanged`)

### 6. Qt / QML

1. **Settings:** `Settings` QML type (`Qt.labs.settings` / Qt.core settings) backed by `QSettings` (platform-native INI/registry/plist).  
2. **Two-way:** QML property bindings (`property alias`, `Binding` objects); C++ `Q_PROPERTY` with `NOTIFY`.  
3. **Custom core:** **Moderate** *(opinion)* — expose QObject settings façade to QML.  
4. **Fit:** Excellent networking (`QNetwork*`, raw sockets). Mobile (Android/iOS) supported but APK size, permissions, and store friction are heavier than Flutter/KMP *(opinion)*. USB/serial via Qt Serial Port on desktop; mobile OTG varies.  
5. **Learnable slice:** Qt doc “Settings QML Type”; https://github.com/qt/qtdeclarative

### 7. GTK / libadwaita / Flutter-desktop cousins

Relevant mainly if the **same settings core** also ships a Linux companion (serial monitor, iperf UI).  
- **GTK4 + libadwaita:** `GSettings` schemas; widgets bind via `GObject` properties — desktop-class, not phone primary.  
- **Flutter-desktop:** same Dart settings story as mobile Flutter.  
*(Opinion)* Skip GTK as a **mobile** utility UI choice; keep as optional desktop twin.

### 8. Native Android Views + Data Binding / ViewBinding vs Compose

1. **Settings:** DataStore (preferred) or SharedPreferences.  
2. **Two-way:**  
   - **Data Binding:** `@={viewModel.prop}` true two-way.  
   - **ViewBinding:** find-view only — you wire listeners.  
   - **Compose:** unidirectional state.  
3. **Custom core:** **Easy** *(opinion)* with repository + ViewModel.  
4. **Fit:** **Best** access to VpnService, WifiManager, GnssMeasurement, UsbManager, foreground services.  
5. **Learnable slice:** PCAPdroid / WireGuard Android for VpnService patterns; DataStore official guide.

### 9. Native iOS UIKit + Combine vs SwiftUI

1. **Settings:** UserDefaults / Keychain; app group suites for extensions (VPN).  
2. **Two-way:** UIKit is delegate/target-action + Combine `UIControl` publishers; SwiftUI as above.  
3. **Custom core:** **Moderate** *(opinion)* — especially when Packet Tunnel Provider must share App Group settings.  
4. **Fit:** Full BLE/location/Network; capture/VPN constrained by entitlements and review.  
5. **Learnable slice:** Apple “Creating a packet tunnel provider”; UIKit+Combine samples.

### 10. Rust GUI (egui, iced) + FFI bridges

1. **Settings:** No standard mobile prefs API — use `confy`, `serde`+JSON, or platform stores via JNI/FFI.  
2. **Two-way:**  
   - **egui:** immediate mode — each frame read/write fields (binding ≈ “edit `&mut`”).  
   - **iced:** Elm architecture — messages update model.  
3. **Custom core:** You already own it; the question is UI maturity.  
4. **Fit / honesty:**  
   - **egui/eframe:** Android builds exist (`android-activity` / `eframe`); soft keyboard & touch latency still rough *(community reports; not a polished Play utility UX)*.  
   - **iced:** mobile **not** a primary goal; experimental.  
   - **Practical pattern *(opinion)*:** Rust core (sockets, protocols) + **flutter_rust_bridge** or Kotlin JNI into Compose/Flutter UI (RustDesk model).  
5. **Learnable slice:** https://github.com/emilk/egui ; https://github.com/iced-rs/iced ; https://github.com/fzyzcjy/flutter_rust_bridge ; RustDesk as production Flutter↔Rust utility.

### 11. Go mobile / Fyne

1. **Settings:** `fyne.App.Preferences()` typed getters/setters; change listeners.  
2. **Two-way:** `data/binding` package — e.g. `binding.BindPreferenceString(key, prefs)` wired to `widget.NewEntryWithData`. **This is one of the clearest mobile-capable binding stories.** *(fact: Fyne docs/API)*  
3. **Custom core:** **Easy** *(opinion)* — Preferences interface is swappable behind bindings if you rebind widgets to custom `binding.String` etc.  
4. **Fit:** Fyne targets Android/iOS/desktop. Good for **serial monitors, dashboards, HTTP tools**. Deep VPN/Wi‑Fi scan still needs gomobile JNI/cgo to platform APIs. Background work is OS-specific. Wei’s serial-monitor interest maps well here.  
5. **Learnable slice:** https://github.com/fyne-io/fyne ; https://docs.fyne.io (Preferences + data binding); Fyne demos in-repo.

---

## Cross-cutting recommendations *(opinion, labeled)*

| Goal | Lean toward |
|------|-------------|
| Max Android radio/VPN fidelity | Kotlin Compose (maybe KMP shared domain) |
| Fast cross-platform UI + Rust engines | Flutter + `flutter_rust_bridge` (RustDesk path) |
| Explicit two-way prefs binding with little ceremony | **Fyne** or **MAUI/Avalonia** XAML |
| iOS Network Extension + polished Apple UI | SwiftUI + App Groups |
| Single settings schema across mobile + desktop Linux | Abstract KV/typed schema; adapters per toolkit |

**Established fact:** almost no toolkit gives “WPF Binding + arbitrary custom settings DB” for free on mobile — you always insert a small façade.

**Opinion:** For Wei’s harvest-built utilities, prefer **settings repository interface** first; pick UI kit second. Binding tech matters less than clean platform API seams (VpnService, location, USB).


---

## Architecture intent (Wei, 2026-09-16)

Not one all-in-one product. Separate **personal utility apps**, each as needed, **any language / any platform**.

| Layer | What stays similar | What deliberately differs |
|-------|--------------------|---------------------------|
| Core | Settings schema, coupling, tracking, event / update patterns | Implementation language OK to change per tool |
| GUI | Thin **adapters** that map core state ↔ native widgets | Toolkit, platform, and control library — **no** requirement that phone UIs look or behave the same across Flutter / Compose / SwiftUI / Fyne / etc. |
| Mobile | Prefer the stack that fits *this* tool’s APIs (VPN, Wi‑Fi, GNSS, USB) | Do **not** optimize for cross-platform or cross-framework GUI consistency |

Practical shape: define a small core façade (settings + events + tracked values); write one adapter per GUI you actually use. Cross-platform UI frameworks are optional conveniences, not a goal.
