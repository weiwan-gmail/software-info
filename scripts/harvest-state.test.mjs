import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it } from 'node:test'
import {
  ACCOUNT_STATUSES,
  accountCandidate,
  beginScan,
  cloneState,
  completeScan,
  extractCatalogUrls,
  extractUrlsFromMarkdown,
  failScan,
  isCataloged,
  loadState,
  nextFamily,
  normalizeUrl,
  recordPublication,
  repoRootFrom,
  scanWindow,
  touchSiteLastModified,
  urlsEquivalent,
  validateRepo,
  validateState,
  validateStagedPaths,
} from './harvest-state.mjs'

const root = repoRootFrom()
const RUN = '2026-11-22T12:00:00Z'
const LATER = '2026-11-22T13:00:00Z'

function fresh() {
  return cloneState(loadState(root))
}

describe('committed ledger', () => {
  it('validates on disk and treats catalog markdown as the item authority', () => {
    const result = validateRepo(root)
    assert.equal(result.ok, true, result.errors.join('\n'))
    const state = loadState(root)
    assert.equal(state.streams.conversation_catchup.processed_through_utc, null)
    assert.equal(state.streams.conversation_catchup.bootstrap_needed, true)
    assert.equal(state.streams.eight_family_rotation.last_completed_family, 4)
    assert.equal(state.streams.eight_family_rotation.next_family, 5)
    assert.equal(state.streams.eight_family_rotation.processed_through_utc, null)
    assert.equal(state.streams.eight_family_rotation.pointer_basis, 'parent_reported_routine_completion')
    assert.equal(state.streams.eight_family_rotation.last_completed_date, '2026-11-16')
    assert.equal(state.clocks.publication.content_commit_sha, '372b8c95b04c01574358b21b5bc8d1b060737f3f')
    assert.match(state.clocks.publication.scope, /not a conversation_catchup/)
    assert.equal(state.queue.filter((q) => q.status === 'published').length, 44)
    assert.equal(state.queue.filter((q) => q.status === 'skipped').length, 10)
    assert.equal(state.queue.filter((q) => q.status === 'pending').length, 0)
    assert.ok(
      state.queue.some(
        (q) => q.canonical_url === 'https://github.com/lightpanda-io/browser' && q.status === 'published',
      ),
    )
    assert.ok(
      state.queue.some(
        (q) =>
          q.canonical_url === 'https://github.com/egoist/mygo' &&
          q.status === 'skipped' &&
          q.skip_reason === 'already_cataloged',
      ),
    )
    assert.ok(
      state.queue.some(
        (q) =>
          q.canonical_url === 'https://github.com/atroche/rust-headless-chrome' &&
          q.skip_reason === 'duplicate',
      ),
    )
    const urls = extractCatalogUrls(root)
    assert.ok(urls.has('https://github.com/citrolabs/ego-lite'))
    assert.ok(urls.has('https://lite.ego.app'))
    assert.ok(urls.has('https://github.com/lexmount/moli'))
    assert.ok(urls.has('https://github.com/h4ckf0r0day/obscura'))
    assert.ok(urls.has('https://github.com/libracoder/kiri'))
    assert.ok(urls.has('https://github.com/jj-vcs/jj'))
  })

  it('does not guess a processed-through timestamp in the bootstrap stream', () => {
    const window = scanWindow(loadState(root).streams.conversation_catchup, RUN)
    assert.equal(window.bootstrap, true)
    assert.equal(window.from_utc, null)
    assert.equal(window.to_utc, RUN)
  })
})

describe('URL aliases', () => {
  it('collapses GitHub owner/repo forms', () => {
    const a = 'https://github.com/Citrolabs/ego-lite.git'
    const b = 'http://www.github.com/citrolabs/ego-lite/blob/main/README.md'
    const c = 'https://github.com/citrolabs/ego-lite/'
    assert.equal(normalizeUrl(a), 'https://github.com/citrolabs/ego-lite')
    assert.ok(urlsEquivalent(a, b))
    assert.ok(urlsEquivalent(b, c))
  })

  it('drops tracking params and www', () => {
    assert.equal(
      normalizeUrl('http://www.lite.ego.app/?utm_source=x&keep=1'),
      'https://lite.ego.app?keep=1',
    )
  })

  it('does not treat different GitHub repos as the same name-alike', () => {
    assert.equal(
      urlsEquivalent('https://github.com/egoist/mygo', 'https://github.com/citrolabs/ego-lite'),
      false,
    )
  })
})

