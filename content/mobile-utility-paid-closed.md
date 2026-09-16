# Paid / free-closed mobile utility survey (Android-first)

> **Implementation focus = Android.** iOS and paid / free-closed apps are listed for **inspiration and competitive bar** only. Wei ships separate personal Android utility apps (not one mega-app). Do not treat this as a shopping list of clones — harvest **UI patterns and product slices**, not proprietary logic.

**Verified:** store / product pages via WebSearch + WebFetch, 2026-09-16 (Asia/Shanghai).  
**Fact vs opinion:** tables and URLs are **facts** from vendor/store pages; “Learnable slice” and “Worth watching” notes marked ***(opinion)*** are engineering judgment for Wei’s Android tools.  
**Pricing:** form only (buyout / subscription / freemium / free-closed). Exact dollar amounts are omitted on purpose — they drift by region and store.

**Legend — pricing form**

| Form | Meaning |
|------|---------|
| **Buyout** | One-time paid unlock (IAP or paid APK / App Store price) |
| **Subscription** | Recurring Pro / Premium / Team |
| **Freemium** | Useful free tier + paid unlock or sub |
| **Free-closed** | No charge for core app; proprietary / closed source (may still have optional IAP) |

---

## 1. Remote desktop / remote control

| App | Platforms | Pricing form | Official / store URL | Learnable slice *(opinion)* | API asymmetry |
|-----|-----------|--------------|----------------------|------------------------------|---------------|
| TeamViewer | Both + desktop | Freemium → subscription (business) | https://www.teamviewer.com | Session permission UX, unattended vs interactive modes, mobile↔mobile support narrative | Android MediaProjection / Accessibility for control; iOS viewer-stronger historically |
| AnyDesk | Both + desktop | Freemium → subscription | https://anydesk.com · pricing https://anydesk.com/en/pricing | Low-latency session chrome; “address / ID” connection model | Same: host control deeper on Android |
| Splashtop | Both + desktop | Subscription (+ limited personal free) | https://www.splashtop.com/products/remote-access · https://www.splashtop.com/pricing | Clean “list of owned machines” home; performance tiers as product language | Android can show multiple concurrent remotes on some plans (vendor claim) |
| Jump Desktop | iOS (buyout app) + desktop; Teams subscription | Buyout (iOS) / freemium web / Teams sub | https://jumpdesktop.com · https://jumpdesktop.com/pricing-plans.html | RDP/VNC/Fluid protocol picker; Fluid protocol marketing as UX differentiator | iOS client polish worth watching; Android availability varies by region |
| Chrome Remote Desktop | Both | Free-closed | https://remotedesktop.google.com · Play `com.google.chromeremotedesktop` | Account-linked “access my computers” simplicity; PIN setup flow | Host is desktop Chrome; phone is thin client |
| Microsoft Windows App / Remote Desktop | Both | Free-closed (enterprise features via Microsoft 365 / AVD) | https://learn.microsoft.com/en-us/windows-app/get-started-connect-devices-desktops-apps · Play `com.microsoft.rdc.androidx` | Workspace / gateway / RDS connection cards | Cloud PC / AVD is Microsoft stack, not peer RDP DIY |

**Category note *(opinion)*:** Competitive bar for Android remotes is still TeamViewer / AnyDesk latency + permission honesty. OSS peers (RustDesk) already cover self-host; paid apps teach **session trust UI**.

---

## 2. Wi‑Fi analyzers

| App | Platforms | Pricing form | Official / store URL | Learnable slice *(opinion)* | API asymmetry |
|-----|-----------|--------------|----------------------|------------------------------|---------------|
| Network Analyzer Pro (Techet) | Both | Buyout (Pro) / freemium Lite | https://techet.net/netanalyzer · Play `net.techet.netanalyzer.an` | One app that blends Wi‑Fi channel view + LAN + ping/traceroute/DNS — **but** Wei should keep separate apps; steal the **per-tool tab clarity** | **Wi‑Fi signal / channel graphs: Android only** (vendor states); iOS lacks neighbor AP scan APIs |
| NetSpot | Android (+ desktop Pro); iOS companion limited | Freemium → IAP “Plus” / desktop Pro | https://www.netspotapp.com/netspot-wifi-analyzer-for-android.html · Play `com.etwok.netspotapp` | Heatmap / survey / planning modes; phone survey → desktop report pipeline | iOS NetSpot cannot do full neighbor scan; heatmaps often upload/download speed only |
| Wifi Analyzer Pro | Android | Buyout | Play `info.wifianalyzer.pro` | Classic channel histogram + history graph + CSV export | Android 9+ throttles scans (OS fact); older “Pro” apps may warn on PIE+ |
| AirPort Utility (Wi‑Fi Scan) | iOS | Free-closed (Apple) | App Store — AirPort Utility | Hidden Settings toggle → scan duration UI *(opinion: elegant for constrained APIs)* | **iOS reference only** — not a ship target; scanner availability has changed across iOS versions |

