# Collect by platform: classics + new names

The domain catalog is in [catalog/README.md](/catalog/).

Checked: 2026-08-29 PT. The six you named all went into Windows. How to keep collecting is section 1. X is one of those lines.

What goes in: usable, learnable, or classic enough that you should know it. Big companies are fine. Skip products that only work if you have a frontier model or ad recommendations.

---

## 1. How to keep collecting

Do not only scrape GitHub stars. Many classics have no repo. New things often show up first on X, Appinn, V2EX.

### 1.1 Five lines in parallel

| Line | What to do | Examples |
|---|---|---|
| Platform awesome lists | Watch recent commits, who got added | See 1.2 |
| Package-manager repos | New formula / winget manifest | winget-pkgs, Scoop Extras, Homebrew |
| **X** | Author release posts, “my toolbox” threads, list screenshots | See 1.3 |
| Chinese-language communities | Appinn, SSPAI, V2EX, Playing with Digital Life | [@appinn](https://x.com/appinn) mirrors Appinn and upgrades |
| Obscure sources | talks, interviews, podcasts, non-English sites | See 1.5. The goal is names you do not already know |

Every candidate gets four questions first: official URL, which platform, free vs buyout/subscription, and whether there is a learnable slice or an open-source counterpart. Fail those and it is a note only, not homework.

### 1.2 Platform lists to watch (GitHub)

| Platform | List | star (then) |
|---|---|---:|
| Master index | [sindresorhus/awesome](https://github.com/sindresorhus/awesome) | 501,191 |
| Windows | [0PandaDEV/awesome-windows](https://github.com/0PandaDEV/awesome-windows) | 2,792 |
| macOS | [jaywcjlove/awesome-mac](https://github.com/jaywcjlove/awesome-mac) | 112,090 |
| Linux | [luong-komorebi/Awesome-Linux-Software](https://github.com/luong-komorebi/Awesome-Linux-Software) | 25,584 |
| Android | [JStumpp/awesome-android](https://github.com/JStumpp/awesome-android) (libraries) / [offa/android-foss](https://github.com/offa/android-foss) (installable apps) | 12,306 / 11,052 |
| iOS | [vsouza/awesome-ios](https://github.com/vsouza/awesome-ios) | 53,210 |
| Windows install sources | [microsoft/winget-pkgs](https://github.com/microsoft/winget-pkgs), [ScoopInstaller/Extras](https://github.com/ScoopInstaller/Extras) | 11,026 / 2,148 |

`awesome-ios` / `awesome-android` lean toward developer libraries. For apps, also watch F-Droid, android-foss, AltStore threads.

### 1.3 Collecting from X

There is no official X connector. Public posts: search, [fxtwitter](https://fxtwitter.com), or a browser. You already archive X posts into video-summary. Tool posts can land in this table the same way.

**What to search (rotate platforms weekly):**

- `Windows tools` / `must have utilities` / `Sysinternals` / `file manager`
- `Snipaste` / `Rufus` / `Total Commander` / `DiskGenius` / `Quicker`
- `macOS apps` / `Raycast` / `Homebrew cask`
- `F-Droid` / `Android FOSS`
- Chinese: `小众软件`, `效率工具`, `启动器`

**Who to watch:**

- Author releases: Sysinternals updates often come from Mark Russinovich (the 2026-05 ProcDump / ZoomIt drop did); Snipaste author levie / [liulex](https://github.com/liulex); Rufus is [pbatard](https://github.com/pbatard)
- List accounts: [Appinn @appinn](https://x.com/appinn) (mirrors appinn.com and upgrades). SSPAI, It's FOSS, Omgyubuntu also post often. Check the official site before collecting
- Post shapes: one desktop screenshot + a string of names; a long “my Windows toolbox” thread; someone forwarding an awesome update

**What to do with one X post:**

1. Write down the name and link (or the fxtwitter full text)
2. Find the official site or repo. Do not trust the download button in a forwarded image
3. Mark platform, paid form, classic vs new
4. Put it in the matching platform table below. Source as `X @account date`
5. Mark the learnable slice separately. Another large-model wrapper does not go in

### 1.4 Cadence

- Do not check Sysinternals / Rufus / tools already in the table for new versions. You want names you do not know.
- Each week, swap in one obscure source (1.5) plus a pass of X or new awesome entries.
- Steps are in [Collect classic tools](sand-workflow:collect-classic-tools). Run it on Mondays. Report nothing if there is nothing new.

### 1.5 Dig for “still unknown” (more useful than chart-scraping)

These places mention tools in passing, not as a product launch.

| Source | How to dig | Why you see names you have not seen |
|---|---|---|
| Tech talk | FOSDEM, CCC, CppCon, SREcon, USENIX, Black Hat **Arsenal** (tools on purpose), FPGA / embedded rooms. Watch what the speaker opened. Skip sponsor keynotes | Small tools demoed on stage rarely hit a free chart |
| [usesthis.com](https://usesthis.com/) | one person’s whole desk | Cross-era, cross-country. Often obscure buyout software |
| Ask HN / Lobsters | search `what tools do you use` in the last month | Low overlap with awesome lists |
| Podcast notes | Changelog, Self-Hosted, Oxide and Friends | One episode often drops two or three unknowns |
| Famous uses / dotfiles | an engineer’s `/uses` page | Nothing like a store chart |
| video-summary transcripts | talks you already store. Pull software names | Do not open a new source |
| Non-English sites | Japan [窓の杜](https://forest.watch.impress.co.jp/), German Heise/c't, Ruanyifeng Weekly | Regional classics never reach the Chinese-language circle |
| Same-class replacements | known Total Commander → Eastern-European dual-pane; known Snipaste → JP/KR pin-a-screenshot | Deliberately look for the same class in a parallel universe |
| Crowd Supply / Hackaday / OSHWA | new boards, certified hardware, teardowns | Open hardware rarely hits an app chart |
| Printables / MakerWorld | model + license, no stars | 3D-print homework is slicers and firmware, not another STL |
| itch.io / Flashpoint | filter by tag or original site | Browser games and indie games are not Steam bestsellers |
| ctext / charting repos | digitized texts, non-LLM hexagrams | Divination collects texts and algorithms first, not AI fortune wrappers |

Black Hat Arsenal, FOSDEM booths, and lightning talks (one tool in five minutes) are cleaner than a conference keynote. SIGGRAPH / oscilloscope / FPGA rooms sit closer to the current direction.


---

## 2. Windows (including the six you named)

| Name | Site / repo | Paid | Notes |
|---|---|---|---|
| **Total Commander** | [ghisler.com](https://www.ghisler.com/) | shareware | Dual-pane file manager. 11.58 on 2026-07-01. Since 1995. Open-source counterpart [doublecmd/doublecmd](https://github.com/doublecmd/doublecmd) (4,454 star) |
| **Sysinternals Suite** | [Microsoft Learn](https://learn.microsoft.com/en-us/sysinternals/downloads/sysinternals-suite) · also [live.sysinternals.com](https://live.sysinternals.com/) | free | Mark Russinovich, site from 1996, Microsoft bought it in 2006. Suite update 2026-08-19. ProcExp / ProcMon / Autoruns / Sysmon / PsTools / ZoomIt. Big company, but portable small tools you can study |
| **DiskGenius** | [diskgenius.com](https://www.diskgenius.com/) | free + Pro | Partition, recover, backup. No official repo. Study partition tables and recovery as a product. Do not crack it |
| **Rufus** | [pbatard/rufus](https://github.com/pbatard/rufus) (37,469 star, GPL-3.0) | free | Bootable USB. Rare high-star open source among Windows classics |
| **Snipaste** | [snipaste.com](https://www.snipaste.com/) · feedback [Snipaste/feedback](https://github.com/Snipaste/feedback) (3,679) | free + Pro | Screenshot and pin to the desktop. Author levie ([liulex](https://github.com/liulex)). Win / Mac. Linux has clones |
| **Quicker** | [getquicker.net](https://getquicker.net/) · feedback [cuiliang/Quicker](https://github.com/cuiliang/Quicker) (617) | free + Pro | Windows fingertip toolbox: middle-click panel, action library (the site has claimed 8000+ actions). Android client [cuiliang/QuickerAndroid](https://github.com/cuiliang/QuickerAndroid) |
| **Lazy Nezumi Pro** | [lazynezumi.com](https://lazynezumi.com/) | buyout $39 | Overlay that injects stroke stabilizers / geometric rulers / scripts into an existing painting host (Attach To Window). Site price; includes one year of updates from purchase, renewal optional; personal license up to 3 machines |

Same class, already in the learnable-desktop table: PowerToys, ShareX, Everything (search awesome-windows), KeePassXC.

---

## 3. macOS

The seed is still open-source small tools. Detail is in [learnable-desktop.md](/learnable-desktop).

Watch often: Rectangle, AeroSpace, Maccy, AltTab, IINA, LocalSend, Raycast (closed-source), Snipaste (has Mac), Stats, Hidden / Ice. Also watch RansomWhere? (Objective-See). Also: [OKA Apps](https://okaapps.com/) — free closed-source Mac utilities (some iOS/tvOS); harvest 2026-10-11 in §8.1.

List: [awesome-mac](https://github.com/jaywcjlove/awesome-mac). Install: Homebrew cask.

---

## 4. Linux

List: [Awesome-Linux-Software](https://github.com/luong-komorebi/Awesome-Linux-Software). Dual-pane files: Double Commander, Midnight Commander. Screenshots: Flameshot, Spectacle. Launchers: rofi, Albert. Some Sysinternals tools have Linux ports (Microsoft was still updating them in 2026).

---

## 5. Android

List leans libraries: [awesome-android](https://github.com/JStumpp/awesome-android). Installable apps: [android-foss](https://github.com/offa/android-foss), F-Droid.

Desktop counterparts that also exist here: LocalSend, AnkiDroid, Syncthing, KeePass-compatible clients, Quicker Android. Paid-chart homework is in [learnable-mobile.md](/learnable-mobile) (AnkiMobile, Paprika, Streaks). Recent harvest apps (Gander, Network Scanner, De1984, DroidFRPD, Universal Installer, Haven) are in §8.1.

---

## 6. iOS

List leans development: [awesome-ios](https://github.com/vsouza/awesome-ios). Store paid-chart classics: AnkiMobile, Things, Streaks, Procreate Pocket. System-level small tools are rarely open source. Collecting leans on X / SSPAI more than GitHub.

---

## 7. Cross-platform web tools

See [learnable-web-tools.md](/learnable-web-tools). it-tools, Stirling-PDF, Squoosh, Excalidraw.

---

## 8. Record format (use this for every later entry)

```
- Name:
- Platform: Windows / macOS / Linux / Android / iOS / Web
- Site or repo:
- Paid:
- Source: X @x / awesome-windows commit / Appinn / official release
- Date:
- Learnable slice:
```


---

## 8.1 Weekly harvest records

### 2026-08-31 · source 1 (tech talks / Black Hat Arsenal)

- Name: RansomWhere?
- Platform: macOS
- Site or repo: https://github.com/objective-see/RansomWhere · https://objective-see.org/products/ransomwhere.html
- Paid: free open source (GPL-3.0)
- Source: Black Hat Arsenal USA 2026 — “Practical Ransomware Detection on macOS (via Math, not AI)” (Patrick Wardle)
- Date: 2026-08-31
- Learnable slice: watch Shannon entropy of newly written files via Apple Endpoint Security, plus simple heuristics to separate high-entropy ciphertext from compression (no signatures, no ML)

### 2026-09-06 · source 2 (usesthis / Ask HN / Lobsters)

- Name: Lazy Nezumi Pro
- Platform: Windows
- Site or repo: https://lazynezumi.com/
- Paid: buyout $39 (site price; includes one year of updates from purchase, renewal optional; personal license up to 3 machines)
- Source: https://usesthis.com/interviews/torben.bokemeyer/ — Uses This / Torben Bökemeyer (Illustrator, game artist · 2026-09-05)
- Date: 2026-09-06
- Learnable slice: as an overlay, inject stroke stabilizers / geometric rulers / scripts into an existing painting host (Attach To Window) instead of rewriting a full canvas

- Name: lnav
- Platform: Linux / macOS / Windows (terminal)
- Site or repo: https://lnav.org/ · https://github.com/tstack/lnav
- Paid: free open source (BSD-2-Clause)
- Source: https://news.ycombinator.com/item?id=49314700 — Ask HN: What is your favorite lightweight tool or CLI utility in 2026?
- Date: 2026-09-06
- Learnable slice: merge multiple logs by time + auto-detect formats + query logs with SQLite inside a TUI (no server, no pre-ingest)

- Name: Mergiraf
- Platform: Linux / macOS / Windows (Git / jj merge driver)
- Site or repo: https://mergiraf.org/ · https://codeberg.org/mergiraf/mergiraf
- Paid: free open source (GPL-3.0)
- Source: https://lobste.rs/s/ttxwdz/what_software_do_you_use_daily_2026 — What software do you use daily in 2026? (2026-08-18)
- Date: 2026-09-06
- Learnable slice: syntax-tree-aware Git merge driver (not pure line diff); falls back to conflict markers when unsafe; `mergiraf review` to re-check auto-resolutions

### 2026-09-14 · source 3 (Changelog / Self-Hosted podcast notes)

- Name: Docling
- Platform: Linux / macOS / Windows (Python CLI / library; self-hostable API)
- Site or repo: https://github.com/docling-project/docling · https://docling-project.github.io/docling/
- Paid: free open source (MIT; started at IBM Research, now LF AI & Data)
- Source: https://changelog.com/friends/125 — Changelog & Friends #125 “The state of homelab tech (2026)” with Techno Tim (show notes wrote Dockling; it is Docling)
- Date: 2026-09-14
- Learnable slice: parse PDF/Office into a unified `DoclingDocument` with layout, reading order, and table structure, then export Markdown/JSON (a document-understanding pipeline, not a chat wrapper)

- Name: Pangolin
- Platform: Linux (self-hosted control plane + WireGuard site connectors; Cloud also exists)
- Site or repo: https://github.com/fosrl/pangolin · https://docs.pangolin.net/ · https://pangolin.net/
- Paid: Community Edition free open source (AGPL-3.0); Enterprise source-available (free for personal/hobby and annual revenue <$100K); Pangolin Cloud hosted separately
- Source: https://selfhosted.show/142 · https://notes.jupiterbroadcasting.com/self-hosted/2025/episode-142/ — Self-Hosted #142 “Cloud Your Judgment” (Alex deploys Pangolin)
- Date: 2026-09-14
- Learnable slice: userspace WireGuard tunnel (Newt) + Traefik/Badger identity-aware reverse proxy; expose intranet HTTP/SSH/RDP by resource instead of a whole-network VPN

- Name: ConvertX
- Platform: Linux (Docker self-hosted web)
- Site or repo: https://github.com/C4illin/ConvertX
- Paid: free open source (AGPL-3.0)
- Source: https://www.jupiterbroadcasting.com/show/self-hosted/149/ — Self-Hosted #149 “Notify Thyself” show notes
- Date: 2026-09-14
- Learnable slice: one Web UI that orchestrates Inkscape / libvips / Calibre / LibreOffice / Pandoc and similar CLIs into a multi-format conversion gateway (counterpart to web converter sites; wider format surface than Stirling-PDF)

### 2026-09-21 · source 4 (regional curation: ruanyf weekly / new F-Droid; plus a short mobile-tools sweep)

- Name: Gander
- Platform: Android 8+
- Site or repo: https://github.com/mokshablr/gander · https://arjun.maniyani.com/gander/
- Paid: free open source (MIT)
- Source: https://github.com/ruanyf/weekly/blob/master/docs/issue-407.md — Ruanyifeng Weekly #407
- Date: 2026-09-21
- Learnable slice: zero `INTERNET` permission; sandboxed WebView + local pdf.js / docx-preview / SheetJS / PPTXjs to render documents offline; open zip entries without writing them to disk

- Name: Network Scanner (WiFi & IP)
- Platform: Android 8+
- Site or repo: https://github.com/usamaiqb/network-scanner · https://f-droid.org/packages/com.networkscanner.app/
- Paid: free open source (GPL-3.0); F-Droid / Play same signature
- Source: this week’s mobile-tools sweep · F-Droid Connectivity (fdroiddata MR !33497, 2026-08/09)
- Date: 2026-09-21
- Learnable slice: parallel ping + TCP fallback when ICMP fails; mDNS / SSDP / NetBIOS; honest handling of Android 10+ ARP/MAC limits and Android 16+ `NEARBY_WIFI_DEVICES` local-network permission

- Name: De1984
- Platform: Android 8+
- Site or repo: https://github.com/dorumrr/de1984 · https://f-droid.org/packages/io.github.dorumrr.de1984/
- Paid: free open source (MIT)
- Source: this week’s mobile-tools sweep · F-Droid (builds active through 2.7.x)
- Date: 2026-09-21
- Learnable slice: pick a firewall backend by capability — iptables (root/Shizuku), ConnectivityManager (A13+ Shizuku), VpnService fallback; per-app Wi‑Fi / mobile / roaming; optional Shizuku package management

### 2026-09-28 · source 5 (X toolbox / setup threads + awesome-list diff; plus a short mobile-tools sweep)

- Name: MoonProxy (月神代理)
- Platform: Windows / macOS (desktop)
- Site or repo: https://moonproxy.app/ · https://github.com/MoonProxyHQ/moonproxy-desktop
- Paid: free open source (MIT)
- Source: https://github.com/0PandaDEV/awesome-windows/pull/208 — awesome-windows Networking (merged 2026-09-02)
- Date: 2026-09-28
- Learnable slice: Tauri v2 sidecar wrapping frpc; visual TCP/UDP/HTTP(S) proxy rules + four connection states; endpoint health polling and atomic self-update from upstream frpc Releases (lifecycle/UI, not a protocol fork)

- Name: DroidFRPD
- Platform: Android
- Site or repo: https://github.com/donmor/DroidFRPD · IzzyOnDroid `top.donmor.droidfrpd`
- Paid: free open source (GPL-3.0)
- Source: this week’s mobile-tools sweep · IzzyOnDroid / fdroid rfp #3306 (Android FRP daemon manager)
- Date: 2026-09-28
- Learnable slice: host frpc/frps as Android subprocesses (Go build + optional 16KB page alignment); SAF for configs, boot start, and battery exemptions; compare with desktop MoonProxy for always-on reverse-tunnel UX on a phone

- Name: Universal Installer
- Platform: Android (Phone / TV / Wear OS)
- Site or repo: https://github.com/pass-with-high-score/universal-installer · https://f-droid.org/packages/app.pwhs.universalinstaller/
- Paid: free open source (GPL-3.0)
- Source: this week’s mobile-tools sweep · https://github.com/offa/android-foss/commit/60de1503cce8c631e2fd291b6cdd2e74bb6bc126 (android-foss #759, 2026-09-26)
- Date: 2026-09-28
- Learnable slice: multi-backend silent install/uninstall (system / Shizuku / Root); `.apks`/`.xapk`/`.apkm` splits and OBB; built-in LAN HTTP send/receive + TV QR pairing (sideload toolchain, not an LLM wrapper)

### 2026-10-11 · OKA Apps (okaapps.com vendor sweep)

Developer: ChengHao Wu (Nanjing; Mac App Store seller name 成浩 吴). An App Store account named “OKA” (id1670124785) that only ships OKA Life is probably a different vendor and is not counted. Platform: macOS-first; some titles have iOS/iPadOS/tvOS. **No Android or Windows.** All 26 are closed-source. Column: **Free closed-source**. “Free download + IAP/subscription” is marked only as a form, not a price, unless the App Store page stated an amount. Product URL shape: `https://okaapps.com/product/<App Store ID>`. Keep those URLs exact. Do not invent prices.

#### Network / screen mirroring

| Name | Site | Platform | Form | Notes |
|---|---|---|---|---|
| WiFi Speed Test | https://okaapps.com/product/1455463454 | macOS | free closed-source | Wi‑Fi speed test. Site calls it free; IAP not verified |
| iWifi - SpeedTest & Signal Test | https://okaapps.com/ (listed on the homepage; no independent product page) | macOS / iOS | free closed-source | Speed test + Wi‑Fi signal-strength test. Pricing not verified |
| Oka Mirror for Samsung TV | https://okaapps.com/product/1499584783 | macOS | free closed-source | Mirror a Mac to Samsung/LG/Sony TVs (DLNA-class). Site calls it free; IAP not verified |
| Oka Mirror for Chromecast | https://okaapps.com/product/1512564265 | macOS | free closed-source | Mirror a Mac to Chromecast. Site calls it free; IAP not verified |
| Oka Mirror for Roku | https://okaapps.com/product/1519399703 | macOS | free closed-source | Mirror a Mac to Roku. Site calls it free; IAP not verified |
| Oka Mirror for any device | https://okaapps.com/product/1523794932 | macOS | free closed-source | Low-latency Mac screen in a web browser on any device. Site calls it free; IAP not verified |

#### System / files

| Name | Site | Platform | Form | Notes |
|---|---|---|---|---|
| Oka Unarchiver | https://okaapps.com/product/1441507725 | macOS 10.13+ | free closed-source + IAP | Unpack 7z/RAR/ZIP/ISO and similar; pack ZIP. App Store IAP: lifetime VIP $7.99, monthly $1.99, yearly $4.99 |
| Omi NTFS Disk Pro | https://okaapps.com/product/1580856488 | macOS | free closed-source | Read/write NTFS disks on a Mac. Site calls it free; IAP not verified |
| X-Disk | https://okaapps.com/product/1461463493 | macOS | free closed-source | USB / external-disk monitor and eject. Pricing not verified |
| File Zip and Encryptor | https://okaapps.com/product/1467156679 | macOS | free closed-source | Encrypt/decrypt files and pack archives. Site calls it free |
| F-Vault | https://okaapps.com/product/1420002626 | macOS | free closed-source | Hide private files / photos / videos. Pricing not verified |
| Color Folder Master | https://okaapps.com/product/1450345160 | macOS | free closed-source | One-click folder color. Pricing not verified |
| WindoWizard | https://okaapps.com/product/0000000001 | macOS | free closed-source | Window management / tiling. Product ID on the site is a placeholder; may not be on the App Store. Site calls it free |

#### Productivity / browser helpers

| Name | Site | Platform | Form | Notes |
|---|---|---|---|---|
| uPaste | https://okaapps.com/product/1503649026 | macOS | free closed-source | Clipboard history. Site calls it free; IAP not verified |
| Oka To Do | https://okaapps.com/product/1521634562mac | iOS / iPadOS / macOS / visionOS | free closed-source + IAP | Todos + reminders, iCloud sync. App Store IAP: Pro 1 year $9.99, 1 month $2.99 |
| goBrowser | https://okaapps.com/product/1556461417 | macOS | free closed-source | Pick which browser opens a link. Pricing not verified |
| i-Picker - open with browsers | https://okaapps.com/ (listed on the homepage; no independent product page) | macOS | free closed-source | Same class of browser picker. Pricing not verified |
| Aye — Delegate Browser Work | https://okaapps.com/product/6760281977 | macOS (inferred) | free closed-source | AI-delegated browser tasks (new). Pricing not verified |

#### Media

| Name | Site | Platform | Form | Notes |
|---|---|---|---|---|
| VidHub | https://okaapps.com/product/1659622164 | iOS / macOS / tvOS | free closed-source | Video library and player (NAS / cloud-drive-class sources). Pricing not verified |
| OmniPlayer | https://okaapps.com/product/1470926410 | macOS / iOS | free closed-source | Full-format player including MKV. Site calls it free; IAP not verified |
| OmniConverter | https://okaapps.com/product/1536071582 | macOS | free closed-source | Audio/video format conversion. Site calls it free |
| Video Converter X2 | https://okaapps.com/ (listed on the homepage; no independent product page) | macOS | free closed-source | Video conversion. Pricing not verified |
| Fig Player | https://okaapps.com/ (listed on the homepage; no independent product page) | macOS | free closed-source | Video player. Pricing not verified |
| Omi Screen Recorder | https://okaapps.com/product/1592987853 | macOS | free closed-source | Screen + camera recording. Site calls it free; IAP not verified |
| xHub | App Store “More by” this developer (no okaapps.com product page) | macOS | free closed-source | Unarchiver + video player in one. Pricing not verified |

#### AI / social

| Name | Site | Platform | Form | Notes |
|---|---|---|---|---|
| Ping AI | https://okaapps.com/product/6445983074 | iOS / macOS | free closed-source | AI chat. Pricing not verified. Flagged as a wrapper, not homework |
| Ainder | https://okaapps.com/ (listed on the homepage; no independent product page) | iOS | free closed-source | Tinder-style “match” with an AI companion. Pricing not verified. Flagged as a wrapper, not homework |
| Yuni: Secret between couples | App Store “More by” this developer (no okaapps.com product page) | iOS | free closed-source | Private space for couples. Pricing not verified |

26 titles (OKA Life from the other developer account is omitted). Open source: none in this vendor set. Paid-upfront SKUs: none. Two apps have stated App Store IAP amounts (Oka Unarchiver, Oka To Do).

### 2026-10-12 · source 7 (Games: itch.io / Flashpoint / prototype; plus a short mobile-tools sweep)

- Name: Isometry
- Platform: Windows / macOS / Linux (isometric RPG framework; campaigns are YAML/JSON)
- Site or repo: https://dark-mode-games.itch.io/isometry · docs https://darkmodegames.github.io/guide/ · https://darkmodegames.github.io/manual/
- Paid: free (itch open beta is downloadable; donations welcome)
- Source: https://dark-mode-games.itch.io/isometry — itch.io indie framework / prototype (not a Steam bestseller)
- Date: 2026-10-12
- Learnable slice: one executable loads data-only campaigns; skills / dice / terrain / CLI multiplayer are all configured in YAML/JSON — study a data-driven content pipeline instead of wrapping another engine

- Name: Flashpoint Web
- Platform: self-hosted Web (Docker; talks to a local Flashpoint Archive)
- Site or repo: https://github.com/darkraise/flashpoint-web · Demo https://flash.quangtc.dev
- Paid: free open source (GPL-3.0)
- Source: https://github.com/darkraise/flashpoint-web — Flashpoint-ecosystem self-hosted browser shell (this week’s Games line)
- Date: 2026-10-12
- Learnable slice: Ruffle for Flash + native HTML5; multi-user permissions, play stats, playlists — turn a local Flashpoint library into a remotely browsable web directory

- Name: Haven (Haven SSH Client)
- Platform: Android 8+
- Site or repo: https://github.com/GlassHaven/Haven · https://glasshaven.github.io/Haven/ · F-Droid `sh.haven.app`
- Paid: free open source (AGPL-3.0)
- Source: this week’s mobile-tools sweep · F-Droid Connectivity / SSH (F-Droid listed a 2026-10-08 build 5.89.20; GitHub Releases through v5.89.25)
- Date: 2026-10-12
- Learnable slice: one app chains SSH/Mosh/ET + VNC/RDP/SPICE + on-device labwc Wayland desktop (PRoot) + SFTP/SMB/rclone + USB/BLE serial bridge; WireGuard/Tailscale per connection without taking the device VPN slot — compare with RustDesk / Termius for “phone as a thin client”

- Name: REA (Reverse Engineer Anything)
- Platform: Linux / macOS / Windows (Node CLI / MCP; analysis runs locally)
- Site or repo: https://github.com/morluto/rea · https://rea.tools/ · npm `rea-agents`
- Paid: free open source (MIT)
- Source: https://github.com/morluto/rea — MCP + CLI for coding agents (harvest 2026-10-12)
- Date: 2026-10-12
- Learnable slice: recover how a feature is implemented when you have no source — native binaries (Hopper / Ghidra / IDA), Go, WASM, EVM, JS/Electron, sites, HAR, .NET, Android APK (JADX) and a device (adb), firmware, Linux crash records, process behavior — and attach evidence. Needs Node.js 22.19+ / 24.11+ / 26+; `npx rea-agents setup`. Authorized reverse-engineering research only.

Stars below as of 2026-10-12 GitHub API. “Similar” means one image or text in, a usable 3D asset out (mesh / Gaussian splat / explorable scene). Do not invent prices. Catalog: [06-media](/catalog/06-media/README) §6.7.

- Name: image-blaster
- Platform: TypeScript (React viewer); runs through Claude Code in a terminal. Output imports into Unity/Unreal/Godot, Blender/Maya, Three.js/Electron
- Site or repo: https://github.com/neilsonnn/image-blaster
- Paid: free open source (MIT). Cloud backends (World Labs, FAL) are paid APIs
- Source: https://github.com/neilsonnn/image-blaster — 11,174 star, 1,113 fork (2026-10-12)
- Date: 2026-10-12
- Learnable slice: a Claude Code skill pack that orchestrates Marble (static environment Gaussian splat `.spz`), Hunyuan3D on FAL (dynamic object meshes `.glb`/`.obj`), and ElevenLabs (environment/object `.mp3`). Repo claims “under 5 minutes.” Study the agent-skill orchestration, not as an Android/Qt library

**Open source (same class)**

| Name | Site or repo | star (2026-10-12) | Paid | Learnable slice |
|---|---|---:|---|---|
| HunyuanWorld-1.0 | https://github.com/Tencent-Hunyuan/HunyuanWorld-1.0 | 2,944 | custom license (Other); local GPU | text/image → explorable 3D world; closest local Marble stand-in |
| Hunyuan3D-2.1 | https://github.com/Tencent-Hunyuan/Hunyuan3D-2.1 | 4,164 | NOASSERTION; local GPU | image → high-fidelity PBR assets; the object-model family image-blaster calls |
| Modly | https://github.com/lightningpixel/modly | 8,139 | NOASSERTION | local desktop GUI, image or prompt → 3D; Qt-shaped reference |
| img2threejs | https://github.com/img2threejs/img2threejs | 17,962 | Apache-2.0 | reconstruct objects as procedural Three.js code, not a mesh |
| Wonder3D | https://github.com/xxlong0/Wonder3D | 5,444 | MIT | single image → 3D (cross-domain diffusion); permissive, offline-capable |
| Stable-Dreamfusion | https://github.com/ashawkey/stable-dreamfusion | 8,870 | Apache-2.0 | text/image → 3D + mesh export (NeRF + diffusion); classic, slow |

**Free closed-source**

| Name | Site | Form | Notes |
|---|---|---|---|
| Tencent Hunyuan 3D (online) | https://3d.hunyuan.tencent.com/sceneTo3D | price not verified | official HunyuanWorld web: image/text → 3D scene; no GPU needed to try it |

**Paid**

| Name | Site | Form | Notes |
|---|---|---|---|
| World Labs Marble | https://marble.worldlabs.ai/ · API https://platform.worldlabs.ai/ | price not verified | image → explorable 3D world (Gaussian splat). image-blaster’s core dependency |
| Meshy | https://www.meshy.ai/pricing | Free 100 credits/month (output CC BY 4.0); Pro 1,000 credits/month (no dollar amount on the page) | text/image → 3D + AI textures; REST API; Blender/Unity plugins |
| fal.ai | https://fal.ai/ | usage-based; specific prices not verified | hosts Hunyuan3D, ElevenLabs, and others. image-blaster’s other cloud dependency |

### 2026-10-17 · Numa (portable Rust DNS resolver)

- Name: Numa
- Platform: Linux / macOS / Windows (single binary; also Docker `ghcr.io/razvandimescu/numa`)
- Site or repo: https://github.com/razvandimescu/numa · https://numa.rs · https://crates.io/crates/numa
- Paid: free open source (MIT)
- Source: https://github.com/razvandimescu/numa — snapshot commit `767ad44`; crates.io / GitHub Release v0.24.1; ~1,597 star (2026-10-17)
- Date: 2026-10-17
- Learnable slice: laptop-first DNS — `.numa` HTTPS reverse proxy, expiring overrides, Hagezi ad-block, split-DNS forwarding, DoH/DoT/ODoH — hand-written Rust parser, one binary. Clash Verge (mihomo) stacking, config snippets, and modding ideas: [catalog/09-network](/catalog/09-network/README) §9.5. Combination configs: **tested on Linux box** / **untested on Windows**. Do not invent prices.

### 2026-10-19 · source 8

Stars as of 2026-10-19 GitHub API. Do not invent prices. Rest of this harvest batch is in catalog §6.8 / §6.9 / §9.2 / §9.6 / §9.7, 01-platform-tools §1.4, 08-divination §8.2, 11-lang-compare GUI binding, and oshw-and-print §4.

- Name: iztro
- Platform: JS/TS (browser / Node)
- Site or repo: https://github.com/SylarLong/iztro · https://iztro.com · npm `iztro`
- Paid: free open source (MIT). A separate paid hosted AI-reading API exists; that layer is not collected
- Source: https://github.com/SylarLong/iztro — 4,234 star (2026-10-19)
- Date: 2026-10-19
- Learnable slice: deterministic Zi Wei Dou Shu charting as structured objects (stars, sihua, palaces, decade/year layers) — the chart engine, not an LLM wrapper

- Name: Tyme (tyme4ts / tyme4j)
- Platform: TypeScript / Java (same API in several languages)
- Site or repo: https://github.com/6tail/tyme4ts · https://github.com/6tail/tyme4j · https://6tail.cn/tyme.html
- Paid: free open source (MIT)
- Source: https://github.com/6tail/tyme4ts — 514 star (2026-10-19)
- Date: 2026-10-19
- Learnable slice: Lunar successor calendric library (Gregorian / lunar / Tibetan / Islamic, stems-and-branches, solar terms) as the substrate under charting

- Name: Sshd4a
- Platform: Android
- Site or repo: https://github.com/tfonteyn/Sshd4a · F-Droid / IzzyOnDroid `com.hardbacknutter.sshd`
- Paid: free open source (GPL-3.0)
- Source: https://github.com/tfonteyn/Sshd4a — 155 star (2026-10-19)
- Date: 2026-10-19
- Learnable slice: Android as SSH **server** (Dropbear + rsync + OpenSSH sftp-server; no root). Pair with Haven as the client

---

## 9. Other classes (seeds)

| Class | Doc |
|---|---|
| Open hardware / 3D print | [oshw-and-print.md](/oshw-and-print) |
| Games / online small games | [games.md](/games) |
| Divination / I Ching / tarot | [divination.md](/divination) |
