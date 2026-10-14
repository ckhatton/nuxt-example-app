# Nuxt Example App

This is an app primarily to showcase my skills with Nuxt, and other web orientated implementations.

It is hosted here: [https://nuxt.ckhatton.com](https://nuxt.ckhatton.com "https://nuxt.ckhatton.com")

When the main branch is updated, an automated build is carried out.

**Features:**
* Nuxt 4
  * Client/Server-side only plugins
  * Lazy loading components
* Vue 3
* Bun
* CI: CircleCI (via server.ckhatton.com)
* Form
* API (custom)
* Electronics calculators (resistor colour code, Ohm's law, LED resistor)
* Animated aurora background
* Vitest and Nuxt Test Utils (testing, with coverage)
* Tailwind
* eslint
* commitlint

## Setup

Make sure to install the dependencies:

```bash
bun install
```

## Development Server

Start the development server on http://localhost:3000

```bash
bun run dev
```

## Testing

Run the tests, watch them, or generate a coverage report:

```bash
bun run test
bun run test:watch
bun run coverage
```

## Production

Build the application for production:

```bash
bun run build
```

Locally preview production build:

```bash
bun run preview
```

Checkout the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
