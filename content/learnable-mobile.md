# Learnable / clone-worthy: mobile apps

Checked: 2026-08-29 PT. Store ranks come from public charts, not guesses.

## What goes in

Same rule: a slice you can study, or a subset you can build. Big-company apps can go in, but only the peelable feature (authenticator, flashcards, an edit pipeline). Skip products that only live on a large model or ad recommendations.

On the US paid chart ([MSY, updated 2026-08-30](https://m-s-y.com/en/app/ranking/top-paid-all-categories/)), most of what can be homework is not a game. The free-chart head is ChatGPT / TikTok / short drama. Those stay out.

---

## 1. On the paid chart, and usable as homework

Source: US App Store Top Paid, MSY 2026-08-30.

| Rank | App | Paid | Why it is learnable |
|---:|---|---|---|
| 10 | AnkiMobile Flashcards | buyout | Desktop [ankitects/anki](https://github.com/ankitects/anki) (30,124 star) is open source. SRS, deck sync, and card templates are a complete assignment. The phone app is a paid shell. |
| 13 | Procreate Pocket | buyout | canvas + pressure + layers. Commercial closed-source. Study a Metal/OpenGL canvas, not the whole brush marketplace. |
| 18 | SkyView | buyout | sensors + sky chart. Public star catalogs. AR attitude is practice-sized. |
| 19 | TonalEnergy Tuner & Metronome | buyout | pitch detection + metronome. DSP homework, same line as your osc-sim. |
| 32 | Paprika Recipe Manager 3 | buyout | local library + scrape a recipe page. Classic CRUD. No cloud empire. |
| 51 | AutoSleep | buyout | watch sleep, local, advertised as no subscription. Study HealthKit read/write, not hardware. |
| 52 | Things 3 | buyout | polished GTD. Study the data model and shortcuts. Open-source counterparts are Reminders / any todo. |
| 62 | Goblin Tools | buyout | split a fuzzy task into steps. Some features call a model, but the product is a “small toolbox.” You can make a rules-only version. |
| 67 | Streaks | buyout | habit streaks. Tiny state machine. |
| 69 | PhotoPills | buyout | sun/moon planning. The astronomy math is public. The UI is the product. |
| 70 | Threema | buyout | Swiss paid messenger. Study E2E and “pay first, then users,” not a full protocol reimplementation. |
| 78 | Wipr 2 | buyout | system-level content blocking. The Safari extension model is learnable. Do not turn it into a malicious filter. |

Paid chart #3 is Shadowrocket (a rule-list network client). Treat it only as “this class of product existed: rule lists + a local-proxy UI.” Do not write how to bypass network restrictions, and do not write setup steps.

A lot of the paid chart is games (Minecraft, Balatro, Mini Metro #60, Papers, Please #96). What you can learn from games is loops and levels. Not this table’s focus.

---

## 2. One peelable slice from big-company apps

| Big-company app | Learnable slice | Do not study / do not clone |
|---|---|---|
| Google / Microsoft Authenticator | TOTP (RFC 6238), backup export | account systems, risk controls |
| CapCut | timeline, templates, captions, ffmpeg export | recommendations, asset store, accounts |
| Duolingo | spaced repetition, streak pacing | course production and growth |
| Canva (also visible on AppBrain’s US free chart) | templates + layer canvas | asset copyright and growth |
| Life360 | family location sharing (few people) | a continuous-tracking product |
| Gmail | local index, filters (rule engine) | delivery and anti-spam |
| Microsoft Word / Excel | do not clone the suite | one function: spreadsheet calc or Markdown export |
| ChatGPT / Claude / Gemini / Grok | a chat UI shell is fine to look at | the model itself, or the paid-chart subscription layer |

US free chart 2026-08-29 ([AppBrain Play](https://www.appbrain.com/stats/google-play-rankings/top_free/application/us), [Ember Picks iOS](https://emberpicks.com/us/appstore/apps/all/free/)): ChatGPT is first, 124 days running. That is distribution, not homework.

---

## 3. Cross-platform, open source, and installable on a phone

These are not #1 on the store free charts. The code is there. You can install them on a phone or run them as a companion service.

| Repo | star | License | Notes |
|---|---:|---|---|
| [ankitects/anki](https://github.com/ankitects/anki) | 30,124 | NOASSERTION | Anki is a smart spaced repetition flashcard program |
| [localsend/localsend](https://github.com/localsend/localsend) | 89,691 | Apache-2.0 | An open-source cross-platform alternative to AirDrop. Phone + desktop. LAN send. |
| [immich-app/immich](https://github.com/immich-app/immich) | 112,940 | AGPL-3.0 | High performance self-hosted photo and video management solution. Phone uploader + self-hosted album. |
| [binwiederhier/ntfy](https://github.com/binwiederhier/ntfy) | 33,842 | Apache-2.0 | Send push notifications to your phone or desktop using PUT/POST. One PUT reaches the phone. Substitute for “roll your own APNs.” |
| [gotify/server](https://github.com/gotify/server) | 15,815 | NOASSERTION | A simple server for sending and receiving messages in real-time per WebSocket. (Includes a sleek web-ui) |
| [keepassxreboot/keepassxc](https://github.com/keepassxreboot/keepassxc) | 28,601 | NOASSERTION | KeePassXC is a cross-platform community-driven port of the Windows application “KeePass Password Safe”. Desktop-first. On phones, use a KeePass-compatible client. |
| [laurent22/joplin](https://github.com/laurent22/joplin) | 56,156 | NOASSERTION | Joplin - the privacy-focused note taking app with sync capabilities for Windows, macOS, Linux, Android and iOS. |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) | 46,039 | AGPL-3.0 | An open-source, privacy-first, self-hosted knowledge workspace where humans and AI agents work together |

On mobile, practice local stores, background upload, share extensions, widgets, and the keychain first. Do not start with a feed.
