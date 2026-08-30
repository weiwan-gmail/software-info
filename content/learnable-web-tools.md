# 可学 / 可复刻：工具网站

核对：2026-08-29 PT。流量数字凡写出处都是别人的估计，不是我测的。

## 收什么

浏览器里就能用的工具。大厂站点可以进，如果可学的是前端切片（Squoosh、pdf.js），不是搜索广告或聊天大模型。对标写「闭源流行站 → 开源可自建」。

---

## 1. 浏览器里的小工具（最适合复刻）

| 仓库 | star | 许可 | 说明 |
|---|---:|---|---|
| [CorentinTh/it-tools](https://github.com/CorentinTh/it-tools) | 40,406 | GPL-3.0 | Collection of handy online tools for developers, with great UX.  一站式开发者小工具。形态就是「自己搭一个工具站」。 |
| [gchq/CyberChef](https://github.com/gchq/CyberChef) | 35,694 | Apache-2.0 | The Cyber Swiss Army Knife - a web app for encryption, encoding, compression and data analysis 编码/解码/哈希流水线。英国 GCHQ 开源，功能是工具不是情报产品。 |
| [GoogleChromeLabs/squoosh](https://github.com/GoogleChromeLabs/squoosh) | 25,759 | Apache-2.0 | Make images smaller using best-in-class codecs, right in the browser. 大厂。图在浏览器里压，编解码 wasm。 |
| [mozilla/pdf.js](https://github.com/mozilla/pdf.js) | 53,802 | Apache-2.0 | PDF Reader in JavaScript 大厂。浏览器 PDF。iLovePDF 那类站的底层能力之一。 |
| [Hopding/pdf-lib](https://github.com/Hopding/pdf-lib) | 8,608 | MIT | Create and modify PDF documents in any JavaScript environment |
| [Stirling-Tools/Stirling-PDF](https://github.com/Stirling-Tools/Stirling-PDF) | 90,918 | NOASSERTION | #1 PDF Application on GitHub that lets you edit PDFs on any device anywhere 自托管 PDF 套件，对标 iLovePDF / Smallpdf。 |
| [carbon-app/carbon](https://github.com/carbon-app/carbon) | 36,090 | MIT | :black_heart: Create and share beautiful images of your source code |
| [firasdib/Regex101](https://github.com/firasdib/Regex101) | 3,513 |  | This repository is currently only used for issue tracking for www.regex101.com 站点 regex101.com；仓库主要是 issue。 |
| [beautifier/js-beautify](https://github.com/beautifier/js-beautify) | 8,994 | MIT | Beautifier for javascript  |
| [lutzroeder/netron](https://github.com/lutzroeder/netron) | 33,426 | MIT | Visualizer for neural network, deep learning and machine learning models 模型结构可视化，不跑大模型。 |

Photopea（[photopea.com](https://www.photopea.com/)）是闭源、个人作者起家的「浏览器 Photoshop」。2026 年工具对比里仍被当成 PSD 网页编辑的默认选项。没有官方仓库。学的是画布/图层，完整复刻不现实。

iLovePDF（[ilovepdf.com](https://www.ilovepdf.com/)）免费 + Premium。文件上他们的服务器。要自建走 Stirling-PDF。

---

## 2. 画布、图、白板

| 仓库 | star | 许可 | 说明 |
|---|---:|---|---|
| [excalidraw/excalidraw](https://github.com/excalidraw/excalidraw) | 130,774 | MIT | Virtual whiteboard for sketching hand-drawn like diagrams |
| [tldraw/tldraw](https://github.com/tldraw/tldraw) | 50,030 | NOASSERTION | Build infinite canvas apps in React with the tldraw SDK. World's best, top-most agent recommended #1 five star SDK. |
| [jgraph/drawio](https://github.com/jgraph/drawio) | 7,793 | Apache-2.0 | draw.io is a JavaScript, client-side editor for general diagramming. |
| [jgraph/drawio-desktop](https://github.com/jgraph/drawio-desktop) | 62,846 | Apache-2.0 | Official electron build of draw.io |
| [mermaid-js/mermaid](https://github.com/mermaid-js/mermaid) | 89,983 | MIT | Generation of diagrams like flowcharts or sequence diagrams from text in a similar manner as markdown |
| [markmap/markmap](https://github.com/markmap/markmap) | 13,084 | MIT | Build mindmaps with plain text |
| [penpot/penpot](https://github.com/penpot/penpot) | 59,377 |  | Open-source design platform 对标 Figma。大团队，但协议和渲染可学。 |

Figma / Miro / Canva 是闭源大站。Canva 在 Exploding Topics 2026-02 用 Semrush 估过 8.70 亿月访问（[原文](https://explodingtopics.com/blog/most-popular-ai-tools)），那是流量，不是你该复刻的体量。可学的是模板画布；开源落点是 Excalidraw / Penpot / tldraw。

---

## 3. 文件传输、书签、通知、主页

| 仓库 | star | 许可 | 说明 |
|---|---:|---|---|
| [schlagmichdoch/PairDrop](https://github.com/schlagmichdoch/PairDrop) | 11,282 | GPL-3.0 | PairDrop: Transfer Files Cross-Platform. No Setup, No Signup. 网页版 AirDrop。 |
| [filebrowser/filebrowser](https://github.com/filebrowser/filebrowser) | 35,968 | Apache-2.0 | File Browser provides a file managing interface within a specified directory and it can be used to upload, delete, preview and edit your files. |
| [mickael-kerjean/filestash](https://github.com/mickael-kerjean/filestash) | 14,560 | AGPL-3.0 | :file_folder: Universal File Storage Client |
| [sissbruecker/linkding](https://github.com/sissbruecker/linkding) | 11,118 | MIT | Self-hosted bookmark manager that is designed be to be minimal, fast, and easy to set up using Docker. |
| [linkwarden/linkwarden](https://github.com/linkwarden/linkwarden) | 19,629 | AGPL-3.0 | ⚡️⚡️⚡️ Self-hosted collaborative bookmark manager to collect, read, annotate, and fully preserve what matters, all in one place. |
| [karakeep-app/karakeep](https://github.com/karakeep-app/karakeep) | 28,667 | AGPL-3.0 | A self-hostable bookmark-everything app (links, notes and images) with AI-based automatic tagging and full text search |
| [binwiederhier/ntfy](https://github.com/binwiederhier/ntfy) | 33,842 | Apache-2.0 | Send push notifications to your phone or desktop using PUT/POST |
| [gethomepage/homepage](https://github.com/gethomepage/homepage) | 32,294 | GPL-3.0 | A highly customizable homepage (or startpage / application dashboard) with Docker and service API integrations. |

---

## 4. 大厂云的缩小版（自托管）

| 仓库 | star | 许可 | 说明 |
|---|---:|---|---|
| [nocodb/nocodb](https://github.com/nocodb/nocodb) | 64,779 | NOASSERTION | 🔥 🔥 🔥 A Free & Self-hostable Airtable Alternative 对标 Airtable。 |
| [pocketbase/pocketbase](https://github.com/pocketbase/pocketbase) | 60,881 | MIT | Open Source realtime backend in 1 file 对标 Firebase 的「一个文件后端」。 |
| [umami-software/umami](https://github.com/umami-software/umami) | 38,438 | MIT | Umami is a privacy-first analytics platform. Traffic, campaigns, behavior, conversions, and revenue in one place — no cookies, no surveillance, self-hosted or in the cloud. 对标 Google Analytics。 |
| [plausible/analytics](https://github.com/plausible/analytics) | 28,797 | AGPL-3.0 | Open source, privacy-first web analytics. Lightweight, cookie-free Google Analytics alternative. Self-hosted or cloud. |
| [go-gitea/gitea](https://github.com/go-gitea/gitea) | 57,676 | MIT | Git with a cup of tea! Painless self-hosted all-in-one software development service, including Git hosting, code review, team collaboration, package registry and CI/CD 对标 GitHub 的自托管。 |
| [paperless-ngx/paperless-ngx](https://github.com/paperless-ngx/paperless-ngx) | 44,701 | GPL-3.0 | A community-supported supercharged document management system: scan, index and archive all your documents |
| [photoprism/photoprism](https://github.com/photoprism/photoprism) | 40,122 | NOASSERTION | AI-Powered Photos App 🌈💎✨ |
| [nextcloud/server](https://github.com/nextcloud/server) | 36,628 | AGPL-3.0 | ☁️ Nextcloud server, a safe home for all your data 体量大，当对照架构，不当周末项目。 |
| [outline/outline](https://github.com/outline/outline) | 40,373 | NOASSERTION | The fastest knowledge base for growing teams. Beautiful, realtime collaborative, feature packed, and markdown compatible. |
| [toeverything/AFFiNE](https://github.com/toeverything/AFFiNE) | 72,000 | NOASSERTION | There can be more than Notion and Miro. AFFiNE(pronounced [ə‘fain]) is a next-gen knowledge base that brings planning, sorting and creating all together. Privacy first, open-source, customizable and ready to use.  对标 Notion + 白板。 |
| [AppFlowy-IO/AppFlowy](https://github.com/AppFlowy-IO/AppFlowy) | 76,064 | AGPL-3.0 | Bring projects, wikis, and teams together with AI. AppFlowy is the AI collaborative workspace where you achieve more without losing control of your data. The leading open source Notion alternative. |
| [LibreTranslate/LibreTranslate](https://github.com/LibreTranslate/LibreTranslate) | 16,218 |  | Self-hosted machine translation API 对标 Google 翻译 / DeepL。离线、可自建。 |

DeepL 在同一份 Exploding Topics 表里排第 8（1.694 亿月访问，2026-02 Semrush 估计）。翻译模型不是聊天大模型，但训练仍然重。要动手用 LibreTranslate，不要从零训一个 DeepL。

Remove.bg 在该表第 14（7380 万）。这是视觉分割，不是 LLM，但模型训练仍重。要学「上传图 → 抠底 → 下载」这条产品线，模型用现成分割，不要自己训。

---

## 5. 一张「流行站 → 可学切片」

| 流行站（多半闭源） | 可学的一块 | 开源落点 |
|---|---|---|
| iLovePDF / Smallpdf / Adobe 网页 | 合并拆分压缩、pdf.js | Stirling-PDF、pdf.js、pdf-lib |
| TinyPNG | 浏览器内压图 | Squoosh |
| Photopea | 图层画布 | 子集即可；完整 PSD 不现实 |
| regex101 | 解释 + 实时匹配 | 自己做一页也能用 |
| carbon.now.sh | 代码出图 | carbon 仓库 |
| Figma | 多用户画布 | Penpot、tldraw |
| Miro | 无限画板 | Excalidraw |
| Notion | 块编辑 | AFFiNE、AppFlowy、Outline |
| Airtable | 表格当库 | NocoDB |
| Firebase | 认证+实时库+文件 | PocketBase |
| Google Analytics | 无 cookie 计数 | Umami、Plausible |
| Google Translate / DeepL | 翻译 API | LibreTranslate |
| Google Photos | 时间线相册 | Immich、PhotoPrism |
| AirDrop（网页需求） | 局域网传文件 | PairDrop、LocalSend |
| GitHub | 自己的 git 托管 | Gitea |
| ChatGPT 网页 | 对话框布局可以看 | 不要复刻模型 |

[Visual Capitalist / AITools.xyz，2026-06](https://www.visualcapitalist.com/ranked-worlds-most-popular-ai-tools-2026/) 和 [Similarweb AI 分类，2026-07](https://www.similarweb.com/top-websites/ai-chatbots-and-tools/) 的头部是 ChatGPT、Gemini、Claude。那些是流量事实，作业不在那一层。

---

## 6. 不收进作业的（避免误会）

- 聊天大模型站点：ChatGPT / Claude / Gemini / Grok / DeepSeek 网页。对话壳能看，模型不能当复刻目标。
- 信息流和电商：TikTok、Temu、短剧。没有可学习的「小切片」能解释它们为什么在免费榜。
- `yt-dlp` / cobalt 存在且星很多，但涉及站点条款，这里不当作业布置。
