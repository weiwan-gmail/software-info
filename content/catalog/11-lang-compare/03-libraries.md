# 03. Library ecosystem: standard library + common advanced libs

> Teaching layer (2026-10-04 PT): read **Plain** and **Picture** first in each section; terms come after. First-read path: [00-how-to-read.md](00-how-to-read.md). Code blocks are all illustrative.

> **Same:** all three have mature paths for “network / JSON / collections / logging / tests.”  
> **Different:** Go’s **standard library is thick** (HTTP client and server out of the box); Rust’s **standard library is small, crates are strong**; C++’s **standard library is medium, third-party is split** (Boost / Abseil / Qt / POCO…).

Library names come from public repos/docs; **do not invent prices**. Stars change; this page generally does not refresh counts. Status follows the upstream README.

---

## 1. Is the standard library “enough”?

**Plain:** The standard library is the toolbox that ships with the language. Whether it is enough decides whether you have to go outside for more libraries.

**Picture:** Does the pencil case have a ruler? If yes, measure. If not, you have to buy one.

| Capability | Go `std` | Rust `std` | C++ `std` (including recent years) |
|---|---|---|---|
| HTTP client/server | **Yes** (`net/http`) | No (use hyper/reqwest/axum) | No (use Boost.Beast, cpp-httplib, Qt Network…) |
| JSON | `encoding/json` | No (serde_json) | No (nlohmann/json, RapidJSON, simdjson…) |
| Regex | `regexp` | `regex` crate (not in std) | `<regex>` (implementation quality varies) |
| Concurrent collections | sync package; channels at language level | few; `crossbeam`/`dashmap` are common | few; TBB and other externals |
| Filesystem | thick | thick | `<filesystem>` |
| Time | thick | thick | `<chrono>` |
| Crypto | `crypto/*` | little (use ring/`rustls`) | no complete suite (OpenSSL/BoringSSL) |
| Reflection | `reflect` / `go/ast` | almost none | limited RTTI |


The same sentence “ask this machine’s health check.” Go uses the built-in library; the other two have no HTTP client in std (illustrative):

```go
// Go — illustrative
// resp, err := http.Get("http://127.0.0.1:9/health")
```

```rust
// Rust — illustrative. std has no HTTP; this is the shape of an external crate
// let text = reqwest::get("http://127.0.0.1:9/health").await?.text().await?;
```

```cpp
// C++ — illustrative. std has no HTTP client
// Common entries are libcurl or Boost.Beast, not some std::http
```
---

## 2. Side by side: serialization / JSON

**Plain:** Serialization turns a structure in memory into text or bytes you can save or send, then turns it back.

**Picture:** List what is in the desk. Someone else can put it back from the list.

```go
// Go
type Cfg struct {
  Port int `json:"port"`
}
b, err := json.Marshal(Cfg{Port: 8080})
```

```rust
// Rust: serde (de facto standard) https://serde.rs / crates.io serde
#[derive(Serialize, Deserialize)]
struct Cfg { port: u16 }
let s = serde_json::to_string(&Cfg { port: 8080 })?;
```

```cpp
// C++: nlohmann/json (sketch) https://github.com/nlohmann/json
nlohmann::json j = {{"port", 8080}};
std::string s = j.dump();
```

| | Go | Rust | C++ |
|---|---|---|---|
| Primary pick | `encoding/json`; high-perf options include `bytedance/sonic`, `jsoniter` | **serde** + serde_json / bincode / ciborium | nlohmann/json, RapidJSON, simdjson, protobuf |
| Validation | hand-written / go-playground/validator | serde + types; `validator` crate | hand-written / JSON Schema libraries |
| Schema IDL | protobuf / thrift as add-ons | prost / tonic ecosystem | protobuf, FlatBuffers, Cap’n Proto |

---

## 3. HTTP and Web

**Plain:** HTTP is a common way programs talk with “request / response,” for example opening a URL.

**Picture:** You pass a slip to the reception desk. They pass a slip back.

| | Go | Rust | C++ |
|---|---|---|---|
| Client | `net/http`; `resty` | **reqwest**; surf | libcurl, Boost.Beast, Qt `QNetworkAccessManager` |
| Server frameworks | std or **gin** / **echo** / chi / fiber | **axum** / actix-web / warp / rocket | Crow, oatpp, CppCMS, Drogon |
| Routing middleware | middleware-chain convention | tower middleware | per-framework |
| WebSocket | `gorilla/websocket`, `nhooyr/websocket` | tokio-tungstenite | websocketpp, Qt WebSockets |

```go
// Go: standard-library server sketch
http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
  w.Write([]byte("ok"))
})
log.Fatal(http.ListenAndServe(":8080", nil))
```

```rust
// Rust: axum sketch (needs tokio)
async fn health() -> &'static str { "ok" }
// Router::new().route("/health", get(health))
```