**Fact:** Public Wi‑Fi neighbor scanning is a first-class Android `WifiManager` / scan-results surface (with throttling). iOS does **not** expose equivalent third-party AP lists; Apple’s own utility is the exception path.

---

## 3. Network / LAN discovery & suites

| App | Platforms | Pricing form | Official / store URL | Learnable slice *(opinion)* | API asymmetry |
|-----|-----------|--------------|----------------------|------------------------------|---------------|
| Fing | Both | Freemium → subscription (Premium / Professional) | https://www.fing.com/app/ · https://www.fing.com/pricing/ · Play `com.overlook.android.fing` | Device recognition cards (vendor/model); “who’s on Wi‑Fi” narrative; optional agent/desktop sync | Discovery works on both; continuous monitoring needs Desktop/Agent/Fingbox (vendor) |
| Network Analyzer Pro | Both | Buyout | https://techet.net/netanalyzer | Device list + NetBIOS/mDNS/LLMNR names in one scan result | Same suite as Wi‑Fi row — cross-listed intentionally |
| HE.NET Network Tools | Both | Free-closed | https://networktools.he.net/ · Play `net.he.networktools` | Engineer toolbox layout: ARP/NDP, ping sweep, traceroute, port scan, SSL info — no ads | Equal feature intent on both; raw sockets / some probes differ by OS |
| NetSpot (LAN / survey adjacent) | Android (+ iOS limited) | Freemium | https://www.netspotapp.com/ | Site-survey mindset applied to “coverage problems,” not just device lists | See Wi‑Fi row |

**Category note *(opinion)*:** Fing’s product lesson is **device identity storytelling**; HE.NET’s lesson is **dense toolkit without clutter** — good bar for a small Android LAN app.

---

## 4. FTP / SFTP / SMB / WebDAV / file transfer

| App | Platforms | Pricing form | Official / store URL | Learnable slice *(opinion)* | API asymmetry |
|-----|-----------|--------------|----------------------|------------------------------|---------------|
| Solid Explorer | Android | Freemium trial → buyout | Play `pl.solidexplorer2` · vendor https://neatbytes.com/solidexplorer/ | **Dual-pane** drag between local/cloud/SMB/SFTP; built-in web share server | Android Storage Access Framework + network libs; dual-pane shines on tablets |
| FX File Explorer (+ Plus) | Android | Freemium → buyout Plus | Play main app + Plus license `nextapp.fx.rk` | Network/cloud connectors as paid module; classic power-user chrome | Android-only landmark |
| X-plore File Manager | Android | Freemium (donation unlocks marked features) | Play `com.lonelycatgames.Xplore` | Tree + dual-pane; SMB/SFTP/FTP; Wi‑Fi share / web manage as paid slices | Android-only |
| Cx File Explorer | Android | Free-closed | Play `com.cxinventor.file.explorer` | Clean Material NAS navigator (FTP/SFTP/SMB/WebDAV) without paywall | Good “free-closed competitive bar” for OSS Material Files |
| FileBrowser Professional | iOS | Buyout (no IAP) | https://www.stratospherix.com/products/filebrowserprofessional/ · App Store `id854618029` | 20+ connectors; Files-app integration; sync/backup task builder | **iOS reference** — deepest NAS/SMB story on Apple |
| Documents by Readdle | iOS | Freemium → subscription Plus/Pro | App Store `id364901807` · support.readdle.com | Document hub + transfer + media; consumer polish | iOS-only product surface |

