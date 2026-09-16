# Harvest integration notes — mobile utilities

Weekly harvest seeds for Wei’s continuous collection of phone utility apps (network / hardware / remote / transfer).  
Add these to search automation, awesome-list watchers, F-Droid/Play scrapers, and X (Twitter) keyword monitors.

---

## Search queries (rotate weekly)

### Core family
- `WiFi analyzer Android open source`
- `WifiAnalyzer OR "WLANScanner" OR Spectre F-Droid`
- `VpnService Android firewall OR capture OR WireGuard`
- `PCAPdroid OR NetGuard OR RethinkDNS`
- `iperf3 Android client`
- `GNSS Logger OR GPSTest Android`
- `USB serial OTG Android terminal`
- `Wake-on-LAN Android F-Droid`
- `mDNS Bonjour browser Android`
- `MQTT Android dashboard OR "Sensor Spot"`
- `FTP SFTP SMB WebDAV Android client open source`
- `LocalSend OR "AirDrop alternative" Android`
- `HTTP Shortcuts OR "REST client" Android F-Droid`
- `nRF Connect OR "BLE scanner" Android open source`
- `NFC Reader Android F-Droid`
- `remote desktop Android self-hosted OR RustDesk OR scrcpy`
- `Termux API companion utility`
- `OpenVPN for Android OR Tailscale OR Outline client`
- `LibreTorrent OR libtorrent Android`
- `DNS66 OR DoH client Android`

### Cross-platform / rewrite watch
- `Flutter WireGuard OR Flutter VPN VpnService`
- `Compose Multiplatform network tool`
- `Fyne Android serial OR Fyne preferences binding`
- `flutter_rust_bridge VPN OR serial`
- `Kotlin Multiplatform DataStore settings`
- `egui Android OR iced Android mobile`

### iOS (mostly closed — still harvest for gaps)
- `Network Extension Packet Tunnel open source iOS`
- `iSH OR Working Copy OR Surge OR Fing iOS utility`
- `CoreBluetooth GATT browser open source`

### Competitive / closed landmarks (UX only)
- `Termius OR JuiceSSH OR Fing OR Ookla Speedtest OR Proxyman Android OR iOS`

---

## Awesome lists & curated repos

Watch stars/commits/releases:

| Resource | URL | Why |
|----------|-----|-----|
| Awesome Android self-hosted | https://github.com/Elbullazul/awesome-android-selfhosted | VPN/self-host adjacent mobile clients |
| Awesome Selfhosted | https://github.com/awesome-selfhosted/awesome-selfhosted | Server-side twins (Outline, VPN, DNS) |
| F-Droid (browse + search) | https://f-droid.org | Primary OSS APK corpus |
| IzzyOnDroid | https://apt.izzysoft.de/fdroid/ | Extra apps (e.g. Network Survey often listed) |
| Termux packages | https://github.com/termux/termux-packages | CLI utilities that become “apps” via Termux |
| Android Network Tools lib | https://github.com/stealthcopter/AndroidNetworkTools | Dependency signal for new scanners |
| RustDesk | https://github.com/rustdesk/rustdesk | Remote-control category canary |
| WireGuard Android | https://git.zx2c4.com/wireguard-android | VPN baseline |
| PCAPdroid | https://github.com/emanuele-f/PCAPdroid | Capture category canary |
| GPSTest | https://github.com/barbeau/gpstest | GNSS category canary |
| LocalSend | https://github.com/localsend/localsend | LAN transfer canary |
| flutter_rust_bridge | https://github.com/fzyzcjy/flutter_rust_bridge | Stack harvest for Rust+UI utilities |
| Fyne | https://github.com/fyne-io/fyne | Go GUI mobile utility stack |
| Compose Multiplatform | https://github.com/JetBrains/compose-multiplatform | KMP UI stack |

Also watch: `Hack-with-Github/Awesome-Hacking` only for **defensive/tooling names** — do not harvest exploit how-tos into product plans.

---

## F-Droid categories & package patterns

### Categories to scrape / subscribe
- **Connectivity**
- **Internet**
- **Development**
- **System**
- **Security**
- **Cloud Storage & File Sync**
- **Science & Education** (sensors / phyphox-class)
- **Navigation** (GNSS-adjacent)