```cpp
// C++: no single standard; pseudocode sketch
// server.Get("/health", [](auto, auto res){ res.set_content("ok","text/plain"); });
```

---

## 4. Async runtimes and concurrency tools

**Plain:** Do not freeze the whole person while waiting for the network. Whoever switches between “waiting” and “continue” is the runtime.

**Picture:** You can chop vegetables while the water boils, but someone has to call you when it boils. That “someone who calls you” is the runtime.

| | Go | Rust | C++ |
|---|---|---|---|
| Default model | goroutine (runtime included) | must pick a runtime: **tokio** (most common), async-std, smol | threads + libraries: Boost.Asio, libuv, folly, Seastar |
| Structured concurrency | errgroup, `golang.org/x/sync` | tokio::JoinSet, `futures` | no unified story; Asio awaitable groups |
| Lock-free / concurrent structures | sync.Map; third-party | crossbeam, dashmap, parking_lot | folly, junction, TBB |
| Actor | roll your own channel style; tomb and similar | Actix actor; ractor | CAF (C++ Actor Framework) |

```rust
// Rust: tokio sketch
#[tokio::main]
async fn main() {
    tokio::spawn(async { /* ... */ });
}
```

```go
// Go: no runtime to pick
go func() { /* ... */ }()
```

---

## 5. Collections, algorithms, numerics

**Plain:** Collections are grouped data (lists, maps). Algorithms sort and search them. Numerics are especially large or especially fine numbers.

**Picture:** Schoolbag pockets: some line up by seat number (ordered); some flip cards by name (maps).

| Need | Go | Rust | C++ |
|---|---|---|---|
| General containers | slice/map; `container/*` | `Vec`/`HashMap`/`BTreeMap`; im and other immutable | full STL |
| Ordered concurrent map | third-party | `dashmap` and similar | TBB concurrent_hash_map |
| Iterator adapters | hand-written / generics | **very strong** Iterator adapters | `<ranges>` (C++20) |
| Bigints / exact | `math/big` | `num-bigint` | Boost.Multiprecision |
| SIMD | hand-written / asm / libraries | `std::simd` (experimental) / packed_simd | builtins/SIMD libs/Eigen |


The same sentence “sort three numbers” (illustrative):

```go
// Go — illustrative
nums := []int{3, 1, 2}
slices.Sort(nums)
```

```rust
// Rust — illustrative
let mut nums = vec![3, 1, 2];
nums.sort();
```

```cpp
// C++ — illustrative
std::vector<int> nums{3, 1, 2};
std::ranges::sort(nums);
```
---

## 6. Reflection, codegen, config

**Plain:** Sometimes a program must ask, at compile time or at run time, “which fields does this structure have,” so it can generate read/write code.

**Picture:** Do not copy the whole class list by hand. Let the roll sheet print each column itself.

> **Same:** “generate codecs from structs” is a hard need.  
> **Different:** Go does a lot at runtime via reflection; Rust does a lot at compile time via macros; C++ leans on external tools (protobuf, Qt MOC).

| | Go | Rust | C++ |
|---|---|---|---|
| Runtime reflection | `reflect` is first-class | basically none | `typeid` / Qt metaobject |
| Codegen | `go generate`, stringer, wire, ent | derive macros, build.rs | protobuf plugins, MOC, Python scripts |
| Config files | `encoding/*`; viper | config / figment / confy | yaml-cpp, toml++, QSettings |
| DI / wiring | uber/fx, google/wire | hand-written / shaku and similar | hand-written / Boost.DI / Qt parent-object tree |


The same sentence “do not write the boilerplate by hand” (illustrative). Go generate does not happen automatically inside `go build`; Rust derive macros expand at compile time; C++ has no standard derive.

```go
// Go — illustrative
//go:generate stringer -type=Kind
type Kind int
```

```rust
// Rust — illustrative
#[derive(Debug)]
struct Cfg { port: u16 }
```

```cpp
// C++ — illustrative. No standard derive.
// An external tool (for example a protobuf compiler) generates another source file, then you compile it in.
```
---

## 7. Logging and observability

**Plain:** A log is the program writing down “what just happened,” so you can look it up later.

**Picture:** A lab notebook: what time, which step, what the result was.

| | Go | Rust | C++ |
|---|---|---|---|
| Logging | `log/slog` (1.21+); zap, zerolog | **tracing** / log + env_logger | spdlog, glog, Boost.Log, Qt `qDebug` |
| Metrics | prometheus client | metrics / prometheus crates | prometheus-cpp |
| Distributed tracing | otel-go | opentelemetry-rust | otel-cpp |

```go
// Go slog sketch
slog.Info("listen", "addr", addr)
```

```rust
// Rust tracing sketch
tracing::info!(%addr, "listen");
```

```cpp
// C++ spdlog sketch
spdlog::info("listen {}", addr);
```

