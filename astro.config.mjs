import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://theswilliams.github.io',
  base: '/spare-chair-clinic-saas',
  devToolbar: { enabled: false },
  build: { inlineStylesheets: 'auto' },
});
