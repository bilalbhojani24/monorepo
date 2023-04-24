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
    'react/forbid-prop-types': 'off',
    'react/no-array-index-key': 'off'
  }
};
