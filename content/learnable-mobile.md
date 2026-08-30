# 可学 / 可复刻：手机应用

核对：2026-08-29 PT。商店名次来自公开榜单，不是自己估的。

## 收什么

同一条：能学一块或做出子集。大厂 App 可以进，但只写可拆的功能（验证器、闪卡、剪辑管线），不写必须靠大模型或推荐广告才能活的产品。

美区付费榜（[MSY，更新 2026-08-30](https://m-s-y.com/en/app/ranking/top-paid-all-categories/)）里，真正能当作业的大多不是游戏。免费榜头部是 ChatGPT / TikTok / 短剧，那些不进本表。

---

## 1. 付费榜上、能当作业的

来源：US App Store Top Paid，MSY 2026-08-30。

| 榜 | 应用 | 收费 | 为什么能学 |
|---:|---|---|---|
| 10 | AnkiMobile Flashcards | 买断 | 桌面端 [ankitects/anki](https://github.com/ankitects/anki)（30,124 star）开源。SRS 算法、牌组同步、卡片模板是完整作业。手机端是付费壳。 |
| 13 | Procreate Pocket | 买断 | 画板 + 压感 + 图层。商业闭源。学的是 Metal/OpenGL 画布，不是复刻整套笔刷市场。 |
| 18 | SkyView | 买断 | 传感器 + 星图。公开星表，AR 姿态是可练的。 |
| 19 | TonalEnergy Tuner & Metronome | 买断 | 音高检测 + 节拍器。DSP 作业，跟你的 osc-sim 一条线。 |
| 32 | Paprika Recipe Manager 3 | 买断 | 本地库 + 抓网页配方。经典 CRUD，没有云帝国。 |
| 51 | AutoSleep | 买断 | 手表睡眠，本地、宣传无订阅。学 HealthKit 读写，不是做硬件。 |
| 52 | Things 3 | 买断 | 漂亮的 GTD。学数据模型和快捷键，开源对标是 Reminders / 任何 todo。 |
| 62 | Goblin Tools | 买断 | 把糊任务拆步骤。有的功能会叫模型，但产品形态是「小工具箱」，可以做成纯规则版。 |
| 67 | Streaks | 买断 | 习惯打卡。状态机很小。 |
| 69 | PhotoPills | 买断 | 日月位置规划。天文计算公开，UI 是产品。 |
| 70 | Threema | 买断 | 瑞士付费即时通讯。学的是 E2E 和「先付费再用户」而不是协议细节去重现一套。 |
| 78 | Wipr 2 | 买断 | 系统级内容拦截。Safari 扩展模型可学；别做成恶意过滤器。 |

付费榜 #3 是 Shadowrocket（网络规则客户端）。只把它当成「规则列表 + 本地代理 UI」这类产品存在过，不在这里写怎么做翻墙，也不写配置步骤。

付费榜大量是游戏（Minecraft、Balatro、Mini Metro #60、Papers, Please #96）。游戏能学的是循环和关卡，不是本表重点。

---

## 2. 大厂 App 里可拆的一块

| 大厂 App | 可学的一块 | 不要学 / 不要复刻 |
|---|---|---|
| Google / Microsoft Authenticator | TOTP（RFC 6238）、备份导出 | 账号体系、风控 |
| CapCut | 时间线、模板、字幕、ffmpeg 导出 | 推荐、素材商城、账号 |
| Duolingo | 间隔重复、连对节奏 | 课程生产和增长 |
| Canva（AppBrain 美区免费榜也能看到） | 模板 + 图层画布 | 素材版权和增长 |
| Life360 | 家庭位置共享（人数很少） | 持续追踪产品 |
| Gmail | 本地索引、过滤器（规则引擎） | 投递和反垃圾 |
| Microsoft Word / Excel | 别复刻套件 | 单功能：表格计算或 Markdown 导出 |
| ChatGPT / Claude / Gemini / Grok | 对话 UI 壳可以看 | 模型本身、付费榜靠订阅的那一层 |

美区免费榜 2026-08-29（[AppBrain Play](https://www.appbrain.com/stats/google-play-rankings/top_free/application/us)、[Ember Picks iOS](https://emberpicks.com/us/appstore/apps/all/free/)）第一是 ChatGPT，并了 124 天。那是分发，不是作业。

---

## 3. 跨端、开源、手机也能装

这些不是商店免费榜第一，但代码在，能装到手机或当配套服务。

| 仓库 | star | 许可 | 说明 |
|---|---:|---|---|
| [ankitects/anki](https://github.com/ankitects/anki) | 30,124 | NOASSERTION | Anki is a smart spaced repetition flashcard program |
| [localsend/localsend](https://github.com/localsend/localsend) | 89,691 | Apache-2.0 | An open-source cross-platform alternative to AirDrop 手机 + 桌面。局域网发送。 |
| [immich-app/immich](https://github.com/immich-app/immich) | 112,940 | AGPL-3.0 | High performance self-hosted photo and video management solution. 手机上传端 + 自托管相册。 |
| [binwiederhier/ntfy](https://github.com/binwiederhier/ntfy) | 33,842 | Apache-2.0 | Send push notifications to your phone or desktop using PUT/POST 一个 PUT 就推到手机。替代「自己做一套 APNs」。 |
| [gotify/server](https://github.com/gotify/server) | 15,815 | NOASSERTION | A simple server for sending and receiving messages in real-time per WebSocket. (Includes a sleek web-ui) |
| [keepassxreboot/keepassxc](https://github.com/keepassxreboot/keepassxc) | 28,601 | NOASSERTION | KeePassXC is a cross-platform community-driven port of the Windows application “KeePass Password Safe”. 桌面为主；手机用 KeePass 兼容客户端。 |
| [laurent22/joplin](https://github.com/laurent22/joplin) | 56,156 | NOASSERTION | Joplin - the privacy-focused note taking app with sync capabilities for Windows, macOS, Linux, Android and iOS. |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) | 46,039 | AGPL-3.0 | An open-source, privacy-first, self-hosted knowledge workspace where humans and AI agents work together 开源、隐私优先、自托管的知识工作空间，让人与智能体在此协作 |

学手机端优先练：本地库、后台上传、分享扩展、小组件、钥匙串。别一上来做信息流。
