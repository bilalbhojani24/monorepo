import { resolve } from 'path';
import { defineConfig } from 'vite';

const { packageViteConfig } = require('@browserstack/vite-config');

export default defineConfig(() => ({
  ...packageViteConfig,
  build: {
    lib: {
      entry: resolve('./index.js'),
      name: 'BiFrOsT',
      formats: ['es'],
      fileName: () => `index.js`
    },
    rollupOptions: {
      external: [...packageViteConfig.build.rollupOptions.external]
    }
  }
}));
