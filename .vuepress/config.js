const { repository, description } = require('../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Documentation',
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
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    logo: '/gsn-green-vector.svg',
    repo: repository,
    editLinks: false,
    docsDir: '.',
    editLinkText: '',
    lastUpdated: true,
    nav: [
      {
        text: 'OpenGSN.org',
        link: 'https://opengsn.org'
      },
      {
        text: 'Forum',
        link: 'https://forum.opengsn.org'
      },
      {
        text: 'Telegram',
        link: 'https://t.me/joinchat/F_BETUjG0Crb2s6mFx1LWA'
      },
      {
        text: 'Status',
        link: 'https://relays.opengsn.org/'
      }
    ],
    sidebar:  [
      '/',
      {
        title: 'Contracts',
        collapsable: false,
        children: [
          '/contracts/',
          '/contracts/addresses',
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
          '/relay-server/deployment-reference',
          '/relay-server/tutorial',
        ]
      },

      {
        title: 'FAQ',
        collapsable: false,
        children: [
          '/faq/general',
          '/faq/troubleshooting',
	  '/faq/legacy'
        ]
      },
    ],
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
