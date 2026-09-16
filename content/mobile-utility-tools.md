# Mobile utility tool taxonomy + seed list

Catalog draft for continuous harvest of phone utility apps in the network / hardware / remote-control family.  
**Sources:** F-Droid metadata, GitHub/`gh` API, official project sites (verified 2026-09-16). Do not treat this as exhaustive.

**Legend — openness**
| Tag | Meaning |
|-----|---------|
| **OSS-heavy** | Primary value is open source; F-Droid or clear public repo; learnable |
| **Mixed** | Client OSS or partial; backend / Play build / proprietary core may differ |
| **Mostly closed** | Useful category exemplar; source unavailable or not the main product |

---

## 1. Taxonomy overview

| # | Category | Typical platforms | Learnable / OSS density |
|---|----------|-------------------|-------------------------|
| 1 | Remote desktop / remote control | Android, iOS (viewer), desktop companions | OSS-heavy (RustDesk, scrcpy) + closed (TeamViewer, AnyDesk) |
| 2 | Wi‑Fi analyzers | Android strong; iOS constrained by APIs | OSS-heavy on Android |
| 3 | General network / LAN tools | Android + some iOS | OSS-heavy Android; iOS often closed |
| 4 | FTP / SFTP / SMB / WebDAV / file transfer | Android, some cross | OSS-heavy |
| 5 | VPN / mesh / tunnel / VPN-share | Android, iOS | Mixed (WireGuard OSS; Outline OSS; Tailscale client OSS; many closed) |
| 6 | HTTP / API / request tools | Android, desktop; limited polished mobile OSS | Mixed |
| 7 | Bandwidth / iperf / speedtest | Android; iOS mostly closed speedtest | Mixed (iperf OSS clients; Ookla closed) |
| 8 | GPS / GNSS / location | Android strong (raw GNSS); iOS limited | OSS-heavy Android |
| 9 | Bluetooth / BLE scanners | Android, iOS | Mixed (nRF Connect closed app + docs; Spectre OSS) |
| 10 | USB / OTG serial | Android (OTG); iOS rare | OSS-heavy Android |
| 11 | Packet capture / per-app firewall | Android (VpnService); iOS restricted | OSS-heavy Android |
| 12 | DNS / DoH / DNSCrypt / blockers | Android, some iOS | OSS-heavy |
| 13 | Wake-on-LAN | Android | OSS-heavy |
| 14 | mDNS / Bonjour / discovery | Android, iOS | Mixed |
| 15 | SSH / terminal / shells | Android, iOS | Mixed (ConnectBot/Termux OSS; Termius/JuiceSSH closed) |
| 16 | MQTT / IoT brokers clients | Android, desktop | Mixed |
| 17 | QR / barcode | Android, iOS | OSS-heavy options |
| 18 | NFC readers / writers | Android; iOS limited | Mixed |
| 19 | Sensor dashboards (MQTT publish, IMU, etc.) | Android | OSS-heavy niches |
| 20 | Battery / thermal / power | Android | Mixed / thinner OSS |
| 21 | Port scan / ping / traceroute suites | Android | OSS-heavy libraries + apps |
| 22 | Proxy / MITM / HTTP debug | Android + desktop companion | Mixed |
| 23 | Certificate / key stores / OpenPGP | Android | OSS-heavy (OpenKeychain) |
| 24 | Local HTTP servers / share | Android | Thinner; often embedded in file apps |
| 25 | Torrent / seedbox clients | Android | OSS-heavy (LibreTorrent) |
| 26 | Termux companions / CLI utility hosts | Android | OSS-heavy |
| 27 | Peer local file send (AirDrop-like) | Cross | OSS-heavy (LocalSend) |

---

## 2. Seed apps per category

### 2.1 Remote desktop / remote control — **OSS-heavy + closed**

