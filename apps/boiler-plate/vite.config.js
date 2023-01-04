import { defineConfig } from 'vite';
import { resolve } from 'path';

const globalViteConfig = require('@browserstack/vite-config');

// https://vitejs.dev/config/
export default defineConfig({
  ...globalViteConfig,
  build: {
    lib: {
      entry: resolve('./index.js'),
      name: 'boiletplate-project',
      formats: ['es'],
      fileName: () => `index.js`
    },
    rollupOptions: {
      ...globalViteConfig.build.rollupOptions
    }
  }
});
