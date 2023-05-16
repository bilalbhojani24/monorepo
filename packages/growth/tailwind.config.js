const globalConfigs = require('@browserstack/tailwind-config');

const integrationsTailwindConfig = {
  ...globalConfigs.globalTailwindConfig,
  content: ['modules/**/*.{js,jsx}', '../bifrost/modules/**/*.{js,jsx}']
};

module.exports = integrationsTailwindConfig;
