import path from 'path';
import { defineConfig } from 'vite';

const { productViteConfig } = require('@browserstack/vite-config');

console.log(productViteConfig);
// https://vitejs.dev/config/
export default defineConfig({
  ...productViteConfig,
  build: {
    ...productViteConfig.build,
    minify: 'terser', // <-- add
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
      api: path.resolve(__dirname, 'src/api'),
      assets: path.resolve(__dirname, 'src/assets'),
      const: path.resolve(__dirname, 'src/const'),
      features: path.resolve(__dirname, 'src/features'),
      middleware: path.resolve(__dirname, 'src/middleware'),
      constants: path.resolve(__dirname, 'src/constants'),
      globalSlice: path.resolve(__dirname, 'src/globalSlice'),
      utils: path.resolve(__dirname, 'src/utils'),
      common: path.resolve(__dirname, 'src/common')
    }
  }
});
