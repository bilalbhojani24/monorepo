const tailwindConfig = require('./tailwind.config.js');
const webpackConfig = require('./webpack.renderer.config');

module.exports = {
  extends: ['@browserstack/eslint-config'],
  settings: {
    'import/resolver': {
      webpack: {
        config: webpackConfig
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
    'import/no-extraneous-dependencies': 0,
    'global-require': 0
  },
  globals: {
    IS_DEV: 'readonly',
    MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: 'readonly',
    MAIN_WINDOW_WEBPACK_ENTRY: 'readonly',
    SPLASH_WEBPACK_ENTRY: 'readonly'
  }
};
