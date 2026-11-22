#!/usr/bin/env node
/**
 * Incremental harvest ledger helpers for software-info.
 * Public state never stores chat/session/message IDs or host secrets.
 */
import { execFileSync } from 'node:child_process'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export const SCHEMA_VERSION = 1
export const FAMILY_COUNT = 8
export const DEFAULT_OVERLAP_SECONDS = 86400
export const STATE_REL = 'harvest/state.json'
export const PRIVATE_REL = 'harvest/private'

export const ACCOUNT_STATUSES = Object.freeze(['pending', 'published', 'skipped'])
export const SKIP_REASONS = Object.freeze([
  'already_cataloged',
  'not_software',
  'operator_skip',
  'below_bar',
  'duplicate',
  'frozen_domain',
])
export const STREAM_STATUSES = Object.freeze([
  'uninitialized',
  'idle',
  'in_progress',
  'complete',
  'failed',
  'partial',
])

const FORBIDDEN_KEYS =
  /^(message|conversation|session|chat|thread|bot|user)_?ids?$|^(resume|pagination|cursor)_token$/i
const SECRET_VALUE = /\b(github_pat_|ghp_[A-Za-z0-9]{20,}|sk-[A-Za-z0-9]{20,})\b/
const ISO_UTC = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/
const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/
const TRACKING_PARAMS = new Set([
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'fbclid',
  'gclid',
])

export function repoRootFrom(metaUrl = import.meta.url) {
  return resolve(dirname(fileURLToPath(metaUrl)), '..')
}

export function loadState(root = repoRootFrom()) {
  const path = join(root, STATE_REL)
  return JSON.parse(readFileSync(path, 'utf8'))
}

export function cloneState(state) {
  return structuredClone(state)
}

export function nextFamily(lastCompleted, familyCount = FAMILY_COUNT) {
  if (!Number.isInteger(lastCompleted) || lastCompleted < 1 || lastCompleted > familyCount) {
    throw new Error(`lastCompleted family out of range: ${lastCompleted}`)
  }
  return (lastCompleted % familyCount) + 1
}

export function normalizeUrl(input) {
  if (typeof input !== 'string' || !input.trim()) {
    throw new Error('empty url')
  }
  let raw = input.trim()
  if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(raw)) raw = `https://${raw}`
  let u
  try {
    u = new URL(raw)
  } catch {
    throw new Error(`invalid url: ${input}`)
  }
  if (u.protocol !== 'http:' && u.protocol !== 'https:') {
    throw new Error(`unsupported url scheme: ${u.protocol}`)
  }
  let host = u.hostname.toLowerCase()
  if (host.startsWith('www.')) host = host.slice(4)

  if (host === 'github.com') {
    const parts = u.pathname.split('/').filter(Boolean)
    if (parts.length >= 2) {
      const owner = parts[0].toLowerCase()
      const repo = parts[1].toLowerCase().replace(/\.git$/i, '')
      return `https://github.com/${owner}/${repo}`
    }
    return 'https://github.com'
  }

  for (const key of [...u.searchParams.keys()]) {
    if (TRACKING_PARAMS.has(key.toLowerCase())) u.searchParams.delete(key)
  }
  let path = u.pathname.replace(/\/+$/, '')
  const query = u.searchParams.toString()
  return `https://${host}${path}${query ? `?${query}` : ''}`
}

export function urlsEquivalent(a, b) {
  return normalizeUrl(a) === normalizeUrl(b)
}

export function extractUrlsFromMarkdown(text) {
  const found = new Set()
  const mdLink = /\]\((https?:\/\/[^)\s]+)\)/gi
  const angle = /<(https?:\/\/[^>\s]+)>/gi
  const bare = /\bhttps?:\/\/[^\s)\]>'"]+/gi
  for (const re of [mdLink, angle, bare]) {
    for (const match of text.matchAll(re)) {
      const candidate = match[1] || match[0]
      try {
        found.add(normalizeUrl(candidate.replace(/[.,;:]+$/, '')))
      } catch {
        // skip non-http leftovers
      }
    }
  }
  return [...found]
}

