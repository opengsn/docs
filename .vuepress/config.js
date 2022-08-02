const {repository, description} = require('../package')
const {findFiles} = require('./findFiles')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'v3.0.0 beta.1 pre-release',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: 'OpenGSN Ethereum Gas Station Network Documentation',

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', {name: 'theme-color', content: '#3eaf7c'}],
    ['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
    ['meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'black'}]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    logo: '/gsn-green-vector.svg',
    repo: 'https://github.com/opengsn/gsn',
    docsRepo: 'https://github.com/opengsn/docs',
    docsBranch: 'version3',
    editLinks: true,
    docsDir: '.',
    editLinkText: '',
    lastUpdated: true,
    nav: [
      {
        text: 'OpenGSN.org',
        link: 'https://opengsn.org'
      },
      {
        text: 'Latest Stable (2.2.5)',
        link: 'https://docs-v2.opengsn.org'
      },
      {
        text: 'Forum',
        link: 'https://forum.opengsn.org'
      },
      {
        text: 'Discord',
        link: 'https://discord.gg/NXXTCbh58s'
      },
      {
        text: 'Status',
        link: 'https://relays.opengsn.org/'
      }
    ],
    sidebar: [
      '/',
      {
        title: 'Contracts',
        collapsable: false,
        children: [
          '/contracts/'
        ]
      },
      {
        title: 'JavaScript Client',
        collapsable: false,
        children: [
          '/javascript-client/getting-started',
          '/javascript-client/advanced',
          '/javascript-client/gsn-helpers',
          '/javascript-client/devops',
          '/javascript-client/tutorial',
        ]
      },
      {
        title: 'Relay Server',
        collapsable: false,
        children: [
          '/relay-server/tutorial',
        ]
      },
      {
        title: 'Code Reference',
        collapsable: true,
        children: findFiles('soldoc', '[.]md')
      },

      {
        title: 'Supported Networks',
        collapsable: false,
        children: [
          {
            title: 'Ethereum',
            children: [
              '/networks/ethereum/goerli.md',
              '/networks/ethereum/ropsten.md',
            ]
          },
          {
            title: 'Polygon',
            children: [
              '/networks/polygon/mumbai.md'
            ]
          },
          {
            title: 'Optimism',
            children: [
              'networks/optimism/kopt.md',
            ]
          },
          {
            title: 'Arbitrum',
            children: [
              'networks/arbitrum/rarb.md',
            ]
          },
          {
            title: 'Avalanche',
            children: [
              'networks/avax/fuji.md',
            ]
          },
        ]
      },
      {
        title: 'FAQ',
        collapsable: false,
        children: [
          '/faq/general',
          '/faq/troubleshooting',
          '/faq/legacy',
          '/faq/fromV2'
        ]
      },
      {
        title: 'JSDoc',
        collapsable: false,
        children: [
          '/jsdoc/jsdoc-client',
          '/jsdoc/jsdoc-server'
        ]
      },
      'audits.md',
    ],
  },
  markdown: {
    extendMarkdown: md => {
      md.set({html: true})
      md.use(require('markdown-it-plantuml'))
    }
  },
  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
