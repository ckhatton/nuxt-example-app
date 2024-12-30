import packageJSON from './package.json';
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      title: packageJSON.displayName || '',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'description', content: packageJSON.description || '' },
        { name: 'keywords', content: packageJSON.keywords?.toString() || '' },
        { name: 'robots', content: 'noindex' },
        { name: 'googlebot', content: 'noindex' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    // https://eslint.nuxt.com
    '@nuxt/eslint',
    // https://tailwindcss.nuxtjs.org
    '@nuxtjs/tailwindcss',
  ],
  typescript: {
    shim: false,
  },
});