| App | Platform | License | URL | Learnable slice |
|-----|----------|---------|-----|-----------------|
| RustDesk | Android, iOS (control), desktop | AGPL-3.0 (GitHub); F-Droid lists GPL-3.0 flavor | https://github.com/rustdesk/rustdesk · https://rustdesk.com | Flutter UI + Rust rendezvous/relay; self-host server |
| scrcpy | Desktop↔Android (ADB) | Apache-2.0 | https://github.com/Genymobile/scrcpy | Mirrored display/control over ADB; not a phone “app” but core pattern |
| TeamViewer | Android, iOS, desktop | Proprietary | https://www.teamviewer.com | Closed baseline for UX / session model |
| AnyDesk | Android, iOS, desktop | Proprietary | https://anydesk.com | Closed; compare latency & permission UX |

### 2.2 Wi‑Fi analyzers — **OSS-heavy (Android)**

| App | Platform | License | URL | Learnable slice |
|-----|----------|---------|-----|-----------------|
| WiFiAnalyzer (VREM) | Android | GPL-3.0 | https://github.com/VREMSoftwareDevelopment/WiFiAnalyzer · https://f-droid.org/packages/com.vrem.wifianalyzer/ | Channel graphs, OUI, 2.4/5/6 GHz scan UI |
| WLANScanner | Android | GPL-3.0 | https://github.com/bewue/WLANScanner | Compact band diagrams + filters |
| Spectre | Android 12+ | GPL-3.0 | https://github.com/thomasbuilds/Spectre · https://f-droid.org/packages/dev.thomasbuilds.spectre/ | Multi-radio (Wi‑Fi/BT/cell/GNSS) + local scan |
| Network Survey | Android | Apache-2.0 | https://github.com/christianrowlands/android-network-survey · https://www.networksurvey.app/ | Logging Wi‑Fi/cell/BT/GNSS → CSV/GeoPackage |
| AirPort Utility / Apple Wi‑Fi UI | iOS | Closed | Apple App Store (system / vendor) | iOS scan limits — harvest for API constraints, not source |

### 2.3 General network / LAN tools — **OSS-heavy Android; iOS often closed**

| App | Platform | License | URL | Learnable slice |
|-----|----------|---------|-----|-----------------|
| Ning | Android | LGPL-3.0 | https://github.com/csicar/Ning · https://f-droid.org/packages/de.csicar.ning/ | Bonjour/Avahi + ARP + ping + ports |
| AndroidNetworkTools (lib) | Android library | Apache-2.0 | https://github.com/stealthcopter/AndroidNetworkTools | Ping/portscan/subnet helpers to embed |
| Fing | Android, iOS | Proprietary | https://www.fing.com · App Store / Play | Closed discovery UX reference |
| Spectre (local net) | Android | GPL-3.0 | https://github.com/thomasbuilds/Spectre | Host/service discovery under RF scanner |

### 2.4 FTP / SFTP / SMB / WebDAV / file transfer — **OSS-heavy**

| App | Platform | License | URL | Learnable slice |
|-----|----------|---------|-----|-----------------|
| Material Files | Android | GPL-3.0 | https://github.com/zhanghai/MaterialFiles · https://f-droid.org/packages/me.zhanghai.android.files/ | FTP/SFTP/SMB/WebDAV + Material file UX |
| FTPClient | Android | MIT | https://codeberg.org/qwerty287/ftpclient · https://f-droid.org/packages/de.qwerty287.ftpclient/ | Minimal FTP/FTPS/SFTP client |
| Amaze File Manager | Android | GPL-3.0 | https://github.com/TeamAmaze/AmazeFileManager | Cloud/NAS connectors pattern |
| LocalSend | Android, iOS, desktop | Apache-2.0 | https://github.com/localsend/localsend | LAN P2P send without account |
| OpenMTP | macOS↔Android MTP | MIT | https://github.com/ganeshrvel/openmtp | Desktop-side USB/MTP (not on-phone) |

### 2.5 VPN / mesh / tunnel / VPN-share — **Mixed**

