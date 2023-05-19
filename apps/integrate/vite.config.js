import path from 'path';
import { defineConfig } from 'vite';

const { productViteConfig } = require('@browserstack/vite-config');

// https://vitejs.dev/config/
export default defineConfig({
  ...productViteConfig,
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
      api: path.resolve(__dirname, 'src/api'),
      assets: path.resolve(__dirname, 'src/assets'),
      features: path.resolve(__dirname, 'src/features'),
      common: path.resolve(__dirname, 'src/common'),
      constants: path.resolve(__dirname, 'src/constants'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      globalSlice: path.resolve(__dirname, 'src/globalSlice')
    }
  }
});