describe('retries, failure, pending, publication', () => {
  it('does not advance on failure and allows retry from the same null watermark', () => {
    const state = fresh()
    const g0 = state.generation
    beginScan(state, { streamKey: 'conversation_catchup', runStartUtc: RUN, expectedGeneration: g0 })
    const afterFail = failScan(state, {
      streamKey: 'conversation_catchup',
      expectedGeneration: state.generation,
      reason: 'network',
    })
    assert.equal(afterFail.advanced, false)
    assert.equal(state.streams.conversation_catchup.processed_through_utc, null)
    assert.equal(state.streams.conversation_catchup.bootstrap_needed, true)
    assert.equal(state.streams.conversation_catchup.status, 'failed')

    beginScan(state, {
      streamKey: 'conversation_catchup',
      runStartUtc: LATER,
      expectedGeneration: state.generation,
    })
    const result = completeScan(state, {
      streamKey: 'conversation_catchup',
      expectedGeneration: state.generation,
      pagesComplete: true,
      extractedUrls: [],
    })
    assert.equal(result.advanced, true)
    assert.equal(result.processed_through_utc, LATER)
    assert.equal(state.streams.conversation_catchup.bootstrap_needed, false)
  })

  it('does not advance when pages are incomplete or history is partial', () => {
    const state = fresh()
    beginScan(state, {
      streamKey: 'conversation_catchup',
      runStartUtc: RUN,
      expectedGeneration: state.generation,
    })
    const partial = completeScan(state, {
      streamKey: 'conversation_catchup',
      expectedGeneration: state.generation,
      pagesComplete: false,
      extractedUrls: ['https://github.com/example/one'],
    })
    assert.equal(partial.advanced, false)
    assert.equal(partial.reason, 'pages_incomplete')
    assert.equal(state.streams.conversation_catchup.processed_through_utc, null)
  })

  it('does not advance while extracted URLs are unaccounted; pending is accounted and survives', () => {
    const state = fresh()
    const catalogUrls = extractCatalogUrls(root)
    beginScan(state, {
      streamKey: 'conversation_catchup',
      runStartUtc: RUN,
      expectedGeneration: state.generation,
    })
    const missing = completeScan(state, {
      streamKey: 'conversation_catchup',
      expectedGeneration: state.generation,
      pagesComplete: true,
      extractedUrls: ['https://github.com/Example/New-Tool.git'],
    })
    assert.equal(missing.advanced, false)
    assert.deepEqual(missing.unaccounted, ['https://github.com/example/new-tool'])

    beginScan(state, {
      streamKey: 'conversation_catchup',
      runStartUtc: RUN,
      expectedGeneration: state.generation,
      retry: true,
    })
    accountCandidate(state, {
      expectedGeneration: state.generation,
      catalogUrls,
      atUtc: RUN,
      item: {
        canonical_url: 'https://github.com/Example/New-Tool',
        first_seen_stream: 'conversation_catchup',
        status: 'pending',
      },
    })
    const done = completeScan(state, {
      streamKey: 'conversation_catchup',
      expectedGeneration: state.generation,
      pagesComplete: true,
      extractedUrls: ['https://github.com/example/new-tool'],
    })
    assert.equal(done.advanced, true)
    const pending = state.queue.find((q) => q.canonical_url === 'https://github.com/example/new-tool')
    assert.equal(pending.status, 'pending')

    const g = state.generation
    beginScan(state, {
      streamKey: 'conversation_catchup',
      runStartUtc: LATER,
      expectedGeneration: g,
    })
    accountCandidate(state, {
      expectedGeneration: state.generation,
      catalogUrls,
      atUtc: LATER,
      item: {
        canonical_url: 'https://www.github.com/example/new-tool.git',
        first_seen_stream: 'conversation_catchup',
      },
    })
    assert.equal(
      state.queue.filter((q) => q.canonical_url === 'https://github.com/example/new-tool').length,
      1,
    )
    const overlap = scanWindow(state.streams.conversation_catchup, LATER)
    assert.equal(overlap.bootstrap, false)
    assert.ok(Date.parse(overlap.from_utc) < Date.parse(done.processed_through_utc))
  })

  it('auto-skips URLs already in the catalog and merges homepage aliases', () => {
    const state = fresh()
    const catalogUrls = extractCatalogUrls(root)
    assert.ok(isCataloged('https://github.com/citrolabs/ego-lite.git', catalogUrls, state))
    beginScan(state, {
      streamKey: 'conversation_catchup',
      runStartUtc: RUN,
      expectedGeneration: state.generation,
    })
    const added = accountCandidate(state, {
      expectedGeneration: state.generation,
      catalogUrls,
      atUtc: RUN,
      item: {
        canonical_url: 'https://github.com/localsend/localsend',
        aliases: ['https://localsend.org/'],
        first_seen_stream: 'conversation_catchup',
      },
    })
    assert.equal(added.action, 'added')
    assert.equal(added.item.status, 'skipped')
    assert.equal(added.item.skip_reason, 'already_cataloged')
    const merged = accountCandidate(state, {
      expectedGeneration: state.generation,
      catalogUrls,
      atUtc: RUN,
      item: {
        canonical_url: 'https://localsend.org',
        first_seen_stream: 'conversation_catchup',
        status: 'skipped',
        skip_reason: 'duplicate',
      },
    })
    assert.equal(merged.action, 'merged')
    assert.equal(
      state.queue.filter((q) => q.canonical_url === 'https://github.com/localsend/localsend').length,
      1,
    )
  })

  it('rejects stale generation and concurrent in-progress scans', () => {
    const state = fresh()
    const g = state.generation
    beginScan(state, { streamKey: 'conversation_catchup', runStartUtc: RUN, expectedGeneration: g })
    assert.throws(
      () =>
        beginScan(state, {
          streamKey: 'conversation_catchup',
          runStartUtc: LATER,
          expectedGeneration: state.generation,
        }),
      /in_progress/,
    )
    assert.throws(
      () =>
        failScan(state, {
          streamKey: 'conversation_catchup',
          expectedGeneration: g,
          reason: 'stale',
        }),
      /stale generation/,
    )
  })

  it('does not advance a watermark when only site last-modified is touched', () => {
    const state = fresh()
    touchSiteLastModified(state, {
      expectedGeneration: state.generation,
      contentCommitSha: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      atUtc: LATER,
    })
    assert.equal(state.streams.conversation_catchup.processed_through_utc, null)
    assert.equal(state.clocks.site_last_modified.content_commit_sha.startsWith('aaa'), true)
    assert.notEqual(
      state.clocks.site_last_modified.content_commit_sha,
      state.clocks.publication.content_commit_sha,
    )
  })

  it('records publication only with live evidence and does not move stream watermarks', () => {
    const state = fresh()
    assert.throws(
      () =>
        recordPublication(state, {
          expectedGeneration: state.generation,
          contentCommitSha: 'bbbbbbb',
          pagesRunId: '1',
          liveUrls: [],
          verifiedAtUtc: RUN,
        }),
      /liveUrls/,
    )
    const pub = recordPublication(state, {
      expectedGeneration: state.generation,
      contentCommitSha: 'b'.repeat(40),
      pagesRunId: '99',
      liveUrls: ['https://weiwan-gmail.github.io/software-info/harvest-cadence'],
      verifiedAtUtc: LATER,
      scope: 'example content',
    })
    assert.equal(pub.publication.content_commit_sha, 'b'.repeat(40))
    assert.equal(state.streams.conversation_catchup.processed_through_utc, null)
    assert.match(pub.publication.note, /not at a later harvest\/state-only commit/)
  })
})