| App | Platform | License | URL | Learnable slice |
|-----|----------|---------|-----|-----------------|
| WireGuard (official Android) | Android | Apache-2.0 | https://git.zx2c4.com/wireguard-android · mirror https://github.com/WireGuard/wireguard-android | VpnService + userspace Go tunnel |
| Tailscale | Android, iOS, desktop | BSD-3-Clause (Android client) | https://github.com/tailscale/tailscale-android · https://tailscale.com | Mesh control plane on WireGuard |
| Outline Client/Manager | Android, iOS, desktop | Apache-2.0 | https://github.com/OutlineFoundation/outline-apps | Self-host shareable access keys |
| OpenVPN for Android | Android | GPL-2.0 (F-Droid) | https://github.com/schwabe/ics-openvpn · https://ics-openvpn.blinkt.de/ | Classic OpenVPN profile UX |
| RethinkDNS / Rethink | Android | Apache-2.0 | https://github.com/celzero/rethink-app · https://rethinkdns.com/app | DoH/DNSCrypt + WG proxifier + firewall |
| v2rayNG | Android | GPL-3.0 | https://github.com/2dust/v2rayNG | Xray/v2fly client patterns (proxy-tunnel adjacent) |
| NetGuard | Android | GPL-3.0 | https://github.com/M66B/NetGuard | Per-app block via local VpnService |
| Surge / Shadowrocket-class | iOS | Proprietary | App Store listings (vendor sites vary) | Closed iOS proxy UX — watch APIs only |

### 2.6 HTTP / API / request tools — **Mixed**

| App | Platform | License | URL | Learnable slice |
|-----|----------|---------|-----|-----------------|
| HTTP Shortcuts | Android | MIT | https://github.com/Waboodoo/HTTP-Shortcuts · https://http-shortcuts.rmy.ch | Scriptable HTTP from launcher/shortcuts |
| Bruno | Desktop (API IDE) | MIT | https://github.com/usebruno/bruno | Offline collections; pattern for mobile ports |
| Insomnia | Desktop | Apache-2.0 | https://github.com/Kong/insomnia | REST/GraphQL/WS/gRPC client architecture |
| Reqable (ex–HTTP Canary lineage) | Desktop/mobile (vendor) | Mixed / source incomplete on GitHub | https://github.com/reqable/reqable-app · https://reqable.com | Traffic + REST; treat as **mostly closed** product |
| Postman | Cross | Proprietary | https://www.postman.com | Closed category leader |

### 2.7 Bandwidth / iperf / speedtest — **Mixed**

| App | Platform | License | URL | Learnable slice |
|-----|----------|---------|-----|-----------------|
| CellularLab | Android | Custom MIT-style (check repo) | https://github.com/Abhi5h3k/CellularLab | JNI iperf3 + ramp strategies |
| iPerf3Client (F-Droid) | Android | GPL-3.0 | https://github.com/CachoCh/iperf3AndroidClient · F-Droid `com.example.iperf3client` | Thin iperf3 UI wrapper |
| Speedtest by Ookla | Android, iOS | Proprietary | https://www.speedtest.net/apps | Closed measurement UX / server mesh |
| Fast.com | Android, iOS | Proprietary (Netflix) | https://fast.com | Closed simple downlink UX |

### 2.8 GPS / GNSS / location — **OSS-heavy Android**

| App | Platform | License | URL | Learnable slice |
|-----|----------|---------|-----|-----------------|
| GPSTest | Android | Apache-2.0 | https://github.com/barbeau/gpstest · F-Droid `com.android.gpstest.osmdroid` | Constellation UI + NMEA/logging |
| GNSS Logger (Google) | Android | Apache-2.0 | https://github.com/google/gps-measurement-tools | Raw GNSS measurements export |
| Network Survey | Android | Apache-2.0 | https://github.com/christianrowlands/android-network-survey | GNSS + RF survey logging |
| Spectre (GNSS view) | Android | GPL-3.0 | https://github.com/thomasbuilds/Spectre | Sky geometry + multi-constellation |

### 2.9 Bluetooth / BLE — **Mixed**

| App | Platform | License | URL | Learnable slice |
|-----|----------|---------|-----|-----------------|
| nRF Connect for Mobile | Android, iOS | Proprietary app; docs/issues public | https://github.com/nordicsemi/Android-nRF-Connect · https://www.nordicsemi.com/Products/Development-tools/nRF-Connect-for-mobile | GATT explorer UX (closed binary) |
| Spectre | Android | GPL-3.0 | https://github.com/thomasbuilds/Spectre | BLE ads + GATT inspector OSS |
| Network Survey | Android | Apache-2.0 | https://github.com/christianrowlands/android-network-survey | BLE survey logging |

