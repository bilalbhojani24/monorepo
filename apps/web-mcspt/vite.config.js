import { defineConfig } from 'vite';

const { productViteConfig } = require('@browserstack/vite-config');

const webMcpstViteConfig = {
  ...productViteConfig
};

// Enable this line when you wanna debug a prod build with source-maps
// webMcpstViteConfig.build.sourcemaps

webMcpstViteConfig.define = {
  IS_DEV: JSON.stringify(process.argv.includes('IS_DEV')),
  IS_PROD: JSON.stringify(process.argv.includes('IS_PROD')),
  IS_WEB: true,
  IS_ELECTRON: false
};

// https://vitejs.dev/config/
export default defineConfig(webMcpstViteConfig);
