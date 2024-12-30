# Nuxt v3 Example App

This is an app primarily to showcase my skills with Nuxt, and other web orientated implementations.

It is hosted here: [https://nuxt.ckhatton.com](https://nuxt.ckhatton.com "https://nuxt.ckhatton.com")

When the main branch is updated, an automated build is carried out.

**Features:**
* Nuxt 3
  * Client/Server-side only plugins
  * Lazy loading components
* Vue 3
* CI: CircleCI (via server.ckhatton.com)
* Form
* API (custom)
* Jest (testing)*
* Tailwind
* eslint
* commitlint

> \* Although, there is an issue currently - Jest does not seem to work properly with Nuxt 3

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.