### 2.10 USB / OTG serial — **OSS-heavy Android**

| App | Platform | License | URL | Learnable slice |
|-----|----------|---------|-----|-----------------|
| UsbTerminal | Android | Apache-2.0 | https://github.com/liorhass/UsbTerminal | USB-UART terminal + session log |
| Termux (+ usb packages) | Android | GPL-3.0 (app) | https://github.com/termux/termux-app | CLI host for `picocom`/python-serial |
| Another Term (F-Droid family) | Android | check F-Droid metadata | Search F-Droid “Another Term” | USB/BT serial + SSH combo (verify license per build) |

### 2.11 Packet capture / firewall — **OSS-heavy Android**

| App | Platform | License | URL | Learnable slice |
|-----|----------|---------|-----|-----------------|
| PCAPdroid | Android | GPL-3.0 | https://github.com/emanuele-f/PCAPdroid · https://emanuele-f.github.io/PCAPdroid | Rootless VpnService capture + TLS decrypt hooks |
| NetGuard | Android | GPL-3.0 | https://github.com/M66B/NetGuard | Per-app firewall without root |
| Rethink | Android | Apache-2.0 | https://github.com/celzero/rethink-app | Connection tracker + DNS + WG |
| mitmproxy | Desktop (+ Android via proxy/VPN) | MIT | https://github.com/mitmproxy/mitmproxy | Interactive TLS MITM; pair with phone proxy |

### 2.12 DNS / DoH / blockers — **OSS-heavy**

| App | Platform | License | URL | Learnable slice |
|-----|----------|---------|-----|-----------------|
| DNS66 | Android | GPL-3.0 | https://github.com/julian-klode/dns66 · https://jak-linux.org/projects/dns66/ | Hosts-based DNS VPN blocker |
| Rethink | Android | Apache-2.0 | https://github.com/celzero/rethink-app | DoH / DoT / DNSCrypt client |
| NextDNS / AdGuard DNS apps | Android, iOS | Mixed / closed apps over OSS protocols | Vendor sites | Closed UX on open DNS protocols |

### 2.13 Wake-on-LAN — **OSS-heavy**

| App | Platform | License | URL | Learnable slice |
|-----|----------|---------|-----|-----------------|
| OpenWOL | Android | AGPL-3.0 | https://gitlab.com/julien.cardoux/openwol · https://f-droid.org/packages/com.juliencardoux.openwol/ | Magic packet + SSID automation |
| FTPClient (WOL for hosts) | Android | MIT | https://codeberg.org/qwerty287/ftpclient | Adjacent: wake before FTP (feature, not dedicated) |

### 2.14 mDNS / Bonjour / discovery — **Mixed**

| App | Platform | License | URL | Learnable slice |
|-----|----------|---------|-----|-----------------|
| Ning | Android | LGPL-3.0 | https://github.com/csicar/Ning | Avahi/Bonjour browsing |
| LocalSend | Cross | Apache-2.0 | https://github.com/localsend/localsend | Discovery for P2P transfer |
| Discovery / Bonjour Browser class (iOS) | iOS | Often closed | App Store search “Bonjour” | iOS Multipeer/Bonjour API limits |

### 2.15 SSH / terminal — **Mixed**

| App | Platform | License | URL | Learnable slice |
|-----|----------|---------|-----|-----------------|
| ConnectBot | Android | Apache-2.0 | https://github.com/connectbot/connectbot · https://f-droid.org/packages/org.connectbot/ | Classic SSH + port forward |
| Termux | Android | GPL-3.0 | https://github.com/termux/termux-app · https://termux.com | Full userspace CLI platform |
| iSH | iOS | See repo | https://github.com/ish-app/ish | User-mode x86 Linux shell on iOS |
| Termius | Android, iOS | Proprietary | https://termius.com | Closed polished SSH/SFTP |
| JuiceSSH | Android | Proprietary | Play Store `com.sonelli.juicessh` | Closed; plugins/Mosh reference |