---

## 8. Advanced “domain” library cheat sheet (not exhaustive)

**Plain:** Below only points at a few common paths — database, command line, serial port, property binding. It is not a complete list.

**Picture:** The club notice board only posts “this class exists.” It does not copy every textbook’s table of contents.

### Database / ORM

| | Go | Rust | C++ |
|---|---|---|---|
| SQL | database/sql; pgx; sqlx; GORM | **sqlx**; diesel; sea-orm | SOCI, OTL, Qt Sql, nanodbc |
| KV | badger, bbolt, pebble | sled, redb | RocksDB C++ API, LevelDB |

### CLI

| Go | Rust | C++ |
|---|---|---|
| `flag`; cobra; urfave/cli | **clap**; structopt (merged into clap) | cxxopts, CLI11, Boost.Program_options |

### Serial ports / hardware-facing (Wei-related)

| | Library (public repo) | Notes |
|---|---|---|
| Go | `go.bug.st/serial` and similar | common pairing with Fyne serial tools |
| Rust | `serialport` crate | core can FFI to UI |
| C++ | Qt Serial Port; Boost.Asio serial | common in industrial work |

### Reactive / property binding (GUI prelude)

| Language | Library | Status note (public information) |
|---|---|---|
| C++ | [KDAB/KDBindings](https://github.com/KDAB/KDBindings) | header-only, Property + binding; can be used with Qt (watch `emit` macro clashes; `QT_NO_EMIT` is available) |
| C++ | [lumia431/reaction](https://github.com/lumia431/reaction) | C++20 reactive; local comparison in [qt-reactive-compare](https://github.com/weiwan-gmail/qt-reactive-compare) (separate private repo, not part of this site) |
| C++ | [dqsjqian/Aria](https://github.com/dqsjqian/Aria) | Property/Computed; has a Qt Widgets adapter |
| C++ | [palacaze/sigslot](https://github.com/palacaze/sigslot) | signal/slot; **no** automatic computation graph |
| C++ | RxCpp | **basically stalled** (community consensus); be careful on new projects |
| Rust | each GUI brings its own (iced messages, Slint properties, egui immediate) | fewer “global Rx” unifiers |
| Go | Fyne `data/binding` | clean integration with Preferences |


A command line with one extra “port” flag. Each language has a common library. Below is only the call shape; it does not add a domain (illustrative):

```go
// Go — illustrative. The standard library is enough for a small tool
// fs := flag.NewFlagSet("app", flag.ContinueOnError)
// port := fs.Int("port", 8080, "listen port")
```

```rust
// Rust — illustrative. clap is a common pick in the ecosystem, not std
// #[derive(Parser)] struct Cli { port: u16 }
```

```cpp
// C++ — illustrative. CLI11 / cxxopts class, not std
// CLI::App app{"app"}; int port=8080; app.add_option("--port", port);
```
---

## 9. Same problem, different library shape (summary example)

**Plain:** The same pipeline: read config, ask the network, write a log. Go often needs no extra library; the other two pick their own.

**Picture:** Same dish. The cafeteria has a ready window; the other two mix their own seasoning.

**Problem:** read JSON config → pull status over HTTP → log.

| Step | Go | Rust | C++ |
|---|---|---|---|
| JSON | `encoding/json` | serde_json | nlohmann/json |
| HTTP | `net/http` | reqwest | libcurl / Beast / Qt |
| Logging | slog | tracing | spdlog |
| Async | goroutine | tokio | Asio or a thread pool |

Go can often finish with **zero third-party deps**; Rust/C++ pick 2–4 libraries but the expressiveness/performance ceiling is higher.


Read a JSON object with `port`. Different libraries, same intent (illustrative):

```go
// Go — illustrative
var cfg struct{ Port int `json:"port"` }
err := json.Unmarshal([]byte(`{"port":8080}`), &cfg)
```

```rust
// Rust — illustrative
#[derive(serde::Deserialize)]
struct Cfg { port: u16 }
let cfg: Cfg = serde_json::from_str(r#"{"port":8080}"#)?;
```

```cpp
// C++ — illustrative
auto j = nlohmann::json::parse(R"({"port":8080})");
int port = j.at("port").get<int>();
```
---

## 10. Deliberately deferred

**Plain:** Machine learning and game engines are not expanded on this page, so the topic does not keep spreading.

**Picture:** This workbook does not come with an olympiad booklet.

- Machine-learning frameworks (Go is thin; Rust candle; C++ libtorch) are not expanded.  
- Game-engine bindings (Bevy / Unreal C++) are only touched in [05](05-gui-binding.md) / [06](06-advanced-cross.md) as property-panel thinking.  
- Full awesome lists live in the [02-awesome-github](../02-awesome-github/README.md) queue (awesome-go / awesome-rust / awesome-cpp).