### Package ID / name patterns (regex ideas)
- `(?i)wifi|wlan|gnss|gps|wireguard|vpn|ssh|ftp|sftp|smb|webdav|mqtt|mdns|bonjour|wol|wake.?on.?lan|iperf|pcap|tcpdump|serial|usb.?terminal|nfc|ble|bluetooth|dns.?|doh|torrent|termux|vnc|rdp|remote`
- Known seeds: `com.vrem.wifianalyzer`, `com.emanuelef.remote_capture`, `com.wireguard.android`, `com.tailscale.ipn`, `org.connectbot`, `com.termux`, `com.android.gpstest`, `me.zhanghai.android.files`, `de.qwerty287.ftpclient`, `com.celzero.bravedns`, `org.jak_linux.dns66`, `de.markusfisch.android.binaryeye`, `com.juliencardoux.openwol`, `de.csicar.ning`, `com.carriez.flutter_hbb`, `org.proninyaroslav.libretorrent`, `ch.rmy.android.http_shortcuts`, `com.github.umercodez.sensorspot`

### F-Droid data sources
- App pages: `https://f-droid.org/packages/<id>/`
- Metadata YAML: `https://gitlab.com/fdroid/fdroiddata/-/tree/master/metadata`
- API: `https://f-droid.org/api/v1/packages/<id>`
- Search UI: `https://search.f-droid.org/?q=...`

---

## Google Play categories / queries

Play categories are coarser; use **query + “tools”**:

- Play categories: **Tools**, **Productivity**, **Communication**, **Maps & Navigation**
- Queries:
  - `network analyzer`, `wifi analyzer`, `port scanner`, `wake on lan`
  - `ssh client`, `sftp`, `ftp client`, `smb client`
  - `wireguard`, `openvpn`, `vpn firewall`
  - `packet capture`, `http injector` (**skip shady injectors** — prefer known-good debug tools)
  - `gps test`, `gnss`, `nrf connect`, `nfc tools`
  - `iperf`, `speedtest`, `bandwidth`
  - `mqtt`, `modbus`, `serial usb`
  - `remote desktop`, `vnc viewer`, `rdp`

**Filter:** prefer apps with public source links in description; flag closed apps as “UX watch only.”

---

## X (Twitter) / social keywords

Use OR-groups; combine with `github.com` OR `f-droid` OR `#FOSS` OR `#opensource`:

```
("WiFiAnalyzer" OR PCAPdroid OR NetGuard OR RethinkDNS OR GPSTest OR RustDesk OR LocalSend OR Termux OR "OpenKeychain" OR ConnectBot OR "Material Files" OR LibreTorrent OR "HTTP Shortcuts" OR "Sensor Spot" OR OpenWOL OR "nRF Connect") (F-Droid OR fdroid OR GitHub)

("WireGuard" OR Tailscale OR Outline OR "OpenVPN for Android" OR v2rayNG) (Android OR F-Droid) (release OR update)

(iperf3 OR "packet capture" OR VpnService OR "USB serial" OR GNSS OR mDNS OR "Wake-on-LAN") (Android) (open source OR FOSS)

(Fyne OR "Compose Multiplatform" OR flutter_rust_bridge OR egui) (Android) (serial OR VPN OR network)
```

Also follow (when accounts exist): F-Droid, IzzyOnDroid, Termux, WireGuard, Tailscale, RustDesk, PCAPdroid authors, GPSTest (`barbeau`), LocalSend.

---

## GitHub / Codeberg / GitLab harvest queries

```
topic:android topic:vpn
topic:android topic:wireguard
topic:android topic:wifi
topic:android topic:gnss OR topic:gps
topic:android topic:mqtt
topic:android topic:ftp
topic:mdns android
Wake-on-LAN android language:Kotlin
UsbSerial OR "usb-serial" android
VpnService capture OR firewall
"SharedPreferences" OR DataStore settings Compose network
fyne serial
```

Codeberg: search `ftpclient`, `fdroid` mirrors.  
GitLab: `proninyaroslav/libretorrent`, `julien.cardoux/openwol`, `fdroid/fdroiddata` commits under `metadata/`.

---

## Weekly checklist (ops)

1. Diff new F-Droid `metadata/*.yml` touching Connectivity/Internet/Development.  
2. Check releases: RustDesk, PCAPdroid, GPSTest, WireGuard Android, Tailscale Android, LocalSend, Termux, Rethink, Spectre, Network Survey.  
3. Scan Play “similar apps” graphs from 2–3 seeds per category (closed UX).  
4. Note any **Flutter/KMP/Fyne/Rust** rewrites of classic Java utilities.  
5. Drop candidates that are malware-adjacent “VPN injectors” / cracked proxies — keep Outline/WireGuard/Tailscale-class only.  
6. Update `/workspace/mobile-utility-research/mobile-utility-tools.md` seed tables; keep URLs verified (no invented links).

---

## Out of scope for harvest productization

- Exploit PoCs, unauthorized access tools, credential stealers  
- CSAM-adjacent or surveillance stalkerware  
- Instructions to bypass paid VPN/DRM  

Defensive packet capture, firewalling, and self-hosted remote access **are** in scope.
