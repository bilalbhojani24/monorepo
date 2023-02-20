const globalConfigs = require('@browserstack/tailwind-config');

const bifrostTailwindConfig = {
  ...globalConfigs.globalTailwindConfig,
  content: ['./src/**/*.{js,jsx}']
};

module.exports = bifrostTailwindConfig;