function walkMarkdownFiles(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    if (name.startsWith('.')) continue
    const abs = join(dir, name)
    const st = statSync(abs)
    if (st.isDirectory()) walkMarkdownFiles(abs, acc)
    else if (name.endsWith('.md')) acc.push(abs)
  }
  return acc
}

export function extractCatalogUrls(root = repoRootFrom()) {
  const contentDir = join(root, 'content')
  const urls = new Set()
  for (const file of walkMarkdownFiles(contentDir)) {
    const rel = relative(join(root, 'content'), file).replaceAll('\\', '/')
    if (rel.startsWith('catalog/11-lang-compare/')) continue
    for (const url of extractUrlsFromMarkdown(readFileSync(file, 'utf8'))) {
      urls.add(url)
    }
  }
  return urls
}

export function scanWindow(stream, runStartUtc) {
  assertIsoUtc(runStartUtc, 'runStartUtc')
  const overlap = stream.overlap_window_seconds ?? DEFAULT_OVERLAP_SECONDS
  if (stream.processed_through_utc == null) {
    return {
      from_utc: null,
      to_utc: runStartUtc,
      bootstrap: true,
      overlap_window_seconds: overlap,
    }
  }
  const throughMs = Date.parse(stream.processed_through_utc)
  const from = new Date(throughMs - overlap * 1000).toISOString()
  return {
    from_utc: from,
    to_utc: runStartUtc,
    bootstrap: false,
    overlap_window_seconds: overlap,
  }
}

export function isAccounted(state, url) {
  const canonical = normalizeUrl(url)
  for (const item of state.queue || []) {
    if (itemUrls(item).has(canonical) && ACCOUNT_STATUSES.includes(item.status)) {
      return true
    }
  }
  return false
}

export function isCataloged(url, catalogUrls, state) {
  const canonical = normalizeUrl(url)
  if (catalogUrls.has(canonical)) return true
  for (const item of state.queue || []) {
    if (item.status === 'published' && itemUrls(item).has(canonical)) return true
    if (itemUrls(item).has(canonical) && catalogUrls.has(normalizeUrl(item.canonical_url))) {
      return true
    }
  }
  return false
}

function itemUrls(item) {
  const set = new Set()
  set.add(normalizeUrl(item.canonical_url))
  for (const alias of item.aliases || []) set.add(normalizeUrl(alias))
  return set
}

function findQueueItem(state, url) {
  const canonical = normalizeUrl(url)
  return (state.queue || []).find((item) => itemUrls(item).has(canonical)) || null
}

export function assertIsoUtc(value, field) {
  if (typeof value !== 'string' || !ISO_UTC.test(value)) {
    throw new Error(`${field} must be UTC ISO-8601 ending in Z`)
  }
  if (Number.isNaN(Date.parse(value))) throw new Error(`${field} is not a valid instant`)
}

function assertDateOrNull(value, field) {
  if (value == null) return
  if (typeof value !== 'string' || !DATE_ONLY.test(value)) {
    throw new Error(`${field} must be YYYY-MM-DD or null`)
  }
}

function assertIsoOrNull(value, field) {
  if (value == null) return
  assertIsoUtc(value, field)
}

function walkForbidden(value, path, errors) {
  if (Array.isArray(value)) {
    value.forEach((item, i) => walkForbidden(item, `${path}[${i}]`, errors))
    return
  }
  if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      if (FORBIDDEN_KEYS.test(key)) {
        errors.push(`forbidden key ${key} at ${path}`)
      }
      walkForbidden(child, `${path}.${key}`, errors)
    }
    return
  }
  if (typeof value === 'string' && SECRET_VALUE.test(value)) {
    errors.push(`secret-shaped value at ${path}`)
  }
}

export function collectForbiddenErrors(state) {
  const errors = []
  walkForbidden(state, '$', errors)
  return errors
}

