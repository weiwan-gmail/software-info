# Learnable / clone-worthy: tool sites

Checked: 2026-08-29 PT. Traffic numbers with a source are someone else’s estimate, not a measurement of mine.

## What goes in

Tools that work in the browser. Big-company sites can go in if the learnable part is a frontend slice (Squoosh, pdf.js), not search ads or a chat model. Counterparts are written as “popular closed-source site → open source you can self-host.”

---

## 1. In-browser small tools (best to clone)

| Repo | star | License | Notes |
|---|---:|---|---|
| [CorentinTh/it-tools](https://github.com/CorentinTh/it-tools) | 40,406 | GPL-3.0 | Collection of handy online tools for developers, with great UX. One-stop developer gadgets. The shape is “stand up your own tool site.” |
| [gchq/CyberChef](https://github.com/gchq/CyberChef) | 35,694 | Apache-2.0 | The Cyber Swiss Army Knife - a web app for encryption, encoding, compression and data analysis. Encode/decode/hash pipeline. UK GCHQ open source. The function is a tool, not an intelligence product. |
| [GoogleChromeLabs/squoosh](https://github.com/GoogleChromeLabs/squoosh) | 25,759 | Apache-2.0 | Make images smaller using best-in-class codecs, right in the browser. Big company. Compress in the browser. Codecs are wasm. |
| [mozilla/pdf.js](https://github.com/mozilla/pdf.js) | 53,802 | Apache-2.0 | PDF Reader in JavaScript. Big company. Browser PDF. One of the layers under sites like iLovePDF. |
| [Hopding/pdf-lib](https://github.com/Hopding/pdf-lib) | 8,608 | MIT | Create and modify PDF documents in any JavaScript environment |
| [Stirling-Tools/Stirling-PDF](https://github.com/Stirling-Tools/Stirling-PDF) | 90,918 | NOASSERTION | #1 PDF Application on GitHub that lets you edit PDFs on any device anywhere. Self-hosted PDF suite. Counterpart to iLovePDF / Smallpdf. |
| [carbon-app/carbon](https://github.com/carbon-app/carbon) | 36,090 | MIT | :black_heart: Create and share beautiful images of your source code |
| [firasdib/Regex101](https://github.com/firasdib/Regex101) | 3,513 |  | This repository is currently only used for issue tracking for www.regex101.com. The site is regex101.com. The repo is mostly issues. |
| [beautifier/js-beautify](https://github.com/beautifier/js-beautify) | 8,994 | MIT | Beautifier for javascript  |
| [lutzroeder/netron](https://github.com/lutzroeder/netron) | 33,426 | MIT | Visualizer for neural network, deep learning and machine learning models. Visualize model structure. Does not run a large model. |

Photopea ([photopea.com](https://www.photopea.com/)) is closed-source, started by one author, “Photoshop in the browser.” 2026 tool roundups still treat it as the default for PSD in a webpage. No official repo. Study canvas/layers. A full clone is not realistic.

iLovePDF ([ilovepdf.com](https://www.ilovepdf.com/)) free + Premium. Files go to their servers. Self-host with Stirling-PDF.

---

## 2. Canvas, diagrams, whiteboards

| Repo | star | License | Notes |
|---|---:|---|---|
| [excalidraw/excalidraw](https://github.com/excalidraw/excalidraw) | 130,774 | MIT | Virtual whiteboard for sketching hand-drawn like diagrams |
| [tldraw/tldraw](https://github.com/tldraw/tldraw) | 50,030 | NOASSERTION | Build infinite canvas apps in React with the tldraw SDK. World's best, top-most agent recommended #1 five star SDK. |
| [jgraph/drawio](https://github.com/jgraph/drawio) | 7,793 | Apache-2.0 | draw.io is a JavaScript, client-side editor for general diagramming. |
| [jgraph/drawio-desktop](https://github.com/jgraph/drawio-desktop) | 62,846 | Apache-2.0 | Official electron build of draw.io |
| [mermaid-js/mermaid](https://github.com/mermaid-js/mermaid) | 89,983 | MIT | Generation of diagrams like flowcharts or sequence diagrams from text in a similar manner as markdown |
| [markmap/markmap](https://github.com/markmap/markmap) | 13,084 | MIT | Build mindmaps with plain text |
| [penpot/penpot](https://github.com/penpot/penpot) | 59,377 |  | Open-source design platform. Counterpart to Figma. Large team, but the protocol and renderer are learnable. |

Figma / Miro / Canva are large closed-source sites. Exploding Topics 2026-02 used Semrush to put Canva at 870 million monthly visits ([source](https://explodingtopics.com/blog/most-popular-ai-tools)). That is traffic, not a size you should clone. The learnable piece is a template canvas. Open-source landings are Excalidraw / Penpot / tldraw.

---

## 3. File transfer, bookmarks, notifications, homepages

| Repo | star | License | Notes |
|---|---:|---|---|
| [schlagmichdoch/PairDrop](https://github.com/schlagmichdoch/PairDrop) | 11,282 | GPL-3.0 | PairDrop: Transfer Files Cross-Platform. No Setup, No Signup. AirDrop in a webpage. |
| [filebrowser/filebrowser](https://github.com/filebrowser/filebrowser) | 35,968 | Apache-2.0 | File Browser provides a file managing interface within a specified directory and it can be used to upload, delete, preview and edit your files. |
| [mickael-kerjean/filestash](https://github.com/mickael-kerjean/filestash) | 14,560 | AGPL-3.0 | :file_folder: Universal File Storage Client |
| [sissbruecker/linkding](https://github.com/sissbruecker/linkding) | 11,118 | MIT | Self-hosted bookmark manager that is designed be to be minimal, fast, and easy to set up using Docker. |
| [linkwarden/linkwarden](https://github.com/linkwarden/linkwarden) | 19,629 | AGPL-3.0 | ⚡️⚡️⚡️ Self-hosted collaborative bookmark manager to collect, read, annotate, and fully preserve what matters, all in one place. |
| [karakeep-app/karakeep](https://github.com/karakeep-app/karakeep) | 28,667 | AGPL-3.0 | A self-hostable bookmark-everything app (links, notes and images) with AI-based automatic tagging and full text search |
| [binwiederhier/ntfy](https://github.com/binwiederhier/ntfy) | 33,842 | Apache-2.0 | Send push notifications to your phone or desktop using PUT/POST |
| [gethomepage/homepage](https://github.com/gethomepage/homepage) | 32,294 | GPL-3.0 | A highly customizable homepage (or startpage / application dashboard) with Docker and service API integrations. |

---

## 4. Shrunk big-company cloud (self-hosted)

| Repo | star | License | Notes |
|---|---:|---|---|
| [nocodb/nocodb](https://github.com/nocodb/nocodb) | 64,779 | NOASSERTION | 🔥 🔥 🔥 A Free & Self-hostable Airtable Alternative. Counterpart to Airtable. |
| [pocketbase/pocketbase](https://github.com/pocketbase/pocketbase) | 60,881 | MIT | Open Source realtime backend in 1 file. Counterpart to Firebase as “one-file backend.” |
| [umami-software/umami](https://github.com/umami-software/umami) | 38,438 | MIT | Umami is a privacy-first analytics platform. Traffic, campaigns, behavior, conversions, and revenue in one place — no cookies, no surveillance, self-hosted or in the cloud. Counterpart to Google Analytics. |
| [plausible/analytics](https://github.com/plausible/analytics) | 28,797 | AGPL-3.0 | Open source, privacy-first web analytics. Lightweight, cookie-free Google Analytics alternative. Self-hosted or cloud. |
| [go-gitea/gitea](https://github.com/go-gitea/gitea) | 57,676 | MIT | Git with a cup of tea! Painless self-hosted all-in-one software development service, including Git hosting, code review, team collaboration, package registry and CI/CD. Self-hosted counterpart to GitHub. |
| [paperless-ngx/paperless-ngx](https://github.com/paperless-ngx/paperless-ngx) | 44,701 | GPL-3.0 | A community-supported supercharged document management system: scan, index and archive all your documents |
| [photoprism/photoprism](https://github.com/photoprism/photoprism) | 40,122 | NOASSERTION | AI-Powered Photos App 🌈💎✨ |
| [nextcloud/server](https://github.com/nextcloud/server) | 36,628 | AGPL-3.0 | ☁️ Nextcloud server, a safe home for all your data. Large. Use it as architecture contrast, not a weekend project. |
| [outline/outline](https://github.com/outline/outline) | 40,373 | NOASSERTION | The fastest knowledge base for growing teams. Beautiful, realtime collaborative, feature packed, and markdown compatible. |
| [toeverything/AFFiNE](https://github.com/toeverything/AFFiNE) | 72,000 | NOASSERTION | There can be more than Notion and Miro. AFFiNE(pronounced [ə‘fain]) is a next-gen knowledge base that brings planning, sorting and creating all together. Privacy first, open-source, customizable and ready to use. Counterpart to Notion + a whiteboard. |
| [AppFlowy-IO/AppFlowy](https://github.com/AppFlowy-IO/AppFlowy) | 76,064 | AGPL-3.0 | Bring projects, wikis, and teams together with AI. AppFlowy is the AI collaborative workspace where you achieve more without losing control of your data. The leading open source Notion alternative. |
| [LibreTranslate/LibreTranslate](https://github.com/LibreTranslate/LibreTranslate) | 16,218 |  | Self-hosted machine translation API. Counterpart to Google Translate / DeepL. Offline, self-hostable. |

DeepL is #8 on that same Exploding Topics table (169.4 million monthly visits, 2026-02 Semrush estimate). A translation model is not a chat model, but training is still heavy. Use LibreTranslate. Do not train a DeepL from scratch.

Remove.bg is #14 on that table (73.8 million). That is visual segmentation, not an LLM, but training is still heavy. Study the product line “upload → cutout → download.” Use an existing segmentation model. Do not train your own.

---

## 5. One “popular site → learnable slice” table

| Popular site (mostly closed-source) | Learnable slice | Open-source landing |
|---|---|---|
| iLovePDF / Smallpdf / Adobe web | merge, split, compress, pdf.js | Stirling-PDF, pdf.js, pdf-lib |
| TinyPNG | in-browser compress | Squoosh |
| Photopea | layer canvas | a subset is enough; full PSD is not realistic |
| regex101 | explain + live match | a single page of your own still works |
| carbon.now.sh | code to image | the carbon repo |
| Figma | multi-user canvas | Penpot, tldraw |
| Miro | infinite board | Excalidraw |
| Notion | block editor | AFFiNE, AppFlowy, Outline |
| Airtable | spreadsheet as database | NocoDB |
| Firebase | auth + realtime store + files | PocketBase |
| Google Analytics | cookie-free counts | Umami, Plausible |
| Google Translate / DeepL | translation API | LibreTranslate |
| Google Photos | timeline album | Immich, PhotoPrism |
| AirDrop (as a web need) | LAN file send | PairDrop, LocalSend |
| GitHub | your own git host | Gitea |
| ChatGPT web | a chat-box layout is fine to look at | do not clone the model |

[Visual Capitalist / AITools.xyz, 2026-06](https://www.visualcapitalist.com/ranked-worlds-most-popular-ai-tools-2026/) and [Similarweb AI category, 2026-07](https://www.similarweb.com/top-websites/ai-chatbots-and-tools/) put ChatGPT, Gemini, and Claude at the top. Those are traffic facts. The homework is not that layer.

---

## 6. Not homework (so this is not mistaken)

- Chat-model sites: ChatGPT / Claude / Gemini / Grok / DeepSeek web. A chat shell is fine to look at. The model is not a clone target.
- Feeds and commerce: TikTok, Temu, short drama. There is no small “slice” that explains why they sit on the free chart.
- `yt-dlp` / cobalt exist and have many stars. Site terms are involved. Not assigned as homework here.
