const tailwindConfig = require('./tailwind.config.js');

module.exports = {
  extends: ['@browserstack/eslint-config'],
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.renderer.config.js'
      }
    }
  },
  rules: {
    'tailwindcss/no-custom-classname': [
      2,
      {
        config: tailwindConfig
      }
    ],
    'simple-import-sort/imports': 1,
    'tailwindcss/no-arbitrary-value': 0,
    'global-require': 0
  },
  globals: {
    IS_DEV: 'readonly',
    MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: 'readonly',
    MAIN_WINDOW_WEBPACK_ENTRY: 'readonly'
  }
};
