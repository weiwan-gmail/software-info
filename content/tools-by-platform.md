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

Watch often: Rectangle, AeroSpace, Maccy, AltTab, IINA, LocalSend, Raycast (closed-source), Snipaste (has Mac), Stats, Hidden / Ice. Also watch RansomWhere? (Objective-See).

List: [awesome-mac](https://github.com/jaywcjlove/awesome-mac). Install: Homebrew cask.

---

## 4. Linux

List: [Awesome-Linux-Software](https://github.com/luong-komorebi/Awesome-Linux-Software). Dual-pane files: Double Commander, Midnight Commander. Screenshots: Flameshot, Spectacle. Launchers: rofi, Albert. Some Sysinternals tools have Linux ports (Microsoft was still updating them in 2026).

---

## 5. Android

List leans libraries: [awesome-android](https://github.com/JStumpp/awesome-android). Installable apps: [android-foss](https://github.com/offa/android-foss), F-Droid.

Desktop counterparts that also exist here: LocalSend, AnkiDroid, Syncthing, KeePass-compatible clients, Quicker Android. Paid-chart homework is in [learnable-mobile.md](/learnable-mobile) (AnkiMobile, Paprika, Streaks).

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

---

## 9. Other classes (seeds)

| Class | Doc |
|---|---|
| Open hardware / 3D print | [oshw-and-print.md](/oshw-and-print) |
| Games / online small games | [games.md](/games) |
| Divination / I Ching / tarot | [divination.md](/divination) |
