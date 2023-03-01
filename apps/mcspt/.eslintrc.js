const tailwindConfig = require('./tailwind.config.js');

module.exports = {
  extends: ['@browserstack/eslint-config'],
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
    IS_DEV: 'readonly'
  }
};
