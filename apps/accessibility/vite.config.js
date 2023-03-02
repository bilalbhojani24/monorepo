import path from 'path';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

const { productViteConfig } = require('@browserstack/vite-config');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [...productViteConfig.plugins, viteSingleFile()],
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
