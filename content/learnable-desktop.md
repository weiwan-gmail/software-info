# Learnable / clone-worthy: desktop apps

Checked: 2026-08-29 PT. Stars are a GitHub API snapshot from that moment.

## What goes in

Something you can peel off and study, or a usable subset you can build. Big-company products are fine: PowerToys, VS Code, Windows Terminal. Skip products that only work if you have a frontier model or a massive recommender (ChatGPT, TikTok feed). Closed-source items with a public protocol or a mature open-source counterpart go in the “counterpart” column.

---

## 1. Window managers, launchers, switching

On Windows, Microsoft’s [PowerToys](https://github.com/microsoft/PowerToys) (138,209 star, MIT) is the official bundle of this class: FancyZones stands in for Rectangle, PowerToys Run for Raycast/Alfred. Mac has no official equivalent. Individual authors split the same problems apart.

| Repo | star | License | Notes |
|---|---:|---|---|
| [rxhanson/Rectangle](https://github.com/rxhanson/Rectangle) | 29,773 | NOASSERTION | Move and resize windows on macOS with keyboard shortcuts and snap areas |
| [nikitabobko/AeroSpace](https://github.com/nikitabobko/AeroSpace) | 22,742 | MIT | AeroSpace is an i3-like tiling window manager for macOS |
| [asmvik/yabai](https://github.com/asmvik/yabai) | 29,520 | MIT | A tiling window manager for macOS based on binary space partitioning |
| [lwouis/alt-tab-macos](https://github.com/lwouis/alt-tab-macos) | 16,224 | GPL-3.0 | Windows alt-tab on macOS  |
| [microsoft/PowerToys](https://github.com/microsoft/PowerToys) | 138,209 | MIT | Windows productivity utilities. Big company. FancyZones / Run / Awake are each a small tool you can clone on its own. |

Raycast and Alfred are closed-source launchers. Study the command palette + clipboard + extension list. Do not rewrite the whole store. PowerToys Run and `raycast/extensions` (7,715) are the public extension surface.

A 2026 Mac productivity roundup ([Dockling, 2026](https://dockling.space/blog/best-mac-productivity-apps-2026)) lists Raycast, Rectangle, AltTab, and Maccy as daily drivers. That overlaps the open-source list above.

---

## 2. Menu bar, displays, mice

| Repo | star | License | Notes |
|---|---:|---|---|
| [exelban/stats](https://github.com/exelban/stats) | 41,509 | MIT | macOS system monitor in your menu bar |
| [MonitorControl/MonitorControl](https://github.com/MonitorControl/MonitorControl) | 34,062 | MIT | 🖥 Control your display's brightness & volume on your Mac as if it was a native Apple Display. Use Apple Keyboard keys or custom shortcuts. Shows the native macOS OSDs. |
| [dwarvesf/hidden](https://github.com/dwarvesf/hidden) | 14,640 | MIT | An ultra-light MacOS utility that helps hide menu bar icons |
| [jordanbaird/Ice](https://github.com/jordanbaird/Ice) | 29,442 | GPL-3.0 | Powerful menu bar manager for macOS |
| [Caldis/Mos](https://github.com/Caldis/Mos) | 21,284 | NOASSERTION | A lightweight tool used to smooth scrolling and set scroll direction independently for your mouse on macOS |
| [linearmouse/linearmouse](https://github.com/linearmouse/linearmouse) | 6,754 | MIT | The mouse and trackpad utility for Mac. |
| [FelixKratz/SketchyBar](https://github.com/FelixKratz/SketchyBar) | 12,293 | GPL-3.0 | A highly customizable macOS status bar replacement |

This class is the best practice set: global hotkeys, a resident menu-bar item, Accessibility / HID, and one settings panel. Bartender is closed-source paid. Hidden / Ice are the open-source counterparts.

---

## 3. Clipboard, screenshots, recording

| Repo | star | License | Notes |
|---|---:|---|---|
| [p0deje/Maccy](https://github.com/p0deje/Maccy) | 21,378 | MIT | Lightweight clipboard manager for macOS |
| [ShareX/ShareX](https://github.com/ShareX/ShareX) | 39,374 | GPL-3.0 | ShareX is a free and open-source application that enables users to capture or record any area of their screen with a single keystroke. It also supports uploading images, text, and various file types to a wide range of destinations. |
| [obsproject/obs-studio](https://github.com/obsproject/obs-studio) | 75,601 | GPL-2.0 | OBS Studio - Free and open source software for live streaming and screen recording |
| [lihaoyun6/QuickRecorder](https://github.com/lihaoyun6/QuickRecorder) | 8,622 | AGPL-3.0 | A lightweight screen recorder based on ScreenCapture Kit for macOS |
| [sindresorhus/Gifski](https://github.com/sindresorhus/Gifski) | 8,541 | MIT | 🌈 Convert videos to high-quality GIFs on your Mac |

CleanShot X is closed-source buyout (Dockling’s piece marked $29). Study the capture pipeline with ShareX (Windows) or the system API plus an annotation layer. OBS is large, but “capture → encode → stream/record” can be read module by module.

---

## 4. File sync, LAN send

Counterpart to AirDrop / Dropbox. You do not need to build a cloud-drive empire.

| Repo | star | License | Notes |
|---|---:|---|---|
| [localsend/localsend](https://github.com/localsend/localsend) | 89,691 | Apache-2.0 | An open-source cross-platform alternative to AirDrop |
| [syncthing/syncthing](https://github.com/syncthing/syncthing) | 88,114 | MPL-2.0 | Open Source Continuous File Synchronization |
| [immich-app/immich](https://github.com/immich-app/immich) | 112,940 | AGPL-3.0 | High performance self-hosted photo and video management solution. Counterpart to Google Photos. Self-hosted, already large. Read the architecture. Do not try to copy it in a weekend. |

---

## 5. Players, editors, terminals

| Repo | star | License | Notes |
|---|---:|---|---|
| [iina/iina](https://github.com/iina/iina) | 46,135 | GPL-3.0 | The modern video player for macOS. |
| [coteditor/CotEditor](https://github.com/coteditor/CotEditor) | 8,428 | NOASSERTION | Lightweight Plain Text Editor for macOS |
| [alacritty/alacritty](https://github.com/alacritty/alacritty) | 65,555 | Apache-2.0 | A cross-platform, OpenGL terminal emulator. |
| [wezterm/wezterm](https://github.com/wezterm/wezterm) | 28,628 | NOASSERTION | A GPU-accelerated cross-platform terminal emulator and multiplexer written by @wez and implemented in Rust |
| [ghostty-org/ghostty](https://github.com/ghostty-org/ghostty) | 60,440 | MIT | 👻 Ghostty is a fast, feature-rich, and cross-platform terminal emulator that uses platform-native UI and GPU acceleration. |
| [microsoft/terminal](https://github.com/microsoft/terminal) | 104,735 | MIT | Windows Terminal. Big company, open source. Study PTY, GPU text, hot-reloaded config. |
| [microsoft/vscode](https://github.com/microsoft/vscode) | 190,040 | MIT | Visual Studio Code. Big company, open source. Study the extension host / language server. Do not try to clone the whole repo. |
| [helix-editor/helix](https://github.com/helix-editor/helix) | 46,002 | MPL-2.0 | A post-modern modal text editor. |
| [zed-industries/zed](https://github.com/zed-industries/zed) | 89,438 | NOASSERTION | Code at the speed of thought – Zed is a high-performance, multiplayer code editor from the creators of Atom and Tree-sitter. Commercial company, but the editor core is open source. Study collaboration and rendering, not sales. |

---

## 6. Passwords, notes, flashcards, ledgers

| Repo | star | License | Notes |
|---|---:|---|---|
| [keepassxreboot/keepassxc](https://github.com/keepassxreboot/keepassxc) | 28,601 | NOASSERTION | KeePassXC is a cross-platform community-driven port of the Windows application “KeePass Password Safe”. |
| [bitwarden/clients](https://github.com/bitwarden/clients) | 13,700 | NOASSERTION | Bitwarden client apps (web, browser extension, desktop, and cli). Company product, clients open source. Study the vault format and sync, not operations. |
| [ankitects/anki](https://github.com/ankitects/anki) | 30,124 | NOASSERTION | Anki is a smart spaced repetition flashcard program |
| [laurent22/joplin](https://github.com/laurent22/joplin) | 56,156 | NOASSERTION | Joplin - the privacy-focused note taking app with sync capabilities for Windows, macOS, Linux, Android and iOS. |
| [logseq/logseq](https://github.com/logseq/logseq) | 44,681 | AGPL-3.0 | A privacy-first, open-source platform for knowledge management and collaboration. Download link:  http://github.com/logseq/logseq/releases. roadmap: https://logseq.io/p/NX4mc_ggEV |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) | 46,039 | AGPL-3.0 | An open-source, privacy-first, self-hosted knowledge workspace where humans and AI agents work together |
| [TriliumNext/Trilium](https://github.com/TriliumNext/Trilium) | 37,632 | AGPL-3.0 | Build your personal knowledge base with Trilium Notes |
| [actualbudget/actual](https://github.com/actualbudget/actual) | 28,451 | MIT | A local-first personal finance app |
| [firefly-iii/firefly-iii](https://github.com/firefly-iii/firefly-iii) | 24,454 | AGPL-3.0 | Firefly III: a personal finances manager |
| [maybe-finance/maybe](https://github.com/maybe-finance/maybe) | 54,316 | AGPL-3.0 | The personal finance app for everyone |

Obsidian itself is closed-source. The repo `obsidianmd/obsidian-releases` is only releases and the plugin directory. Study local Markdown + plugin hooks. Implement via Joplin / Logseq / SiYuan.

---

## 7. One “incumbent → learnable slice” table

| Incumbent / closed-source | Learnable slice | Open-source landing |
|---|---|---|
| Dropbox / iCloud Drive | folder sync, conflicts, ignore rules | Syncthing |
| AirDrop | LAN discovery + direct transfer | LocalSend |
| Google Photos | faces / timeline album (self-hosted) | Immich |
| 1Password | vault, autofill | KeePassXC / Bitwarden |
| Alfred / Spotlight | launcher + clipboard | PowerToys Run, Raycast extension model |
| Magnet | half-screen / thirds | Rectangle, FancyZones |
| Bartender | menu-bar tidy | Hidden, Ice |
| CleanShot | capture, annotate, upload | ShareX |
| Chrome | do not clone a browser | terminals / players are better practice |
| Notion | block editor + local store | Joplin / AFFiNE / AppFlowy (see the web page) |

PowerToys itself is Microsoft bundling “a pile of clone-worthy small tools.” More useful than taking Office apart.

---

## 8. Windows classics (the ones you named)

Sources and how to keep collecting are in [tools-by-platform.md](/tools-by-platform).

| Name | URL | Paid |
|---|---|---|
| Total Commander | https://www.ghisler.com/ | shareware. Open-source counterpart: Double Commander |
| Sysinternals Suite | https://learn.microsoft.com/en-us/sysinternals/downloads/sysinternals-suite | free. Still updating as of 2026-08-19 |
| DiskGenius | https://www.diskgenius.com/ | free + Pro |
| Rufus | https://github.com/pbatard/rufus | free, GPL-3.0 |
| Snipaste | https://www.snipaste.com/ | free + Pro |
| Quicker | https://getquicker.net/ | free + Pro |
