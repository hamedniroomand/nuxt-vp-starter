import { resolve } from 'node:path';

import { voidPlugin } from 'void';

export default defineNuxtConfig({
  compatibilityDate: '2026-07-15',
  devtools: { enabled: true },
  alias: {
    '@schema': resolve(import.meta.dirname, 'db/schema.ts'),
  },
  nitro: {
    preset: 'cloudflare-module',
    modules: ['void/nitro'],
    cloudflare: { dev: { configPath: './.void-wrangler.jsonc' } },
    externals: {
      inline: [/[\\/]node_modules[\\/]nuxt[\\/]dist[\\/]/],
    },
  },
  vite: { plugins: [voidPlugin()] },
});