**API note:** SMB/SFTP clients are feasible on both platforms; Android wins on background transfer + USB OTG. iOS FileBrowser shows how far **Files provider integration** can go — *(opinion)* worth mirroring via Android `DocumentsProvider` if Wei builds a NAS client.

---

## 5. VPN / tunnel / share (proxy & tethering adjacent)

| App | Platforms | Pricing form | Official / store URL | Learnable slice *(opinion)* | API asymmetry |
|-----|-----------|--------------|----------------------|------------------------------|---------------|
| Surge | iOS (+ Mac) | Buyout / IAP Pro | https://www.nssurge.com/ · App Store Surge 5 `id1442620678` | Rule-based proxy UI; profile as first-class object; debugging panels | **iOS Network Extension** — gold-standard UX reference; no Android Surge |
| Shadowrocket | iOS | Buyout | App Store `id932747118` | Minimal “subscription URL → rules → connect” flow | iOS-only; Android has OSS Xray/v2ray clients instead |
| Quantumult X | iOS | Buyout | https://quantumult.app/x · App Store `id1443988620` | Script/rewrite/filter power-user surface | iOS-only |
| NetShare | Android | Freemium / IAP (vendor Play listing) | https://netshare.app/ · Play `kha.prog.mikrotik` | **Share VPN via hotspot** using local HTTP proxy + client proxy config | Android hotspot + `VpnService` coexistence patterns; iOS cannot mirror easily |
| Every Proxy | Android | Freemium | Play `com.gorillasoftware.everyproxy` | Local proxy to share connectivity; explicit “set proxy on client” UX honesty | Same Android-only tether/proxy niche |
| AdGuard (VPN/filtering mode) | Both | Freemium → subscription / license | https://adguard.com/en/adguard-android/overview.html · iOS App Store AdGuard | Local VPN as filter engine; DNS + HTTPS filtering product language | Android often sideloaded (Play policy); iOS Safari/content-blocker split |

**Fact:** Android `VpnService` enables local firewall / filter / share-tunnel apps. iOS requires Network Extension entitlements and App Store review — which is why Surge-class apps are paid buyouts and Android equivalents are often OSS or sideload freemium.

---

## 6. HTTP / API clients

| App | Platforms | Pricing form | Official / store URL | Learnable slice *(opinion)* | API asymmetry |
|-----|-----------|--------------|----------------------|------------------------------|---------------|
| ReqPad | Both | Freemium → Pro (sub or lifetime) | https://reqpad.app/ | Mobile-first REST + GraphQL/gRPC/MQTT behind Pro; Postman import; local-first data claim | Cross-platform; good Android ship reference |
| HTTPBot | iOS (+ Mac) | Freemium trial → sub or lifetime | https://httpbot.io/ · App Store `id1232603544` | Native request editor; JSONPath/XPath; Shortcuts automation | **iOS UX reference**; no Android |
| Reqable | Android (+ desktop / iOS variants) | Freemium | https://reqable.com/en-US/android/ · Play `com.reqable.android` | Capture + REST in one product; successor narrative to HttpCanary | Android VpnService intercept + API debug |
| APIOrbit | Apple platforms | Paid / IAP (vendor site) | https://apiorbit.pro/ | iCloud sync + Handoff for API collections | iOS/macOS only |
| Reqeast | Apple platforms | Free-closed (vendor: all features free) | https://reqeast.app/ | Native SwiftUI multi-protocol (HTTP/gRPC/WS/SSE/TCP/UDP) | Watch UX density; not Android |

**Category note *(opinion)*:** For Wei’s Android HTTP tool, ReqPad’s “REST free / advanced protocols paid” and Reqable’s “capture + client” are the clearest paid bars; HTTPBot teaches Apple-native editor polish.

---

## 7. Bandwidth / iperf / speedtest

| App | Platforms | Pricing form | Official / store URL | Learnable slice *(opinion)* | API asymmetry |
|-----|-----------|--------------|----------------------|------------------------------|---------------|
| Speedtest by Ookla | Both | Freemium (ads / optional remove-ads IAP; other IAP vary) | Play `org.zwanoo.android.speedtest` · App Store `id300704847` | One-tap gauge + server selection + history; global CDN narrative | Equal on both; closed methodology |
| iPerf3 Pro (iperf3app) | Both (+ Mac) | Buyout | https://iperf3app.com/android/ · https://iperf3app.com/ | Client **and** server modes; live chart; CSV/JSON export; saved profiles | Native on phone as **server** is huge for LAN tests — Android + iOS both supported by this vendor |
| HE.NET Network Tools | Both | Free-closed | https://networktools.he.net/ | iperf v2/v3 embedded in toolkit | Same |
| Network Analyzer Pro | Both | Buyout | https://techet.net/netanalyzer | Built-in internet speed test beside LAN tools | Convenience bundle |

