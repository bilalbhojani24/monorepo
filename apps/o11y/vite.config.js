import fs from 'fs';
import path from 'path';
import { defineConfig, splitVendorChunkPlugin } from 'vite';

const { productViteConfig } = require('@browserstack/vite-config');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [...productViteConfig.plugins, splitVendorChunkPlugin()],
  server: {
    https: {
      key: fs.readFileSync('./certs/bsstag.com.key'),
      cert: fs.readFileSync('./certs/bsstag.com.crt')
    },
    port: 9000,
    host: '127.0.0.1'
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
      api: path.resolve(__dirname, 'src/api'),
      assets: path.resolve(__dirname, 'src/assets'),
      features: path.resolve(__dirname, 'src/features'),
      globalSlice: path.resolve(__dirname, 'src/globalSlice'),
      utils: path.resolve(__dirname, 'src/utils'),
      common: path.resolve(__dirname, 'src/common'),
      constants: path.resolve(__dirname, 'src/constants'),
      hooks: path.resolve(__dirname, 'src/hooks')
    }
  }
});