### 2.16 MQTT / IoT — **Mixed**

| App | Platform | License | URL | Learnable slice |
|-----|----------|---------|-----|-----------------|
| Sensor Spot | Android | GPL-3.0 | https://github.com/UmerCodez/SensorSpot · F-Droid `com.github.umercodez.sensorspot` | Phone sensors → MQTT publish |
| Eclipse Paho Android | Library | EPL/EDL (see repo) | https://github.com/eclipse-paho/paho.mqtt.android | Embeddable MQTT client |
| HiveMQ MQTT Client | JVM library | Apache-2.0 | https://github.com/hivemq/hivemq-mqtt-client | MQTT 5 Java client for KMP/Android |
| MQTT Explorer | Desktop | CC-BY-4.0 | https://github.com/thomasnordquist/MQTT-Explorer | Topic tree UX to emulate on mobile |

### 2.17 QR / barcode — **OSS-heavy options**

| App | Platform | License | URL | Learnable slice |
|-----|----------|---------|-----|-----------------|
| Binary Eye | Android | MIT | https://github.com/markusfisch/BinaryEye · F-Droid `de.markusfisch.android.binaryeye` | Scan + history + localized formats |
| ZXing / ML Kit based scanners | Libs | Apache-2.0 (ZXing) | https://github.com/zxing/zxing | Embed engine rather than full app |

### 2.18 NFC — **Mixed**

| App | Platform | License | URL | Learnable slice |
|-----|----------|---------|-----|-----------------|
| NFC Reader (mueller-ma) | Android | Apache-2.0 | https://github.com/mueller-ma/NFCReader | Simple tag dump |
| NFSee | Android | MIT | https://github.com/nfcim/nfsee · https://nfsee.nfc.im | Card structure visualization |
| NFC Tools | Android, iOS | Proprietary | Play / App Store | Closed write/read UX reference |

### 2.19 Sensor dashboards — **OSS niches**

| App | Platform | License | URL | Learnable slice |
|-----|----------|---------|-----|-----------------|
| Sensor Spot | Android | GPL-3.0 | https://github.com/UmerCodez/SensorSpot | Streaming sensors over MQTT |
| Spectre / Network Survey | Android | GPL / Apache | (see above) | RF+GNSS as “sensor” dashboards |
| phyphox | Android, iOS | Mixed (edu; check current license) | https://phyphox.org | Experiment-oriented sensor UI (**verify license before copying**) |

### 2.20 Battery / thermal — **Thinner OSS**

| App | Platform | License | URL | Learnable slice |
|-----|----------|---------|-----|-----------------|
| AccuBattery / GSam / similar | Android | Proprietary | Play Store | Closed battery analytics UX |
| Kernel/thermal via Termux | Android | N/A | Termux packages | Script `/sys` thermal zones — learnable ops, not a polished app |
| SD Maid SE (adjacent maintenance) | Android | GPL-3.0 | https://github.com/d4rken-org/sdmaid-se | Not battery-specific; storage hygiene patterns |

### 2.21 Port scan / ping / traceroute — **OSS-heavy**

| App | Platform | License | URL | Learnable slice |
|-----|----------|---------|-----|-----------------|
| AndroidNetworkTools | Library | Apache-2.0 | https://github.com/stealthcopter/AndroidNetworkTools | Building block for suites |
| Ning | Android | LGPL-3.0 | https://github.com/csicar/Ning | Integrated ping/ports |
| Termux `iputils`/`traceroute` | Android | Various | Termux packages | CLI suite without custom UI |

### 2.22 Proxy / MITM debugging — **Mixed**

| App | Platform | License | URL | Learnable slice |
|-----|----------|---------|-----|-----------------|
| HTTP Toolkit Android | Android | AGPL-3.0 | https://github.com/httptoolkit/httptoolkit-android · https://httptoolkit.com/android/ | VPN intercept → desktop debugger |
| PCAPdroid + mitmproxy | Android + desktop | GPL + MIT | (see above) | Local decrypt / remote analyze |
| Charles / Proxyman | Desktop + mobile setup | Proprietary | Vendor sites | Closed industry reference |

