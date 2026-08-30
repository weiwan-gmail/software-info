# software-info

Markdown-sourced software catalog. Edit files under `content/`; the site renders them. Catalog prose stays verbatim.

## Edit content

| What | Where |
|---|---|
| Domain tree (总表 + 10 domains) | `content/catalog/` |
| Older detail tables | `content/*.md` (siblings of `catalog/`, not a `detail/` folder) |
| Star snapshots (2026-08-29 PT) | `data/*.json` |

Do not move those files. Relative links (`../tools-by-platform.md`, `../../learnable-desktop.md`) depend on this layout. Star counts in the markdown already come from the snapshots — do not invent numbers or call the live GitHub API.

Chinese catalog text stays Chinese. 术数 pages list software and texts; they do not claim readings are accurate.

## Local site

```bash
npm install
npm run docs:dev      # http://localhost:5173
npm run docs:build    # output: content/.vitepress/dist
npm run docs:preview
```

## Deploy to Vercel

Import this repo. Framework preset: VitePress.

- Build command: `npm run docs:build`
- Output directory: `content/.vitepress/dist`

`vercel.json` already sets those. Push to the connected branch to publish.
