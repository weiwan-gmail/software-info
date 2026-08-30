# 按平台收集：经典工具 + 新名单

领域总表在 [catalog/README.md](/catalog/)。

核对：2026-08-29 PT。你点名的六个都写进 Windows。持续收集的办法在第 1 节，X 是其中一条线。

收什么：能用、能学、或经典到该知道。大厂可以。不收必须靠前沿大模型或推荐广告才能成立的产品。

---

## 1. 怎么持续收

不要只刷 GitHub star。经典工具很多没有仓库，新东西经常先出现在 X、小众软件、V2EX。

### 1.1 五条线并行

| 线 | 干什么 | 例子 |
|---|---|---|
| 平台 awesome 清单 | 看最近 commit，谁被加进去 | 见 1.2 |
| 包管理仓库 | 新 formula / winget manifest | winget-pkgs、Scoop Extras、Homebrew |
| **X** | 作者发版、帖子里的「我的工具箱」、清单截图 | 见 1.3 |
| 中文社区 | 小众软件、少数派、V2EX、电脑玩物 | [@appinn](https://x.com/appinn) 同步小众软件和升级 |
| 冷门来源 | 讲话、访谈、播客、外语站 | 见 1.5。目标是你还不知道的 |

每条候选先过四问：官方地址是什么、哪个平台、免费还是买断/订阅、有没有可学的一块或开源对标。过不了就只记一笔，不当作业。

### 1.2 按平台盯的清单（GitHub）

| 平台 | 清单 | star（当时） |
|---|---|---:|
| 总索引 | [sindresorhus/awesome](https://github.com/sindresorhus/awesome) | 501,191 |
| Windows | [0PandaDEV/awesome-windows](https://github.com/0PandaDEV/awesome-windows) | 2,792 |
| macOS | [jaywcjlove/awesome-mac](https://github.com/jaywcjlove/awesome-mac) | 112,090 |
| Linux | [luong-komorebi/Awesome-Linux-Software](https://github.com/luong-komorebi/Awesome-Linux-Software) | 25,584 |
| Android | [JStumpp/awesome-android](https://github.com/JStumpp/awesome-android)（库） / [offa/android-foss](https://github.com/offa/android-foss)（可装 App） | 12,306 / 11,052 |
| iOS | [vsouza/awesome-ios](https://github.com/vsouza/awesome-ios) | 53,210 |
| Windows 安装源 | [microsoft/winget-pkgs](https://github.com/microsoft/winget-pkgs)、[ScoopInstaller/Extras](https://github.com/ScoopInstaller/Extras) | 11,026 / 2,148 |

`awesome-ios` / `awesome-android` 偏开发库，装应用另看 F-Droid、android-foss、AltStore 讨论。

### 1.3 从 X 收

没有官方 X 连接器。公开帖用搜索、[fxtwitter](https://fxtwitter.com) 或浏览器看。你已经在把 X 帖子归档到 video-summary，工具帖可以同样落进本表。

**搜什么（按周轮换平台）：**

- `Windows tools` / `must have utilities` / `Sysinternals` / `file manager`
- `Snipaste` / `Rufus` / `Total Commander` / `DiskGenius` / `Quicker`
- `macOS apps` / `Raycast` / `Homebrew cask`
- `F-Droid` / `Android FOSS`
- 中文：`小众软件`、`效率工具`、`启动器`

**看谁：**

- 作者发版：Sysinternals 更新常从 Mark Russinovich 发出（2026-05 那次 ProcDump / ZoomIt 就是）；Snipaste 作者 levie / [liulex](https://github.com/liulex)；Rufus 是 [pbatard](https://github.com/pbatard)
- 清单号：[小众软件 @appinn](https://x.com/appinn)（同步 appinn.com 和升级）。少数派、It's FOSS、Omgyubuntu 也常发，先核官网再收
- 帖子形态：一张桌面截图 + 一串名字；「我的 Windows 工具箱」长帖；别人转的 awesome 更新

**怎么处理一条 X：**

1. 记下名字和链接（或 fxtwitter 全文）
2. 找到官网或仓库，不信转图里的下载按钮
3. 标平台、收费、是否经典/新品
4. 写进下面对应平台表，来源写 `X @账号 日期`
5. 能学的一块单独标；只是又一个套壳大模型就不收

### 1.4 节奏

- 不检查 Sysinternals / Rufus / 已在表里的工具的新版本。要的是不知道的名字。
- 每周换一条冷门来源（1.5）加一轮 X 或 awesome 新条目。
- 步骤在 [Collect classic tools](sand-workflow:collect-classic-tools)。周一跑一轮，没新东西不上报。

### 1.5 挖「还不知道的」（比刷榜有用）

这些地方工具是顺口提到的，不是产品发布。

| 来源 | 怎么挖 | 为什么容易出现你没见过的 |
|---|---|---|
| Tech talk | FOSDEM、CCC、CppCon、SREcon、USENIX、Black Hat **Arsenal**（专门演示工具）、FPGA / 嵌入式场。听演讲者打开了什么，不听赞助 keynote | 现场演示的小工具很少上免费榜 |
| [usesthis.com](https://usesthis.com/) | 一个人的整套桌面 | 跨年代、跨国家，常有冷门买断软件 |
| Ask HN / Lobsters | 搜 `what tools do you use` 近一个月 | 和 awesome 名单重叠低 |
| 播客 notes | Changelog、Self-Hosted、Oxide and Friends | 一集常冒出两三个没见过的 |
| 名人 uses / dotfiles | 工程师个人 `/uses` 页 | 和商店榜完全不是一类 |
| video-summary 文稿 | 你已经在存的演讲，抽软件名 | 不另开源 |
| 外语站 | 日本 [窓の杜](https://forest.watch.impress.co.jp/)、德国 Heise/c't、阮一峰周刊 | 地区经典过不来中文圈 |
| 同类替换 | 已知 Total Commander → 东欧双栏；已知 Snipaste → 日韩截图钉图 | 故意找平行宇宙里的同一类 |
| Crowd Supply / Hackaday / OSHWA | 新板、认证硬件、拆解 | 开源硬件很少上应用榜 |
| Printables / MakerWorld | 模型 + 许可证，不记 star | 3D 打印作业是切片和固件，不是又下一个 STL |
| itch.io / Flashpoint | 按 tag 或原站点筛 | 页游和独立游戏不在 Steam 畅销榜 |
| ctext / 排盘仓库 | 经文数字化、非 LLM 起卦 | 术数先收文本和算法，不收 AI 算命套壳 |

Black Hat Arsenal、FOSDEM 展台、闪电讲（5 分钟一个工具）比大会主题演讲干净。SIGGRAPH / 示波器 / FPGA 场和你现在的方向更贴。


---

## 2. Windows（含你点的六个）

| 名字 | 官网 / 仓库 | 收费 | 备注 |
|---|---|---|---|
| **Total Commander** | [ghisler.com](https://www.ghisler.com/) | 共享软件 | 双栏文件管理。2026-07-01 发 11.58。1995 年起。开源对标 [doublecmd/doublecmd](https://github.com/doublecmd/doublecmd)（4,454 star） |
| **Sysinternals Suite** | [Microsoft Learn](https://learn.microsoft.com/en-us/sysinternals/downloads/sysinternals-suite) · 也可 [live.sysinternals.com](https://live.sysinternals.com/) | 免费 | Mark Russinovich，1996 年站点，2006 年被微软买。Suite 更新 2026-08-19。ProcExp / ProcMon / Autoruns / Sysmon / PsTools / ZoomIt。大厂，但是便携小工具，能学 |
| **DiskGenius** | [diskgenius.com](https://www.diskgenius.com/) | 免费 + 专业版 | 分区、恢复、备份。没有官方仓库。学的是分区表和恢复产品，不是去破解 |
| **Rufus** | [pbatard/rufus](https://github.com/pbatard/rufus)（37,469 star，GPL-3.0） | 免费 | 做启动 U 盘。Windows 经典里少有的高星开源 |
| **Snipaste** | [snipaste.com](https://www.snipaste.com/) · 反馈 [Snipaste/feedback](https://github.com/Snipaste/feedback)（3,679） | 免费 + 专业版 | 截图并钉在桌面。作者 levie（[liulex](https://github.com/liulex)）。Win / Mac，Linux 有仿 |
| **Quicker** | [getquicker.net](https://getquicker.net/) · 反馈 [cuiliang/Quicker](https://github.com/cuiliang/Quicker)（617） | 免费 + 专业版 | Windows 指尖工具箱：中键面板、动作库（站点写过 8000+ 动作）。安卓客户端 [cuiliang/QuickerAndroid](https://github.com/cuiliang/QuickerAndroid) |

同路、已经在可学桌面表里的：PowerToys、ShareX、Everything（搜 awesome-windows）、KeePassXC。

---

## 3. macOS

种子仍以开源小工具为主，细节在 [learnable-desktop.md](/learnable-desktop)。

常盯：Rectangle、AeroSpace、Maccy、AltTab、IINA、LocalSend、Raycast（闭源）、Snipaste（有 Mac）、Stats、Hidden / Ice。

清单：[awesome-mac](https://github.com/jaywcjlove/awesome-mac)。装：Homebrew cask。

---

## 4. Linux

清单：[Awesome-Linux-Software](https://github.com/luong-komorebi/Awesome-Linux-Software)。双栏文件：Double Commander、Midnight Commander。截图：Flameshot、Spectacle。启动器：rofi、Albert。Sysinternals 有一部分 Linux 移植（微软 2026 年还在更）。

---

## 5. Android

清单偏库：[awesome-android](https://github.com/JStumpp/awesome-android)。可装 App：[android-foss](https://github.com/offa/android-foss)、F-Droid。

和桌面能对上的：LocalSend、AnkiDroid、Syncthing、KeePass 兼容客户端、Quicker 安卓端。付费榜能当作业的在 [learnable-mobile.md](/learnable-mobile)（AnkiMobile、Paprika、Streaks）。

---

## 6. iOS

清单偏开发：[awesome-ios](https://github.com/vsouza/awesome-ios)。商店付费榜经典：AnkiMobile、Things、Streaks、Procreate Pocket。系统级小工具少开源，收的时候更依赖 X / 少数派，而不是 GitHub。

---

## 7. 跨平台网站工具

见 [learnable-web-tools.md](/learnable-web-tools)。it-tools、Stirling-PDF、Squoosh、Excalidraw。

---

## 8. 记录格式（以后每条都按这个补）

```
- 名字：
- 平台：Windows / macOS / Linux / Android / iOS / Web
- 官网或仓库：
- 收费：
- 来源：X @x / awesome-windows commit / 小众软件 / 官方发版
- 日期：
- 可学的一块：
```


---

## 9. 其它分类（种子）

| 类 | 文档 |
|---|---|
| 开源硬件 / 3D 打印 | [oshw-and-print.md](/oshw-and-print) |
| 游戏 / 在线小游戏 | [games.md](/games) |
| 术数 / 易经 / 塔罗 | [divination.md](/divination) |
