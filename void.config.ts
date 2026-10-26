import { defineConfig } from 'void/config';

export default defineConfig({
  cloudflare: {
    compatibility_date: '2026-07-15',
    compatibility_flags: ['nodejs_compat', 'nodejs_als'],
  },
});
