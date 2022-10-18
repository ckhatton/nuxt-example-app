// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  publicRuntimeConfig: {
    NPM_PACKAGE_NAME: process.env.npm_package_display_name,
    NPM_PACKAGE_DESCRIPTION: process.env.npm_package_description
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'robots', content: 'noindex' },
        { name: 'googlebot', content: 'noindex' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  serverMiddleware: [
    '~/api/calculate'
  ],
  modules: [
    // https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // https://tailwindcss.nuxtjs.org
    '@nuxtjs/tailwindcss'
  ],
  typescript: {
    shim: false
  }
})
