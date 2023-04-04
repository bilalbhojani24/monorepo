const globalConfigs = require('@browserstack/tailwind-config');

module.exports = {
  ...globalConfigs.globalTailwindConfig,
  content: [
    'src/**/*.{js,jsx}',
    '../../packages/bifrost/modules/**/*.{js,jsx}'
  ],
  theme: {
    ...globalConfigs.globalTailwindConfig.theme,
    extend: {
      ...globalConfigs.globalTailwindConfig.theme.extend,
      keyframes: {
        ...globalConfigs.globalTailwindConfig.theme.extend.keyframes,
        'bg-pulse': {
          '0%': { backgroundColor: 'var(--colors-base-100)' },
          '25%': { backgroundColor: 'var(--colors-base-300)' },
          '50%': { backgroundColor: 'var(--colors-base-100)' },
          '100%': { backgroundColor: 'white' }
        }
      },
      animation: {
        ...globalConfigs.globalTailwindConfig.theme.extend.animation,
        'pulse-bg': 'bg-pulse 1s ease infinite'
      }
    },
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
