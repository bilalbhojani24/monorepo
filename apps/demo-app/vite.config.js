import { defineConfig } from 'vite';

const { productViteConfig } = require('@bilal/vite-config');

// https://vitejs.dev/config/
export default defineConfig({
  ...productViteConfig,
  resolve: {
    alias: {},
  },
});
