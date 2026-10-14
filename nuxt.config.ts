import { createRequire } from 'node:module';
import packageJSON from './package.json';

// @nuxt/eslint is a dev dependency, so skip it when only production
// dependencies are installed
const hasEslint = (() => {
  try {
    createRequire(import.meta.url).resolve('@nuxt/eslint');
    return true;
  } catch {
    return false;
  }
})();

// https://nuxt.com/docs/api/nuxt-config
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
  compatibilityDate: '2026-10-01',
  devtools: { enabled: true },
  modules: [
    // https://eslint.nuxt.com
    ...(hasEslint ? ['@nuxt/eslint'] : []),
    // https://tailwindcss.nuxtjs.org
    '@nuxtjs/tailwindcss',
  ],
  typescript: {
    shim: false,
  },
});
