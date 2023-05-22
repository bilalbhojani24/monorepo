import { defineConfig } from 'vite';

const { productViteConfig } = require('@browserstack/vite-config');

export default defineConfig(() => ({
  ...productViteConfig
}));
