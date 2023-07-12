import { defineConfig } from "vite";

const { productViteConfig } = require("@browserstack/vite-config");

// https://vitejs.dev/config/
export default defineConfig({
  ...productViteConfig,
  resolve: {
    alias: {
      // 'react': './node_modules/react',
      // '@browserstack/*': './node_modules/@browserstack/*',
    },
  },
});
