const globalConfigs = require('@browserstack/tailwind-config');

const integrationsTailwindConfig = {
  ...globalConfigs.globalTailwindConfig,
  content: ['src/**/*.{js,jsx}', '../bifrost/modules/**/*.{js,jsx}']
};

module.exports = integrationsTailwindConfig;
