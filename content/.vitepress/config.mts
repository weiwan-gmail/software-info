import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'software-info',
  description: 'Markdown 源的软件目录。star 是 2026-08-29 PT 的 GitHub API 快照。',
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: [/^sand-workflow:/],
  rewrites: {
    'catalog/README.md': 'index.md',
  },
  themeConfig: {
    nav: [{ text: '总表', link: '/' }],
    sidebar: [
      {
        text: '领域',
        items: [
          { text: '总表', link: '/' },
          { text: '1. 平台与日常工具', link: '/catalog/01-platform-tools/' },
          { text: '2. 开源清单与 GitHub 账号', link: '/catalog/02-awesome-github/' },
          { text: '3. 电子、嵌入式、无线电', link: '/catalog/03-electronics-radio/' },
          { text: '4. 制造', link: '/catalog/04-fabrication/' },
          { text: '5. 游戏', link: '/catalog/05-games/' },
          { text: '6. 声音、影像、文字', link: '/catalog/06-media/' },
          { text: '7. 观测与空间', link: '/catalog/07-observation/' },
          { text: '8. 术数与文本', link: '/catalog/08-divination/' },
          { text: '9. 网络与自建', link: '/catalog/09-network/' },
          { text: '10. 信号、仪器、形式化', link: '/catalog/10-signal-formal/' },
        ],
      },
      {
        text: '分表',
        items: [
          { text: '按平台收集', link: '/tools-by-platform' },
          { text: '可学桌面', link: '/learnable-desktop' },
          { text: '可学手机', link: '/learnable-mobile' },
          { text: '可学网站', link: '/learnable-web-tools' },
          { text: 'Awesome 与账号', link: '/awesome-and-orgs' },
          { text: '开源硬件 · 打印', link: '/oshw-and-print' },
          { text: '游戏', link: '/games' },
          { text: '术数', link: '/divination' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/weiwan-gmail/software-info' },
    ],
    editLink: {
      pattern: ({ filePath }) => {
        const path =
          filePath === 'index.md' ? 'catalog/README.md' : filePath
        return `https://github.com/weiwan-gmail/software-info/edit/main/content/${path}`
      },
      text: '在 GitHub 上编辑',
    },
    outline: { label: '本页' },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    lastUpdated: { text: '更新于' },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
          modal: {
            noResultsText: '没有结果',
            resetButtonTitle: '清空',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
    darkModeSwitchLabel: '主题',
  },
})