**Fact:** Ookla measures path to their servers; iperf measures client↔your-server. Wei’s Android tools should keep that distinction explicit in UI copy *(opinion)*.

---

## 8. GPS / GNSS / location

| App | Platforms | Pricing form | Official / store URL | Learnable slice *(opinion)* | API asymmetry |
|-----|-----------|--------------|----------------------|------------------------------|---------------|
| GPS Status & Toolbox | Android | Freemium → Pro IAP | Play `com.eclipsim.gpsstatus2` | Compass + sky plot + AGPS tools + widgets; Pro unlock pattern | **Raw GNSS / dual-freq diagnostics are Android-strong** |
| GNSS Status (GPS Test) | Android | Freemium (ad removal / extras) | Play `at.harnisch.android.gnss` | Polished status + GPX + offline maps packaging | Android |
| Physics Toolbox Sensor Suite (Pro) | Android | Freemium → Pro buyout | Play free `com.chrystianvieyra.physicstoolboxsuite` · Pro `net.vieyrasoftware.physicstoolboxsuitepro` | Multi-sensor dashboard + CSV — GPS as one tile among many | Sensors richer on Android; iOS has phyphox-class edu apps |
| Apple Compass / Maps / Field Tools | iOS | Free-closed (system) | System apps | Clean magnetic/true north and location accuracy presentation | **No third-party raw GNSS measurement API** comparable to Android `GnssMeasurement` |

**Fact:** Android exposes raw GNSS measurements / navigation messages to apps (with OEM caveats). iOS does not — precision GNSS logging products are inherently Android-first.

---

## 9. Strong adjacent categories

### 9.1 Bluetooth / BLE

| App | Platforms | Pricing form | Official / store URL | Learnable slice *(opinion)* | API asymmetry |
|-----|-----------|--------------|----------------------|------------------------------|---------------|
| nRF Connect for Mobile | Both | Free-closed (Nordic) | Play `no.nordicsemi.android.mcp` · vendor https://www.nordicsemi.com/Products/Development-tools/nRF-Connect-for-mobile | GATT browser tree; advertising parse; DFU flows | Both capable; Android often sees more advertising types |
| LightBlue | Both | Free-closed / freemium extras | Punch Through / Play `com.punchthrough.lightblueexplorer` | Peripheral simulation + explorer | Strong on both |

### 9.2 Packet capture / HTTP debug proxy

| App | Platforms | Pricing form | Official / store URL | Learnable slice *(opinion)* | API asymmetry |
|-----|-----------|--------------|----------------------|------------------------------|---------------|
| PCAPdroid | Android | Freemium (firewall / extras paid) | Play `com.emanuelef.remote_capture` | No-root capture via VpnService; PCAP export; per-app filter | **Android-native**; iOS cannot match without NE + enterprise |
| Reqable | Android (+ more) | Freemium | https://reqable.com/en-US/android/ | MITM + replay + REST | Android VpnService |
| Charles / Proxyman | Desktop + mobile setup | Buyout / subscription | Vendor sites (charlesproxy.com / proxyman.io) | Cert install + device proxy wizard | Desktop brain; phone is client |

### 9.3 DNS / DoH / blockers

| App | Platforms | Pricing form | Official / store URL | Learnable slice *(opinion)* | API asymmetry |
|-----|-----------|--------------|----------------------|------------------------------|---------------|
| AdGuard | Both | Freemium → paid license/sub | https://adguard.com/en/adguard-android/overview.html | DNS + tracking lists + local VPN filter | Android Private DNS vs full VPN mode; iOS Safari blockers differ |
| NextDNS | Service + apps | Freemium → subscription | https://nextdns.io/ | Config hostname → Private DNS on Android 9+ | Android Private DNS is excellent first-class API; iOS uses app/DNS settings profiles |

