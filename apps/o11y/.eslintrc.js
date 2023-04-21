const path = require('path');
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
    'lodash/prefer-lodash-method': 'off',
    'lodash/prefer-lodash-typecheck': 'off',
    'lodash/prefer-constant': 'off',
    'lodash/prefer-noop': 'off',
    'lodash/prefer-includes': 'off',
    'lodash/prefer-startswith': 'off'
  },
  settings: {
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname, 'src')]
      }
    }
  }
};
