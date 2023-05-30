import fs from 'fs';
import { defineConfig } from 'vite';

const { productViteConfig } = require('@browserstack/vite-config');

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const commonConfig = {
    ...productViteConfig
  };
  if (command !== 'build') {
    commonConfig.server = {
      https: {
        key: fs.readFileSync('./certs/bsstag.com.key'),
        cert: fs.readFileSync('./certs/bsstag.com.crt')
      },
      port: 9001,
      host: '127.0.0.1'
    };
  }
  return commonConfig;
});
