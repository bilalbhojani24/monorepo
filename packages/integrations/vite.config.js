import { resolve } from 'path';
import { defineConfig } from 'vite';

const { packageViteConfig } = require('@browserstack/vite-config');

export default defineConfig(() => ({
  ...packageViteConfig,
  build: {
    lib: {
      entry: resolve('./src/index.js'),
      name: 'integrations',
      formats: ['es'],
      fileName: () => `index.js`
    },
    rollupOptions: {
      external: [...packageViteConfig.build.rollupOptions.external]
    }
  }
}));