export function validateState(state, options = {}) {
  const errors = []
  const catalogUrls = options.catalogUrls || new Set()

  if (!state || typeof state !== 'object') errors.push('state must be an object')
  if (state.schema_version !== SCHEMA_VERSION) {
    errors.push(`schema_version must be ${SCHEMA_VERSION}`)
  }
  if (!Number.isInteger(state.generation) || state.generation < 0) {
    errors.push('generation must be an integer >= 0')
  }
  try {
    assertIsoUtc(state.updated_at_utc, 'updated_at_utc')
  } catch (err) {
    errors.push(err.message)
  }

  errors.push(...collectForbiddenErrors(state))

  if (!state.clocks || typeof state.clocks !== 'object') {
    errors.push('clocks missing')
  } else {
    const site = state.clocks.site_last_modified
    const pub = state.clocks.publication
    if (!site) errors.push('clocks.site_last_modified missing')
    if (!pub) errors.push('clocks.publication missing')
    else {
      try {
        assertIsoOrNull(pub.verified_at_utc, 'clocks.publication.verified_at_utc')
      } catch (err) {
        errors.push(err.message)
      }
      if (pub.content_commit_sha && !/^[0-9a-f]{7,40}$/i.test(pub.content_commit_sha)) {
        errors.push('publication content_commit_sha looks invalid')
      }
    }
  }

  if (!state.streams || typeof state.streams !== 'object') {
    errors.push('streams missing')
  } else {
    for (const [key, stream] of Object.entries(state.streams)) {
      errors.push(...validateStream(key, stream))
    }
    if (!state.streams.conversation_catchup) errors.push('stream conversation_catchup missing')
    if (!state.streams.eight_family_rotation) errors.push('stream eight_family_rotation missing')
  }

  if (!Array.isArray(state.queue)) errors.push('queue must be an array')
  else {
    const seen = new Set()
    for (const [i, item] of state.queue.entries()) {
      errors.push(...validateQueueItem(item, i, seen, catalogUrls))
    }
  }

  if (options.stagedPaths) {
    errors.push(...validateStagedPaths(options.stagedPaths))
  }

  return { ok: errors.length === 0, errors }
}

function validateStream(key, stream) {
  const errors = []
  const prefix = `streams.${key}`
  if (!stream || typeof stream !== 'object') {
    return [`${prefix} must be an object`]
  }
  if (!stream.kind) errors.push(`${prefix}.kind missing`)
  if (typeof stream.bootstrap_needed !== 'boolean') {
    errors.push(`${prefix}.bootstrap_needed must be boolean`)
  }
  if (!STREAM_STATUSES.includes(stream.status)) {
    errors.push(`${prefix}.status invalid`)
  }
  if (
    !Number.isInteger(stream.overlap_window_seconds) ||
    stream.overlap_window_seconds < 0
  ) {
    errors.push(`${prefix}.overlap_window_seconds must be integer >= 0`)
  }
  try {
    assertIsoOrNull(stream.processed_through_utc, `${prefix}.processed_through_utc`)
  } catch (err) {
    errors.push(err.message)
  }
  if (stream.bootstrap_needed && stream.processed_through_utc != null) {
    errors.push(`${prefix}: bootstrap_needed requires processed_through_utc null`)
  }
  if (stream.processed_through_utc != null) {
    const run = stream.last_complete_run
    if (!run || run.status !== 'complete') {
      errors.push(`${prefix}: processed_through_utc requires last_complete_run.status=complete`)
    } else if (run.run_start_utc !== stream.processed_through_utc) {
      errors.push(`${prefix}: processed_through_utc must equal last_complete_run.run_start_utc`)
    }
  }
  if (stream.last_run?.status === 'in_progress' && stream.status !== 'in_progress') {
    errors.push(`${prefix}: in-progress run must set stream.status=in_progress`)
  }
    if (key === 'eight_family_rotation') {
    if (!Number.isInteger(stream.last_completed_family)) {
      errors.push(`${prefix}.last_completed_family missing`)
    } else {
      try {
        const expect = nextFamily(stream.last_completed_family)
        if (stream.next_family !== expect) {
          errors.push(`${prefix}.next_family must be ${expect}`)
        }
      } catch (err) {
        errors.push(`${prefix}: ${err.message}`)
      }
    }
    try {
      assertDateOrNull(stream.last_completed_date, `${prefix}.last_completed_date`)
    } catch (err) {
      errors.push(err.message)
    }
  }
  return errors
}

