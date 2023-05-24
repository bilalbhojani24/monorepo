const globalConfigs = require('@browserstack/tailwind-config');

module.exports = {
  ...globalConfigs.globalTailwindConfig,
  content: [
    'src/**/*.{js,jsx}',
    '../../packages/bifrost/modules/**/*.{js,jsx}'
  ],
  theme: {
    ...globalConfigs.globalTailwindConfig.theme,
    colors: {
      ...globalConfigs.globalTailwindConfig.theme.colors,
      pink: {
        800: '#9D174D',
        100: '#FCE7F3'
      }
    }
  }
};
