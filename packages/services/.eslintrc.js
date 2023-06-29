const tailwindConfig = require('./tailwind.config.js');

module.exports = {
  extends: ['@browserstack/eslint-config', 'plugin:storybook/recommended'],
  rules: {
    'tailwindcss/no-custom-classname': [
      2,
      {
        config: tailwindConfig
      }
    ]
  }
};