function validateQueueItem(item, index, seen, catalogUrls) {
  const errors = []
  const prefix = `queue[${index}]`
  if (!item?.canonical_url) {
    errors.push(`${prefix}.canonical_url missing`)
    return errors
  }
  let canonical
  try {
    canonical = normalizeUrl(item.canonical_url)
  } catch (err) {
    errors.push(`${prefix}: ${err.message}`)
    return errors
  }
  if (item.canonical_url !== canonical) {
    errors.push(`${prefix}.canonical_url must be stored normalized (${canonical})`)
  }
  if (seen.has(canonical)) errors.push(`${prefix} duplicate canonical_url ${canonical}`)
  seen.add(canonical)
  if (!ACCOUNT_STATUSES.includes(item.status)) errors.push(`${prefix}.status invalid`)
  if (item.status === 'skipped' && !SKIP_REASONS.includes(item.skip_reason)) {
    errors.push(`${prefix}.skip_reason required for skipped`)
  }
  if (item.status !== 'skipped' && item.skip_reason != null) {
    errors.push(`${prefix}.skip_reason only valid when skipped`)
  }
  try {
    assertIsoUtc(item.queued_at_utc, `${prefix}.queued_at_utc`)
    assertIsoOrNull(item.accounted_at_utc, `${prefix}.accounted_at_utc`)
    assertDateOrNull(item.verification_date_utc, `${prefix}.verification_date_utc`)
  } catch (err) {
    errors.push(err.message)
  }
  if (item.status === 'published' && !item.verification_date_utc && !item.content_commit_sha) {
    errors.push(`${prefix}: published items need verification_date_utc or content_commit_sha`)
  }
  void catalogUrls
  return errors
}

export function validateStagedPaths(paths) {
  const errors = []
  for (const p of paths) {
    const norm = p.replaceAll('\\', '/')
    if (norm.startsWith(`${PRIVATE_REL}/`) && !norm.endsWith('.gitkeep')) {
      errors.push(`private harvest file must not be staged: ${norm}`)
    }
  }
  return errors
}

export function trackedPrivateFiles(root = repoRootFrom()) {
  try {
    const out = execFileSync('git', ['-C', root, 'ls-files', '--cached', PRIVATE_REL], {
      encoding: 'utf8',
    })
    return out.split('\n').map((s) => s.trim()).filter(Boolean)
  } catch {
    return []
  }
}

export function stagedPaths(root = repoRootFrom()) {
  try {
    const out = execFileSync('git', ['-C', root, 'diff', '--cached', '--name-only'], {
      encoding: 'utf8',
    })
    return out.split('\n').map((s) => s.trim()).filter(Boolean)
  } catch {
    return []
  }
}

function bump(state, atUtc) {
  state.generation += 1
  state.updated_at_utc = atUtc
}

function requireGeneration(state, expectedGeneration) {
  if (expectedGeneration !== state.generation) {
    const err = new Error(
      `stale generation: expected ${expectedGeneration}, have ${state.generation}`,
    )
    err.code = 'STALE_GENERATION'
    throw err
  }
}

function requireStream(state, streamKey) {
  const stream = state.streams?.[streamKey]
  if (!stream) throw new Error(`unknown stream ${streamKey}`)
  return stream
}

export function beginScan(state, { streamKey, runStartUtc, expectedGeneration, retry = false }) {
  requireGeneration(state, expectedGeneration)
  assertIsoUtc(runStartUtc, 'runStartUtc')
  const stream = requireStream(state, streamKey)
  if (stream.last_run?.status === 'in_progress' && !retry) {
    const err = new Error(`stream ${streamKey} already in_progress`)
    err.code = 'CONCURRENT_RUN'
    throw err
  }
  const window = scanWindow(stream, runStartUtc)
  stream.status = 'in_progress'
  stream.last_run = {
    status: 'in_progress',
    run_start_utc: runStartUtc,
    pages_complete: false,
    extracted_count: 0,
    accounted_count: 0,
    error: null,
    bootstrap: window.bootstrap,
    from_utc: window.from_utc,
    to_utc: window.to_utc,
  }
  bump(state, runStartUtc)
  return { window, generation: state.generation }
}

