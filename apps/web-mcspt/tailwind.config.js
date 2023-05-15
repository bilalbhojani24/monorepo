const globalConfigs = require('@browserstack/tailwind-config');

module.exports = {
  ...globalConfigs.globalTailwindConfig,
  content: [
    'src/**/*.{js,jsx}',
    '../../packages/bifrost/modules/**/*.{js,jsx}',
    '../../packages/mcp-shared/features/**/*.{js,jsx}'
  ]
};
