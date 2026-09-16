import { defineConfig, type HeadConfig } from 'vitepress'

const isGitHubPages = process.env.GITHUB_PAGES === 'true'
const base = isGitHubPages ? '/software-info/' : '/'

export default defineConfig({
  lang: 'en-US',
  title: 'software-info',
  description:
    'Markdown-sourced software catalog. Stars are a GitHub API snapshot from 2026-08-29 PT.',
  base,
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: [/^sand-workflow:/],
  // Keep the catalog index at /catalog/. Domain files stay README.md so
  // existing 01-foo/README.md and ../07-observation/README.md links resolve.
  rewrites: {
    'catalog/README.md': 'catalog/index.md',
  },
  transformHead({ page }): HeadConfig[] {
    if (page !== 'index.md') return []
    return [
      ['meta', { 'http-equiv': 'refresh', content: `0;url=${base}catalog/` }],
    ]
  },
  themeConfig: {
    nav: [{ text: 'Catalog', link: '/catalog/' }],
    sidebar: [
      {
        text: 'Domains',
        items: [
          { text: 'Catalog', link: '/catalog/' },
          { text: '1. Platform & everyday tools', link: '/catalog/01-platform-tools/README' },
          { text: '2. Awesome lists & GitHub accounts', link: '/catalog/02-awesome-github/README' },
          { text: '3. Electronics / embedded / radio', link: '/catalog/03-electronics-radio/README' },
          { text: '4. Fabrication', link: '/catalog/04-fabrication/README' },
          { text: '5. Games', link: '/catalog/05-games/README' },
          { text: '6. Audio / image / text', link: '/catalog/06-media/README' },
          { text: '7. Observation & space', link: '/catalog/07-observation/README' },
          { text: '8. Divination & texts', link: '/catalog/08-divination/README' },
          { text: '9. Network & self-hosting', link: '/catalog/09-network/README' },
          { text: '10. Signal / instruments / formal methods', link: '/catalog/10-signal-formal/README' },
        ],
      },
      {
        text: 'Detail tables',
        items: [
          { text: 'Collect by platform', link: '/tools-by-platform' },
          { text: 'Learnable desktop', link: '/learnable-desktop' },
          { text: 'Learnable mobile', link: '/learnable-mobile' },
          { text: 'Mobile utilities (network / field)', link: '/mobile-utility-tools' },
          { text: 'UI settings & binding stacks', link: '/ui-settings-binding-stacks' },
          { text: 'Harvest: mobile utilities', link: '/harvest-mobile-utilities' },
          { text: 'Learnable web', link: '/learnable-web-tools' },
          { text: 'Awesome & accounts', link: '/awesome-and-orgs' },
          { text: 'Open hardware · print', link: '/oshw-and-print' },
          { text: 'Games', link: '/games' },
          { text: 'Divination', link: '/divination' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/weiwan-gmail/software-info' },
    ],
    editLink: {
      pattern:
        'https://github.com/weiwan-gmail/software-info/edit/main/content/:path',
      text: 'Edit on GitHub',
    },
    outline: { label: 'On this page' },
    docFooter: {
      prev: 'Previous',
      next: 'Next',
    },
    lastUpdated: { text: 'Updated' },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: 'Search', buttonAriaLabel: 'Search' },
          modal: {
            noResultsText: 'No results',
            resetButtonTitle: 'Clear',
            footer: {
              selectText: 'to select',
              navigateText: 'to navigate',
              closeText: 'to close',
            },
          },
        },
      },
    },
    sidebarMenuLabel: 'Menu',
    returnToTopLabel: 'Back to top',
    darkModeSwitchLabel: 'Theme',
  },
})