export function failScan(state, { streamKey, expectedGeneration, reason, atUtc }) {
  requireGeneration(state, expectedGeneration)
  const stream = requireStream(state, streamKey)
  if (stream.last_run?.status !== 'in_progress') {
    throw new Error(`failScan requires in_progress run on ${streamKey}`)
  }
  const when = atUtc || stream.last_run.run_start_utc
  stream.last_run.status = 'failed'
  stream.last_run.error = reason || 'failed'
  stream.last_run.pages_complete = false
  stream.status = 'failed'
  bump(state, when)
  return { advanced: false, processed_through_utc: stream.processed_through_utc }
}

export function accountCandidate(state, { item, catalogUrls, expectedGeneration, atUtc }) {
  requireGeneration(state, expectedGeneration)
  const when = atUtc || state.updated_at_utc
  assertIsoUtc(when, 'atUtc')
  const catalog = catalogUrls || new Set()
  const canonical = normalizeUrl(item.canonical_url)
  const aliases = [...new Set((item.aliases || []).map((u) => normalizeUrl(u)))].filter(
    (u) => u !== canonical,
  )
  const existing = findQueueItem(state, canonical) || aliases.map((u) => findQueueItem(state, u)).find(Boolean)
  if (existing) {
    const merged = new Set([...(existing.aliases || []), ...aliases, canonical])
    merged.delete(normalizeUrl(existing.canonical_url))
    existing.aliases = [...merged]
    if (item.status && item.status !== existing.status) {
      existing.status = item.status
      existing.skip_reason = item.status === 'skipped' ? item.skip_reason : null
      existing.accounted_at_utc = when
    }
    bump(state, when)
    return { action: 'merged', item: existing }
  }

  let status = item.status
  let skipReason = item.skip_reason ?? null
  if (!status) {
    if (isCataloged(canonical, catalog, state) || aliases.some((u) => isCataloged(u, catalog, state))) {
      status = 'skipped'
      skipReason = 'already_cataloged'
    } else {
      status = 'pending'
    }
  }

  const recorded = {
    canonical_url: canonical,
    aliases,
    status,
    skip_reason: status === 'skipped' ? skipReason : null,
    first_seen_stream: item.first_seen_stream,
    queued_at_utc: when,
    accounted_at_utc: when,
    verification_date_utc: item.verification_date_utc ?? null,
    content_commit_sha: item.content_commit_sha ?? null,
    notes: item.notes ?? null,
  }
  if (!ACCOUNT_STATUSES.includes(recorded.status)) {
    throw new Error(`invalid status ${recorded.status}`)
  }
  if (recorded.status === 'skipped' && !SKIP_REASONS.includes(recorded.skip_reason)) {
    throw new Error('skipped requires skip_reason')
  }
  state.queue.push(recorded)
  bump(state, when)
  return { action: 'added', item: recorded }
}

export function completeScan(
  state,
  {
    streamKey,
    expectedGeneration,
    pagesComplete,
    extractedUrls,
    catalogUrls,
    atUtc,
    partialHistory = false,
  },
) {
  requireGeneration(state, expectedGeneration)
  const stream = requireStream(state, streamKey)
  const run = stream.last_run
  if (run?.status !== 'in_progress') {
    throw new Error(`completeScan requires in_progress run on ${streamKey}`)
  }
  const when = atUtc || run.run_start_utc
  const extracted = [...new Set((extractedUrls || []).map((u) => normalizeUrl(u)))]
  run.extracted_count = extracted.length

  if (partialHistory || !pagesComplete) {
    run.status = 'partial'
    run.pages_complete = false
    run.error = partialHistory ? 'partial_history' : 'pages_incomplete'
    stream.status = 'partial'
    bump(state, when)
    return {
      advanced: false,
      reason: run.error,
      processed_through_utc: stream.processed_through_utc,
    }
  }

  const unaccounted = extracted.filter((url) => !isAccounted(state, url))
  run.accounted_count = extracted.length - unaccounted.length
  if (unaccounted.length) {
    run.status = 'partial'
    run.pages_complete = true
    run.error = 'unaccounted_candidates'
    run.unaccounted = unaccounted
    stream.status = 'partial'
    bump(state, when)
    return {
      advanced: false,
      reason: 'unaccounted_candidates',
      unaccounted,
      processed_through_utc: stream.processed_through_utc,
    }
  }

  stream.processed_through_utc = run.run_start_utc
  stream.bootstrap_needed = false
  stream.status = 'complete'
  run.status = 'complete'
  run.pages_complete = true
  run.error = null
  stream.last_complete_run = {
    status: 'complete',
    run_start_utc: run.run_start_utc,
    from_utc: run.from_utc,
    to_utc: run.to_utc,
  }
  bump(state, when)
  void catalogUrls
  return { advanced: true, processed_through_utc: stream.processed_through_utc }
}

