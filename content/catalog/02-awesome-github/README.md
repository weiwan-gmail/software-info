# 2. Awesome lists & GitHub accounts

Detail table: [awesome-and-orgs.md](../../awesome-and-orgs.md). Almost no “paid products” here: the lists themselves are open-source documents. Paid plans from company orgs belong in the matching product domain (network, hosting). Do not pile them here again.

## 2.1 Discussion queue

| # | List | star | Status |
|---|---|---:|---|
| 1 | [fffaraz/awesome-cpp](https://github.com/fffaraz/awesome-cpp) | 73,009 | In progress. Already covered kissfft / iir1 / fCWT |
| 2 | [rust-unofficial/awesome-rust](https://github.com/rust-unofficial/awesome-rust) | 59,049 | Not started |
| 3 | [PatrickJS/awesome-angular](https://github.com/PatrickJS/awesome-angular) | 10,067 | Not started |
| 4 | Awesome-LLM + awesome-llm-apps | 27,303 / 135,169 | Not started, counts as one item |
| 5 | awesome-mcp-servers | 93,063 | Not started |
| 6 | awesome-claude-skills | 73,952 | Not started |
| 7 | awesome-python | 317,034 | Not started |
| 8 | awesome-go | 182,645 | Not started |
| 9 | awesome-selfhosted | 316,022 | Not started |
| 10 | the-book-of-secret-knowledge | 241,100 | Not started |

The master index [sindresorhus/awesome](https://github.com/sindresorhus/awesome) 501,191 is not a separate item.

## 2.2 Sidecar lists

HelloGitHub 173,631 · papers-we-love 109,186 · awesome-courses 70,755 · awesome-scalability 73,605 · awesome-react 74,441 · awesome-vue 73,549 · awesome-nodejs 66,653 · **awesome-dsh-plugin** (harvest 2026-11-08; §2.5).

## 2.3 Company orgs

Group A (toys next to the main product): tailscale · vercel · cloudflare · superfly · supabase · caddyserver.

Group B: hashicorp · netlify · planetscale · neondatabase.

`superfly/sprites` does not exist. Only sprites-docs 50.

Paid plans from these companies live in [09-network](../09-network/README.md) and on each product site. Not repeated here.

## 2.4 Personal accounts

CLI: sharkdp / BurntSushi / junegunn. TUI: jesseduffield / sxyazi. Network: FiloSottile. Teaching: karpathy / ggerganov (llama.cpp has moved to ggml-org).

## 2.5 DeepSeek Harness plugin lists (harvest 2026-11-08)

Not in the numbered discussion queue (do not interrupt items 1–10). **Not** [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) (queue item 6). **DSH** = DeepSeek Harness, DeepSeek’s open-source agent harness ([deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)). This catalog row is the **public collection**, not private harness notes. Detail: [awesome-and-orgs.md](../../awesome-and-orgs.md) §2.1 · [tools-by-platform.md](../../tools-by-platform.md) §8.1.

**Open source (the list is a document; listed plugins are third-party)**

| Repo | star (2026-11-08) | License | Notes |
|---|---:|---|---|
| [awesome-dsh-plugin/awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin) · [awesome-dsh-plugin.com](https://awesome-dsh-plugin.com) | 23,720 | CC0-1.0 (the list) | Curated **list + plugin-market index** for DeepSeek Harness community plugins. **Not** an executable product: this repo is generated README + YAML entries (`data/plugins/`). A plugin is listed when it declares a `dsh.bundle` manifest and installs with `dsh plugin add` (`dsh.client` alone is not installable). Upstream `count.json` 2026-11-08: **9,463** plugins in 23 categories (UI, tools, models, memory, skills, git, security, remote, markets, …) — badge count, not independently recounted. Optional in-harness browser: [dsh-market/dsh-market](https://github.com/dsh-market/dsh-market). Discover index on dsh **0.2.1+**: `https://cdn.jsdelivr.net/npm/dsh-plugin-catalog/index.json` (README: GitHub Pages copies of the same JSON can exceed dsh’s 15s load budget). List is CC0; **each plugin keeps its own license**. README: not affiliated with DeepSeek; listing is not a security review or quality rank; installing runs third-party code with host permissions (tool approvals do not sandbox plugin code). Host/version pins vary per plugin (some Windows-only, some pin 0.1.x vs 0.2.x). Learnable slice: agent plugin-marketplace shape (one YAML file → generated README, `dsh.bundle` + cordis patch), not cloning the 9k plugins |

**Free closed-source / paid:** none added. Do not invent prices. Paid plans of the harness or of individual plugins, if any, are not recorded here.
