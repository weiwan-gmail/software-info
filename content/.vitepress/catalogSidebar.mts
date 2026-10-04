import { readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { DefaultTheme } from 'vitepress'

const catalogRoot = join(dirname(fileURLToPath(import.meta.url)), '../catalog')

function titleFromMarkdown(absPath: string, fallback: string): string {
  const src = readFileSync(absPath, 'utf8')
  const match = src.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : fallback
}

function pageLink(relFromCatalog: string): string {
  if (relFromCatalog === 'README.md') return '/catalog/'
  return `/catalog/${relFromCatalog.replace(/\.md$/, '')}`
}

function sortNames(names: string[]): string[] {
  return names.sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))
}

function walk(absDir: string, relDir: string): DefaultTheme.SidebarItem[] {
  const items: DefaultTheme.SidebarItem[] = []

  for (const name of sortNames(readdirSync(absDir))) {
    if (name.startsWith('.')) continue
    const abs = join(absDir, name)
    const rel = relDir ? `${relDir}/${name}` : name

    if (statSync(abs).isDirectory()) {
      const child = directoryItem(abs, rel, name)
      if (child) items.push(child)
      continue
    }

    if (!name.endsWith('.md') || name === 'README.md') continue
    items.push({
      text: titleFromMarkdown(abs, name.replace(/\.md$/, '')),
      link: pageLink(rel),
    })
  }

  return items
}

function directoryItem(
  absDir: string,
  relDir: string,
  dirName: string,
): DefaultTheme.SidebarItem | null {
  const readmeAbs = join(absDir, 'README.md')
  let text = dirName
  let link: string | undefined
  try {
    text = titleFromMarkdown(readmeAbs, dirName)
    link = pageLink(`${relDir}/README.md`)
  } catch {
    // Folder without README.md still lists any nested markdown.
  }

  const children = walk(absDir, relDir)
  if (children.length > 0) {
    return { text, link, collapsed: true, items: children }
  }
  if (!link) return null
  return { text, link }
}

/** Sidebar tree from `content/catalog/`: H1 labels, README = folder page. */
export function catalogSidebar(): DefaultTheme.SidebarItem {
  const indexAbs = join(catalogRoot, 'README.md')
  return {
    text: titleFromMarkdown(indexAbs, 'Catalog'),
    link: pageLink('README.md'),
    collapsed: false,
    items: walk(catalogRoot, ''),
  }
}
