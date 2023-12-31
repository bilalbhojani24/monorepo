import { resolve } from 'path';
import { defineConfig } from 'vite';

const { packageViteConfig } = require('@bilal/vite-config');

export default defineConfig(() => ({
  ...packageViteConfig,
  build: {
    lib: {
      entry: resolve('./index.js'),
      name: '@bilal/utilities',
      formats: ['es'],
      fileName: () => `index.js`,
    },
    rollupOptions: {
      external: ['react', 'react-don', 'react-router-dom'],
    },
    sourcemap: true,
  },
}));
