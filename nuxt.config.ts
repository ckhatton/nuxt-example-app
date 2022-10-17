// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    // https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  typescript: {
    shim: false
  }
})
