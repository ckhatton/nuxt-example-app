// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    ignores: ['coverage/**'],
  },
  {
    // Single-word component names are used throughout (e.g. Header, Footer)
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-reserved-component-names': 'off',
    },
  },
  {
    files: ['tests/**/*.spec.js'],
    languageOptions: {
      globals: {
        describe: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        jest: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
    },
  },
)
