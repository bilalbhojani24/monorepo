import path from 'path';
import { defineConfig } from 'vite';

const { productViteConfig } = require('@browserstack/vite-config');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: productViteConfig.plugins,
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
      api: path.resolve(__dirname, 'src/api'),
      assets: path.resolve(__dirname, 'src/assets'),
      const: path.resolve(__dirname, 'src/const'),
      features: path.resolve(__dirname, 'src/features'),
      Icons: path.resolve(__dirname, 'src/features/Icons'),
      globalSlice: path.resolve(__dirname, 'src/slices'),
      _proxyComp: path.resolve(__dirname, 'src/_proxyComp'),
    },
  },
});
