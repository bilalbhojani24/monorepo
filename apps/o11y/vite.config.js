import fs from 'fs';
import { defineConfig } from 'vite';

const { productViteConfig } = require('@browserstack/vite-config');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: productViteConfig.plugins,
  server: {
    https: {
      key: fs.readFileSync('./certs/bsstag.com.key'),
      cert: fs.readFileSync('./certs/bsstag.com.crt')
    },
    port: 9000,
    host: '127.0.0.1'
  }
});
