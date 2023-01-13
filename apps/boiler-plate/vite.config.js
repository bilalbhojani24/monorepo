import { defineConfig } from 'vite';

const { productViteConfig } = require('@browserstack/vite-config');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: productViteConfig.plugins,
});
