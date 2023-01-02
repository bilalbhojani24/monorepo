import { resolve } from 'path';

import { defineConfig } from 'vite';

const globalViteConfig = require('@browserstack/vite-config');

export default defineConfig((configEnv) => ({
  ...globalViteConfig,
  build: {
    lib: {
      entry: resolve('./index.js'),
      name: 'Browserstack Hooks',
      formats: ['es'],
      fileName: () => `index.js`
    },
    rollupOptions: {
      external: [
        ...globalViteConfig.build.rollupOptions.external,
        '@reduxjs/toolkit',
        'redux-mock-store',
        'react-redux',
        'dexie',
        'enzyme',
        'uuid',
        'react/jsx-runtime'
      ]
    }
  }
}));
