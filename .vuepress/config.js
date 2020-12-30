const { repository, description } = require('../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'OpenGSN Documentation',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: 'Open Gas Station Network Documentation',

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
        text: 'Documentation',
        link: '/',
      },
      {
        text: 'FAQ',
        link: '/javascript-client/faq',
      },
      {
        text: 'Status',
        link: 'https://relays.opengsn.org'
      },
      {
        text: 'Discourse',
        link: 'https://forum.opengsn.org'
      }
    ],
    sidebar:  [
      '/',
      {
        title: 'JavaScript Client',
        collapsable: false,
        children: [
          '/javascript-client/getting-started',
          '/javascript-client/advanced',
          '/javascript-client/faq.md',
          '/javascript-client/gsn-faq.md',
          '/javascript-client/gsn-helpers.md',
          '/javascript-client/interacting-with-relayhub.md',
          '/javascript-client/testing-gsn-applications.md',
          '/javascript-client/devops.md',
          '/javascript-client/running-own-relay.md',

        ]
      },
      {
        title: 'Contracts',
        collapsable: false,
        children: [
          '/contracts/',
        ]
      },
      {
        title: 'Tutorials',
        collapsable: false,
        children: [
          '/tutorials/integration',
          '/tutorials/relay',
        ]
      },
      '/deployments/networks'
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
