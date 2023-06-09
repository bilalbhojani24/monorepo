const globalConfigs = require('@browserstack/tailwind-config');

module.exports = {
  ...globalConfigs.globalTailwindConfig,
  content: [
    'src/**/*.{js,jsx}',
    './node_modules/@browserstack/bifrost/dist/*.js',
    './node_modules/@browserstack/growth/dist/*.js'
  ],
  theme: {
    ...globalConfigs.globalTailwindConfig.theme,
    colors: {
      ...globalConfigs.globalTailwindConfig.theme.colors
      // PLACEHOLDER FOR ADDING NEW COLORS
      // green: {
      //   50: 'var(--colors-green-50)',
      // },
    }
  }
};
