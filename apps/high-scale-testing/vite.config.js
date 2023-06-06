import path from 'path';
import { defineConfig } from 'vite';

const { productViteConfig } = require('@browserstack/vite-config');

// https://vitejs.dev/config/
export default defineConfig({
  ...productViteConfig,
  resolve: {
    alias: {
      api: path.resolve(__dirname, 'src/api'),
      assets: path.resolve(__dirname, 'src/assets'),
      common: path.resolve(__dirname, 'src/common'),
      constants: path.resolve(__dirname, 'src/constants'),
      features: path.resolve(__dirname, 'src/features'),
      globalSlice: path.resolve(__dirname, 'src/globalSlice'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      src: path.resolve(__dirname, 'src'),
      utils: path.resolve(__dirname, 'src/utils')
    }
  }
});