### 2.23 Certificate / key stores — **OSS-heavy**

| App | Platform | License | URL | Learnable slice |
|-----|----------|---------|-----|-----------------|
| OpenKeychain | Android | GPL-3.0 | https://github.com/open-keychain/open-keychain · https://www.openkeychain.org/ | OpenPGP keys / crypto UX |
| Android system credential storage | Platform | N/A | Android docs | User CA install for MITM debug |

### 2.24 Local HTTP servers — **Thin; often embedded**

| App | Platform | License | URL | Learnable slice |
|-----|----------|---------|-----|-----------------|
| Material Files / Amaze (share features) | Android | GPL | (see file managers) | Temporary share endpoints |
| SimpleHttpServer samples | Android samples | MIT (varies) | e.g. https://github.com/amame04/SimpleHttpServer-Android- | NanoHTTPD-style embedding |
| Termux `python -m http.server` | Android | N/A | Termux | Zero-UI local server |

### 2.25 Torrent / seedbox clients — **OSS-heavy**

| App | Platform | License | URL | Learnable slice |
|-----|----------|---------|-----|-----------------|
| LibreTorrent | Android | GPL-3.0 | https://gitlab.com/proninyaroslav/libretorrent · mirror https://github.com/proninyaroslav/libretorrent | Full libtorrent-based client + proxy |

### 2.26 Termux companions — **OSS-heavy**

| App | Platform | License | URL | Learnable slice |
|-----|----------|---------|-----|-----------------|
| Termux | Android | GPL-3.0 | https://github.com/termux/termux-app | Package ecosystem as utility host |
| Termux:API | Android | GPL-3.0 | https://github.com/termux/termux-api | Sensors/SMS/location CLI bridges |
| Termux:Boot / Widget (addons) | Android | See Termux org | https://github.com/termux | Background & launcher integration |

### 2.27 Peer local send — **OSS-heavy**

| App | Platform | License | URL | Learnable slice |
|-----|----------|---------|-----|-----------------|
| LocalSend | Cross incl. mobile | Apache-2.0 | https://github.com/localsend/localsend | REST+mDNS AirDrop alternative |

---

## 3. Adjacent categories to keep watching (weekly harvest)

- **USB gadget / RNDIS / Ethernet-over-USB** utilities and carplay/android-auto reverse-tethering tools  
- **Wi‑Fi Direct / Nearby Share / Nearby Connections** experiment apps  
- **eSIM / modem AT-command / Qualcomm Diag** (usually closed or root-only — track carefully)  
- **LoRa / Meshtastic / Reticulum** mesh radio clients  
- **Matter / Thread / Zigbee** commissioner & sniffer UIs  
- **CAN bus / OBD-II** (AndrOBD and forks)  
- **SDR companions** (RTL-SDR via OTG; mostly Termux + desktop)  
- **WireGuard “share tunnel” / userspace SOCKS bridges** (WG Tunnel class)  
- **iOS Network Extension** templates (Packet Tunnel Provider) — closed App Store but API-watch  
- **Flutter/KMP ports** of classic Android utilities (cross-platform rewrites)  
- **RustDesk / scrcpy competitors** (HopToDesk, ToDesk, Sunlogin — mostly closed)  
- **Privacy firewall hybrids** (TrackerControl, AFWall+ on root)  
- **Certificate pinning bypass education tools** (defensive/debug only; harvest UX, not attack recipes)

---

## 4. Notes / gaps

- **iOS** is structurally thinner for Wi‑Fi scan, packet capture, and VPN coexistence; many “must have” tools are closed. Prefer Android F-Droid for learnable slices.  
- **License strings** sometimes differ between GitHub SPDX and F-Droid metadata (e.g. RustDesk AGPL on GitHub vs GPL flavor on F-Droid) — always re-check before redistribution.  
- **nRF Connect**, **Termius**, **Fing**, **Ookla**, **Surge-class** are listed as category landmarks, not OSS templates.  
- Package IDs above were cross-checked against F-Droid where noted; Play-only apps may rename — verify before linking in harvest automation.
