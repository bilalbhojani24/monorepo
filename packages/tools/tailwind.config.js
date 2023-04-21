const globalConfigs = require('@browserstack/tailwind-config');

module.exports = {
  ...globalConfigs.globalTailwindConfig,
  content: ['src/**/*.{js,jsx}', '../bifrost/modules/**/*.{js,jsx}'],
  theme: {
    ...globalConfigs.globalTailwindConfig.theme,
    fontFamily: {
      ...globalConfigs.globalTailwindConfig.theme.fontFamily,
      mono: [
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Consolas',
        'Liberation Mono',
        'Courier New',
        'monospace'
      ]
    }
  }
};
