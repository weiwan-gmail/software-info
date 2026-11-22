# Harvest cadence

How this catalog grows week to week. This page is **not** a time-management app list.

New names still land in the matching [domain](/catalog/) as open source / free closed-source / paid, with a [§8 record](/tools-by-platform#81-weekly-harvest-records). Frozen comparison pages stay frozen: [11-lang-compare](/catalog/11-lang-compare/README).

## Four clocks

Do not treat one timestamp as another.

| Clock | What it means |
|---|---|
| **Updated** on a VitePress page | Git last-modified for that file. Touching any page does **not** mean conversation catch-up or source rotation was done. |
| Stream processed-through | Operator watermark: records through a frozen cutoff were examined and every candidate was published, skipped, or left pending. Uninitialized streams stay empty rather than guessing “now”. |
| Item verification date | When that product was checked against official docs (`Date:` / `harvest YYYY-MM-DD` in the tables). |
| Last verified publication | A catalog **content** commit whose Pages build succeeded and whose live HTML contains the new text. |

The machine ledger and operator steps live in the repo: [harvest/HARVEST.md](https://github.com/weiwan-gmail/software-info/blob/main/harvest/HARVEST.md) · [harvest/state.json](https://github.com/weiwan-gmail/software-info/blob/main/harvest/state.json).

## Weekly lines

1. Conversation software catch-up (skip items already in the catalog by official URL, not by name).
2. Next slot in the original eight-family obscure-source rotation ([§1.5](/tools-by-platform#15-dig-for-still-unknown-more-useful-than-chart-scraping)).
3. Exploratory new sources.
4. Mobile utility pass ([harvest-mobile-utilities.md](/harvest-mobile-utilities)).
5. Publish English catalog entries.

Identity for dedup is the canonical official site or repo URL. GitHub `owner/repo` aliases (`.git`, extra path, case) collapse to one key. Display names alone are not enough.
