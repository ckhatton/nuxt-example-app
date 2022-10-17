// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      title: process.env.npm_package_name || '',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'description', content: process.env.npm_package_description || '' },
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
