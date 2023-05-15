import basicSsl from '@vitejs/plugin-basic-ssl';
import path from 'path';
import { defineConfig } from 'vite';

const { productViteConfig } = require('@browserstack/vite-config');

export default defineConfig(({ command }) => {
  const commonConfig = {
    ...productViteConfig,
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
  };
  if (command !== 'build') {
    commonConfig.server = {
      port: 9000,
      host: '127.0.0.1'
    };
    commonConfig.plugins = [...productViteConfig.plugins, basicSsl()];
  }
  return commonConfig;
});
