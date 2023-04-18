const globalConfigs = require('@browserstack/tailwind-config');

module.exports = {
  ...globalConfigs.globalTailwindConfig,
  content: ['src/**/*.{js,jsx}', '../bifrost/modules/**/*.{js,jsx}']
};
