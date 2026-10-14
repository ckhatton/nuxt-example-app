import { defineVitestConfig } from '@nuxt/test-utils/config';

// Tests run inside a real Nuxt environment, so auto-imports and aliases work
export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    environmentOptions: {
      nuxt: { domEnvironment: 'happy-dom' },
    },
    coverage: {
      provider: 'v8',
      include: ['app/components/**/*.vue', 'app/utils/**/*.js', 'server/**/*.js'],
      reporter: ['text', 'html'],
    },
  },
});
