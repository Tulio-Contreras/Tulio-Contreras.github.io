import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://tulio-contreras.github.io',
  output: 'static',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'always' },
  devToolbar: { enabled: false },
});
