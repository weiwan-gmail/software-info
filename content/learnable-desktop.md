# 可学 / 可复刻：桌面应用

核对：2026-08-29 PT。star 是当时 GitHub API 快照。

## 收什么

能拆出一块来学，或能做出能用的子集。大厂也可以，比如 PowerToys、VS Code、Windows Terminal。不收必须靠前沿大模型或海量推荐才能成立的产品（ChatGPT、TikTok 推荐）。闭源但有公开协议或成熟开源对标的，写在「对标」里。

---

## 1. 窗口、启动器、切换

Windows 上微软的 [PowerToys](https://github.com/microsoft/PowerToys)（138,209 star，MIT）就是这一路的官方集成：FancyZones 对标 Rectangle，PowerToys Run 对标 Raycast/Alfred。Mac 没有官方等价物，个人作者把同一类问题拆开做了。

| 仓库 | star | 许可 | 说明 |
|---|---:|---|---|
| [rxhanson/Rectangle](https://github.com/rxhanson/Rectangle) | 29,773 | NOASSERTION | Move and resize windows on macOS with keyboard shortcuts and snap areas |
| [nikitabobko/AeroSpace](https://github.com/nikitabobko/AeroSpace) | 22,742 | MIT | AeroSpace is an i3-like tiling window manager for macOS |
| [asmvik/yabai](https://github.com/asmvik/yabai) | 29,520 | MIT | A tiling window manager for macOS based on binary space partitioning |
| [lwouis/alt-tab-macos](https://github.com/lwouis/alt-tab-macos) | 16,224 | GPL-3.0 | Windows alt-tab on macOS  |
| [microsoft/PowerToys](https://github.com/microsoft/PowerToys) | 138,209 | MIT | Windows productivity utilities 大厂。FancyZones / Run / Awake 都是可单独复刻的小工具。 |

Raycast、Alfred 是闭源启动器。学的是命令面板 + 剪贴板 + 扩展清单，不是去重写整个商店。PowerToys Run 和 `raycast/extensions`（7,715）是公开的扩展面。

2026 年一份 Mac 生产力推荐（[Dockling, 2026](https://dockling.space/blog/best-mac-productivity-apps-2026)）把 Raycast、Rectangle、AltTab、Maccy 列成「每天都在用」的核心，和上面开源名单重合。

---

## 2. 菜单栏、显示器、鼠标

| 仓库 | star | 许可 | 说明 |
|---|---:|---|---|
| [exelban/stats](https://github.com/exelban/stats) | 41,509 | MIT | macOS system monitor in your menu bar |
| [MonitorControl/MonitorControl](https://github.com/MonitorControl/MonitorControl) | 34,062 | MIT | 🖥 Control your display's brightness & volume on your Mac as if it was a native Apple Display. Use Apple Keyboard keys or custom shortcuts. Shows the native macOS OSDs. |
| [dwarvesf/hidden](https://github.com/dwarvesf/hidden) | 14,640 | MIT | An ultra-light MacOS utility that helps hide menu bar icons |
| [jordanbaird/Ice](https://github.com/jordanbaird/Ice) | 29,442 | GPL-3.0 | Powerful menu bar manager for macOS |
| [Caldis/Mos](https://github.com/Caldis/Mos) | 21,284 | NOASSERTION | 一个用于在 macOS 上平滑你的鼠标滚动效果或单独设置滚动方向的小工具, 让你的滚轮爽如触控板  \|  A lightweight tool used to smooth scrolling and set scroll direction independently for your mouse on macOS |
| [linearmouse/linearmouse](https://github.com/linearmouse/linearmouse) | 6,754 | MIT | The mouse and trackpad utility for Mac. |
| [FelixKratz/SketchyBar](https://github.com/FelixKratz/SketchyBar) | 12,293 | GPL-3.0 | A highly customizable macOS status bar replacement |

这一类最适合练：全局快捷键、菜单栏常驻、Accessibility / HID、一份设置面板。Bartender 是闭源收费；Hidden / Ice 是开源对标。

---

## 3. 剪贴板、截图、录屏

| 仓库 | star | 许可 | 说明 |
|---|---:|---|---|
| [p0deje/Maccy](https://github.com/p0deje/Maccy) | 21,378 | MIT | Lightweight clipboard manager for macOS |
| [ShareX/ShareX](https://github.com/ShareX/ShareX) | 39,374 | GPL-3.0 | ShareX is a free and open-source application that enables users to capture or record any area of their screen with a single keystroke. It also supports uploading images, text, and various file types to a wide range of destinations. |
| [obsproject/obs-studio](https://github.com/obsproject/obs-studio) | 75,601 | GPL-2.0 | OBS Studio - Free and open source software for live streaming and screen recording |
| [lihaoyun6/QuickRecorder](https://github.com/lihaoyun6/QuickRecorder) | 8,622 | AGPL-3.0 | A lightweight screen recorder based on ScreenCapture Kit for macOS / 基于 ScreenCapture Kit 的轻量化多功能 macOS 录屏工具 |
| [sindresorhus/Gifski](https://github.com/sindresorhus/Gifski) | 8,541 | MIT | 🌈 Convert videos to high-quality GIFs on your Mac |

CleanShot X 是闭源一次买断（Dockling 文里标 $29）。学截图流水线用 ShareX（Windows）或系统 API + 标注层。OBS 大，但「采集 → 编码 → 推流/录像」可以按模块读。

---

## 4. 文件同步、局域网发送

对标 AirDrop / Dropbox，不必做云盘帝国。

| 仓库 | star | 许可 | 说明 |
|---|---:|---|---|
| [localsend/localsend](https://github.com/localsend/localsend) | 89,691 | Apache-2.0 | An open-source cross-platform alternative to AirDrop |
| [syncthing/syncthing](https://github.com/syncthing/syncthing) | 88,114 | MPL-2.0 | Open Source Continuous File Synchronization |
| [immich-app/immich](https://github.com/immich-app/immich) | 112,940 | AGPL-3.0 | High performance self-hosted photo and video management solution. 对标 Google Photos。自托管，体量已经不小，适合读架构不是周末抄完。 |

---

## 5. 播放器、编辑器、终端

| 仓库 | star | 许可 | 说明 |
|---|---:|---|---|
| [iina/iina](https://github.com/iina/iina) | 46,135 | GPL-3.0 | The modern video player for macOS. |
| [coteditor/CotEditor](https://github.com/coteditor/CotEditor) | 8,428 | NOASSERTION | Lightweight Plain Text Editor for macOS |
| [alacritty/alacritty](https://github.com/alacritty/alacritty) | 65,555 | Apache-2.0 | A cross-platform, OpenGL terminal emulator. |
| [wezterm/wezterm](https://github.com/wezterm/wezterm) | 28,628 | NOASSERTION | A GPU-accelerated cross-platform terminal emulator and multiplexer written by @wez and implemented in Rust |
| [ghostty-org/ghostty](https://github.com/ghostty-org/ghostty) | 60,440 | MIT | 👻 Ghostty is a fast, feature-rich, and cross-platform terminal emulator that uses platform-native UI and GPU acceleration. |
| [microsoft/terminal](https://github.com/microsoft/terminal) | 104,735 | MIT | Windows Terminal 大厂，开源。学 PTY、GPU 文本、配置热重载。 |
| [microsoft/vscode](https://github.com/microsoft/vscode) | 190,040 | MIT | Visual Studio Code 大厂，开源。学扩展主机 / 语言服务器，不要试图整仓复刻。 |
| [helix-editor/helix](https://github.com/helix-editor/helix) | 46,002 | MPL-2.0 | A post-modern modal text editor. |
| [zed-industries/zed](https://github.com/zed-industries/zed) | 89,438 | NOASSERTION | Code at the speed of thought – Zed is a high-performance, multiplayer code editor from the creators of Atom and Tree-sitter. 商业公司，但编辑器内核开源，学协作和渲染，不学销售。 |

---

## 6. 密码、笔记、闪卡、账本

| 仓库 | star | 许可 | 说明 |
|---|---:|---|---|
| [keepassxreboot/keepassxc](https://github.com/keepassxreboot/keepassxc) | 28,601 | NOASSERTION | KeePassXC is a cross-platform community-driven port of the Windows application “KeePass Password Safe”. |
| [bitwarden/clients](https://github.com/bitwarden/clients) | 13,700 | NOASSERTION | Bitwarden client apps (web, browser extension, desktop, and cli). 公司产品，客户端开源。学的是保险库格式和同步，不是运营。 |
| [ankitects/anki](https://github.com/ankitects/anki) | 30,124 | NOASSERTION | Anki is a smart spaced repetition flashcard program |
| [laurent22/joplin](https://github.com/laurent22/joplin) | 56,156 | NOASSERTION | Joplin - the privacy-focused note taking app with sync capabilities for Windows, macOS, Linux, Android and iOS. |
| [logseq/logseq](https://github.com/logseq/logseq) | 44,681 | AGPL-3.0 | A privacy-first, open-source platform for knowledge management and collaboration. Download link:  http://github.com/logseq/logseq/releases. roadmap: https://logseq.io/p/NX4mc_ggEV |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) | 46,039 | AGPL-3.0 | An open-source, privacy-first, self-hosted knowledge workspace where humans and AI agents work together 开源、隐私优先、自托管的知识工作空间，让人与智能体在此协作 |
| [TriliumNext/Trilium](https://github.com/TriliumNext/Trilium) | 37,632 | AGPL-3.0 | Build your personal knowledge base with Trilium Notes |
| [actualbudget/actual](https://github.com/actualbudget/actual) | 28,451 | MIT | A local-first personal finance app |
| [firefly-iii/firefly-iii](https://github.com/firefly-iii/firefly-iii) | 24,454 | AGPL-3.0 | Firefly III: a personal finances manager |
| [maybe-finance/maybe](https://github.com/maybe-finance/maybe) | 54,316 | AGPL-3.0 | The personal finance app for everyone |

Obsidian 本体闭源，仓库 `obsidianmd/obsidian-releases` 只是发行和插件目录。学本地 Markdown + 插件 hook，实现走 Joplin / Logseq / SiYuan。

---

## 7. 一张「大厂产品 → 可学切片」

| 大厂 / 闭源 | 可学的一块 | 开源落点 |
|---|---|---|
| Dropbox / iCloud Drive | 文件夹同步、冲突、忽略规则 | Syncthing |
| AirDrop | 局域网发现 + 直传 | LocalSend |
| Google Photos | 人脸/时间线相册（自托管） | Immich |
| 1Password | 保险库、自动填充 | KeePassXC / Bitwarden |
| Alfred / Spotlight | 启动器 + 剪贴板 | PowerToys Run、Raycast 扩展模型 |
| Magnet | 窗口半屏/三分 | Rectangle、FancyZones |
| Bartender | 菜单栏收纳 | Hidden、Ice |
| CleanShot | 截图标注上传 | ShareX |
| Chrome | 别复刻浏览器 | 终端/播放器更合适当练习 |
| Notion | 块编辑 + 本地库 | Joplin / AFFiNE / AppFlowy（见网站篇） |

PowerToys 本身就是微软把「一堆可复刻小工具」捆在一起的例子，比去拆 Office 有用。

---

## 8. Windows 经典（你点名的）

详细出处和持续收集办法见 [tools-by-platform.md](file:///workspace/tools-by-platform.md)。

| 名字 | 地址 | 收费 |
|---|---|---|
| Total Commander | https://www.ghisler.com/ | 共享软件。开源对标 Double Commander |
| Sysinternals Suite | https://learn.microsoft.com/en-us/sysinternals/downloads/sysinternals-suite | 免费。2026-08-19 仍在更新 |
| DiskGenius | https://www.diskgenius.com/ | 免费 + 专业版 |
| Rufus | https://github.com/pbatard/rufus | 免费，GPL-3.0 |
| Snipaste | https://www.snipaste.com/ | 免费 + 专业版 |
| Quicker | https://getquicker.net/ | 免费 + 专业版 |
