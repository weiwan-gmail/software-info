# Incremental harvest protocol

This is the operator ledger for weekly software-info collection. It is **not** a time-management product category.

Machine state: [`state.json`](state.json). Validator: `node scripts/harvest-state.mjs validate` (also runs at the start of `npm run docs:build`). Tests: `npm test`.

Public site summary: [`content/harvest-cadence.md`](../content/harvest-cadence.md).

## Four clocks (do not mix)

| Clock | Where | Advances when |
|---|---|---|
| Site last modified | VitePress **Updated** on a page; `clocks.site_last_modified` | Any content git commit. **Never** a reason to skip a harvest stream. |
| Per-stream processed-through | `streams.<id>.processed_through_utc` | Only after a scan that examined **all** records through a **fixed run-start cutoff** and durably accounted **every** extracted candidate (`published` / `skipped` + reason / `pending`). |
| Item verification date | Catalog harvest `Date:` / `harvest YYYY-MM-DD`; queue `verification_date_utc` | That item was checked against official docs. Independent of watermarks. |
| Last verified publication | `clocks.publication` | Exact **content** commit: Pages workflow success **and** live HTML contains the new text. Point at that content SHA. A later `harvest/state.json`-only commit must not require a new publication record of itself. |

Uninitialized streams keep `processed_through_utc: null` and `bootstrap_needed: true`. Prefer null over guessing `now` or copying the last site commit.

## Parent routine (append this)

1. Read `harvest/HARVEST.md` and `harvest/state.json` before collecting.
2. **Conversation catch-up** (`conversation_catchup`): if `processed_through_utc` is null, this is bootstrap — scan the available backlog you can actually read; do **not** set a watermark to now or to site **Updated**. If it is set, scan from `processed_through_utc − overlap_window_seconds` through a cutoff frozen at run start (`to_utc`). Re-read the overlap so equal-time / late-indexed records are not lost. Dedup by normalized official URL against catalog markdown + `queue`.
3. Private pagination / tie-break tokens stay in `harvest/private/` (gitignored). Never stage them. Never put message, conversation, session, chat, thread, or bot IDs in this public repo — including files you plan to gitignore.
4. Account every extracted candidate **before** advancing a watermark: publish English catalog prose, or `skipped` with a reason, or leave `pending` on the queue. Pending is accounted; missing from the queue is not. Failed or partial scans do **not** advance `processed_through_utc`.
5. **Eight-family source rotation**: do `streams.eight_family_rotation.next_family` (currently **5**, after parent-reported source **4** completed 2026-11-16 Asia/Shanghai; reported last_run 2026-11-15 16:45 PST). Trust the newest **dated completion**, not older synced catalog headings (source 8 on 2026-10-19 is earlier than that run and must not overwrite the pointer). After that week’s family is actually done, set `last_completed_family` to that id and `next_family` to the wrap (`8→1`). `processed_through_utc` on this stream stays null until a ledger-era rotation pass completes under this protocol.
6. **Weekly exploratory** new sources (`weekly_exploratory`) and the **mobile utility** pass (`mobile_utility`): still bootstrapping; no fabricated coverage.
7. Publish catalog entries on `main`. Frozen: `content/catalog/11-lang-compare/`. After Pages succeeds for that **content** SHA and live text is verified, `recordPublication` may update `clocks.publication` in a state-only commit that points at the **content** SHA, not at the state commit.
8. `npm test` and `npm run docs:build` before pushing.

## Scan rules

- Freeze `run_start_utc` at the beginning. That instant is the cutoff (`to_utc`). Do not slide it while paging.
- Overlap default: 86400 seconds (24h). Dedup repeats from the overlap via canonical URL + aliases.
- Equal timestamps: re-read both; any extra ordering key stays private.
- Concurrent run: `beginScan` fails if `last_run.status` is `in_progress` unless `retry: true` (abandons the incomplete run, still does not advance the watermark).
- Stale writes: pass `expectedGeneration` equal to `state.generation`. Mismatch is `STALE_GENERATION`; do not write.
- Site edits are not harvest success. Publication metadata is not a conversation scan (the ego-lite SHA in `clocks.publication` is catalog evidence only).

## URL identity

Canonical official project URL is the identity. Display names are not.

`scripts/harvest-state.mjs` normalizes: https, lowercase host, strip `www.`, GitHub `owner/repo` (drop `.git` and extra path), drop tracking query params. Record aliases (homepage vs repo, old GitHub location) on the queue item. Existing catalog markdown URLs are authoritative — the validator extracts them from `content/` except frozen domain 11.

## What must never land in git

Raw chat, message/conversation/session/chat/thread/bot IDs, internal host paths, credentials, private user details. A gitignored file is **not** private if it is staged or tracked. `harvest:validate` fails if anything under `harvest/private/` other than `.gitkeep` is tracked or staged.

## Queue statuses

`pending` · `published` (needs `verification_date_utc` or `content_commit_sha`) · `skipped` (`already_cataloged` / `not_software` / `operator_skip` / `below_bar` / `duplicate` / `frozen_domain`).
