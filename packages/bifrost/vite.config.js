import { resolve } from 'path';

import { defineConfig } from 'vite';

const globalViteConfig = require('@browserstack/vite-config');

export default defineConfig(() => ({
  ...globalViteConfig,
  build: {
    lib: {
      entry: resolve('./index.js'),
      name: 'BiFrOsT',
      formats: ['es'],
      fileName: () => `index.js`
    },
    rollupOptions: {
      ...globalViteConfig.build.rollupOptions,
      preserveModules: true
    }
  }
}));
