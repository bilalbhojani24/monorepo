import { resolve } from 'path';
import { defineConfig } from 'vite';

const { packageViteConfig } = require('@browserstack/vite-config');

export default defineConfig(() => ({
  ...packageViteConfig,
  build: {
    lib: {
      entry: resolve('./index.js'),
      name: 'Browserstack Hooks',
      formats: ['es'],
      fileName: () => `index.js`
    },
    rollupOptions: {
      external: [
        ...packageViteConfig.build.rollupOptions.external,
        'redux-mock-store',
        'dexie',
        'enzyme',
        'uuid',
        'react/jsx-runtime'
      ]
    }
  }
}));
