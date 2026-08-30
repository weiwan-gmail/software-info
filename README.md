# software-info

Markdown-sourced software catalog. Edit files under `content/`; the site renders them. Catalog prose stays verbatim.

## Edit content

| What | Where |
|---|---|
| Domain tree (catalog index + 10 domains) | `content/catalog/` |
| Older detail tables | `content/*.md` (siblings of `catalog/`, not a `detail/` folder) |
| Star snapshots (2026-08-29 PT) | `data/*.json` |

Do not move those files. Relative links (`../tools-by-platform.md`, `../../learnable-desktop.md`) depend on this layout. Star counts in the markdown already come from the snapshots — do not invent numbers or call the live GitHub API.

Catalog prose is English. Divination / occult-text pages list software and texts; they do not claim readings are accurate.

## Local site

```bash
npm install
npm run docs:dev      # http://localhost:5173
npm run docs:build    # output: content/.vitepress/dist
npm run docs:preview
```

## GitHub Actions → GitHub Pages

`.github/workflows/deploy.yml`:

- Pull request to `main`: `npm ci` and `npm run docs:build`. The PR fails if the build fails.
- Push to `main`: the same build, then `actions/upload-pages-artifact` + `actions/deploy-pages`.

CI sets `GITHUB_PAGES=true` so VitePress `base` is `/software-info/`. Site URL:

https://weiwan-gmail.github.io/software-info/

`/` still sends you to the catalog index (`/software-info/catalog/` on Pages).

In the repo **Settings → Pages**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).

## Deploy to Vercel

Local preview and Vercel leave `GITHUB_PAGES` unset, so `base` stays `/`. Import this repo. Framework preset: VitePress.

- Build command: `npm run docs:build`
- Output directory: `content/.vitepress/dist`

`vercel.json` already sets those, including a `/` → `/catalog` redirect so the catalog index is the home page. Do not set `GITHUB_PAGES` on Vercel. Push to the connected branch to publish.