export function recordPublication(
  state,
  { expectedGeneration, contentCommitSha, pagesRunId, liveUrls, verifiedAtUtc, scope, pagesRunUrl },
) {
  requireGeneration(state, expectedGeneration)
  assertIsoUtc(verifiedAtUtc, 'verifiedAtUtc')
  if (!contentCommitSha || !/^[0-9a-f]{7,40}$/i.test(contentCommitSha)) {
    throw new Error('contentCommitSha required')
  }
  if (!pagesRunId) throw new Error('pagesRunId required')
  if (!Array.isArray(liveUrls) || liveUrls.length === 0) {
    throw new Error('liveUrls required after live text verification')
  }
  for (const url of liveUrls) normalizeUrl(url)

  state.clocks.publication = {
    content_commit_sha: contentCommitSha,
    pages_run_id: String(pagesRunId),
    pages_run_url:
      pagesRunUrl || `https://github.com/weiwan-gmail/software-info/actions/runs/${pagesRunId}`,
    live_urls: liveUrls,
    verified_at_utc: verifiedAtUtc,
    scope: scope || 'catalog content',
    note: 'Points at a verified content SHA, not at a later harvest/state-only commit.',
  }
  bump(state, verifiedAtUtc)
  return { publication: state.clocks.publication, generation: state.generation }
}

export function touchSiteLastModified(state, { expectedGeneration, contentCommitSha, atUtc }) {
  requireGeneration(state, expectedGeneration)
  assertIsoUtc(atUtc, 'atUtc')
  state.clocks.site_last_modified = {
    meaning: 'Git lastUpdated for site pages. Not a harvest cursor.',
    content_commit_sha: contentCommitSha,
    recorded_at_utc: atUtc,
  }
  bump(state, atUtc)
}

export function validateRepo(root = repoRootFrom()) {
  const state = loadState(root)
  const catalogUrls = extractCatalogUrls(root)
  const tracked = trackedPrivateFiles(root).filter((p) => !p.endsWith('.gitkeep'))
  const staged = stagedPaths(root)
  const result = validateState(state, { catalogUrls, stagedPaths: staged })
  if (tracked.length) {
    result.ok = false
    result.errors.push(`tracked private harvest files: ${tracked.join(', ')}`)
  }
  result.catalog_url_count = catalogUrls.size
  result.generation = state.generation
  return result
}

function printValidate(root) {
  const result = validateRepo(root)
  if (!result.ok) {
    console.error('harvest state invalid:')
    for (const err of result.errors) console.error(`- ${err}`)
    process.exit(1)
  }
  console.log(
    `harvest state ok (generation ${result.generation}, catalog urls ${result.catalog_url_count})`,
  )
}

const thisFile = fileURLToPath(import.meta.url)
const invoked = process.argv[1] ? resolve(process.argv[1]) : ''
if (invoked && thisFile === invoked) {
  const cmd = process.argv[2] || 'validate'
  const root = repoRootFrom()
  if (cmd === 'validate') printValidate(root)
  else if (cmd === 'normalize-url') {
    console.log(normalizeUrl(process.argv[3] || ''))
  } else {
    console.error('usage: node scripts/harvest-state.mjs validate|normalize-url <url>')
    process.exit(2)
  }
}
