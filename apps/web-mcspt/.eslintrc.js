const tailwindConfig = require('./tailwind.config.js');

module.exports = {
  extends: ['@browserstack/eslint-config'],
  rules: {
    'tailwindcss/no-custom-classname': [
      2,
      {
        config: tailwindConfig
      }
    ]
  },
  globals: {
    IS_DEV: 'readonly',
    IS_PROD: 'readonly'
  }
};