### 9.4 SSH / terminal

| App | Platforms | Pricing form | Official / store URL | Learnable slice *(opinion)* | API asymmetry |
|-----|-----------|--------------|----------------------|------------------------------|---------------|
| Termius | Both + desktop | Freemium → subscription Pro | https://termius.com/ | Host vault, sync, SFTP, snips, multiplayer — **connection library UX** | Equal product; Android lacks some hardware-key niceties vs Apple |
| JuiceSSH | Android | Freemium → Pro IAP | Play `com.sonelli.juicessh` · site juicessh.com (verify if up) | Plugins / local shell / connection groups — Android classic | Android-only |
| Prompt 3 (Panic) | iOS / Mac / visionOS | Subscription or buyout | https://panic.com/prompt/ · App Store `id1594420480` | Panic-level typography & Panic Sync; Mosh/ET | **iOS UX reference** for terminals |

### 9.5 Sensors / dashboards

| App | Platforms | Pricing form | Official / store URL | Learnable slice *(opinion)* | API asymmetry |
|-----|-----------|--------------|----------------------|------------------------------|---------------|
| Physics Toolbox Sensor Suite Pro | Android | Buyout Pro | Play Pro package above | Experiment tiles + export | Android sensor richness |
| Sensor Kinetics / similar Play Pros | Android | Buyout / freemium | Play Store listings (search vendor) | Real-time multi-plot layout | Android |

---

## 10. iOS-as-reference (watch for UX, ship Android first)

Worth watching even though implementation target is Android *(opinion + fact mix)*:

| iOS app | Why watch |
|---------|-----------|
| **Surge / Quantumult X / Shadowrocket** | Best-in-class proxy profile & rule UX under Network Extension constraints |
| **Prompt 3** | Terminal chrome, fonts, sync — bar for any Android SSH app UI |
| **HTTPBot / Reqeast / APIOrbit** | Native API client editors; Shortcuts / iCloud patterns |
| **FileBrowser Professional** | NAS connector depth + Files integration + task automation |
| **Documents (Readdle)** | Consumer file-hub polish |
| **AirPort Utility Wi‑Fi Scan** | How to present sparse RF data honestly under API limits |
| **Jump Desktop** | Remote protocol picker + Fluid marketing clarity |
| **Fing / Network Analyzer / HE.NET / Termius / Speedtest** | Cross-platform products — compare Android vs iOS builds of the **same** vendor for layout differences |

**Opinion:** When an iOS app and Android app share a vendor (Fing, Termius, Ookla, HE.NET, Network Analyzer), prefer learning from **whichever build feels denser**, then implement with Android APIs.

---

## 11. Gaps / honesty checklist

| Gap | Note |
|-----|------|
| Exact prices | Intentionally omitted; re-check Play / App Store at ship time |
| Regional store availability | Jump Desktop Android, some CN mirrors, AdGuard sideload — verify locale |
| JuiceSSH website | Play listing verified; juicessh.com intermittently errored on fetch (2026-09-16) |
| “Pro” rename churn | Microsoft Remote Desktop → Windows App; HttpCanary → Reqable — prefer official current names |
| Mega-app temptation | Network Analyzer Pro bundles many tools successfully as a **product**; Wei’s strategy remains **separate Android utilities** — borrow IA clarity, not bundling strategy |
| Legal | Learnable = UX/feature ideas for original Android apps; not reverse engineering or cracking |

---

## 12. Category count summary

| # | Category | Paid / free-closed rows in this doc |
|---|----------|-------------------------------------|
| 1 | Remote desktop | 6 |
| 2 | Wi‑Fi analyzer | 4 |
| 3 | Network / LAN | 4 |
| 4 | FTP/SFTP/SMB/WebDAV | 6 |
| 5 | VPN / tunnel / share | 6 |
| 6 | HTTP / API | 5 |
| 7 | iperf / speedtest | 4 |
| 8 | GPS / GNSS | 4 |
| 9a | BLE | 2 |
| 9b | Packet capture | 3 |
| 9c | DNS | 2 |
| 9d | SSH / terminal | 3 |
| 9e | Sensors | 2 |
| | **Total rows** | **51** (some apps cross-listed by design) |
| | **Distinct categories / families** | **13** sections (8 core + 5 adjacent) |