describe('validation guards', () => {
  it('rejects forbidden public keys and staged private files', () => {
    const state = fresh()
    state.queue.push({
      canonical_url: 'https://github.com/example/x',
      aliases: [],
      status: 'pending',
      skip_reason: null,
      first_seen_stream: 'conversation_catchup',
      queued_at_utc: RUN,
      accounted_at_utc: RUN,
      verification_date_utc: null,
      content_commit_sha: null,
      message_id: 'do-not-store',
    })
    const bad = validateState(state)
    assert.equal(bad.ok, false)
    assert.ok(bad.errors.some((e) => /forbidden key message_id/.test(e)))
    assert.deepEqual(validateStagedPaths(['harvest/private/cursors.json']), [
      'private harvest file must not be staged: harvest/private/cursors.json',
    ])
    assert.deepEqual(validateStagedPaths(['harvest/private/.gitkeep']), [])
  })

  it('rejects a fabricated processed-through without a complete run', () => {
    const state = fresh()
    state.streams.conversation_catchup.bootstrap_needed = false
    state.streams.conversation_catchup.processed_through_utc = RUN
    state.streams.conversation_catchup.status = 'complete'
    const bad = validateState(state)
    assert.equal(bad.ok, false)
    assert.ok(bad.errors.some((e) => /last_complete_run/.test(e)))
  })

  it('keeps skip reasons and published metadata in the allowed set', () => {
    assert.ok(ACCOUNT_STATUSES.includes('pending'))
    const md = readFileSync(join(root, 'content/harvest-cadence.md'), 'utf8')
    assert.ok(extractUrlsFromMarkdown(md).includes('https://github.com/weiwan-gmail/software-info'))
  })
})

describe('eight-family pointer', () => {
  it('uses the 2026-11-16 family-4 completion, not older source-8 headings', () => {
    assert.equal(nextFamily(4), 5)
    assert.equal(nextFamily(8), 1)
    const state = loadState(root)
    assert.equal(state.streams.eight_family_rotation.next_family, nextFamily(4))
    assert.notEqual(state.streams.eight_family_rotation.next_family, nextFamily(8))
    assert.match(state.streams.eight_family_rotation.evidence.not_used_as_pointer, /2026-10-19/)
    const heading = readFileSync(join(root, 'content/tools-by-platform.md'), 'utf8')
    assert.match(heading, /### 2026-10-19 · source 8/)
    assert.match(heading, /### 2026-09-21 · source 4/)
  })
})
