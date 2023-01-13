import { resolve } from 'path';

import { defineConfig } from 'vite';

const { packageViteConfig } = require('@browserstack/vite-config');

export default defineConfig((configEnv) => ({
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
        '@reduxjs/toolkit',
        'redux-mock-store',
        'react-redux',
        'dexie',
        'enzyme',
        'uuid',
        '@juggle/resize-observer',
        'react/jsx-runtime'
      ]
    }
  }
}));
