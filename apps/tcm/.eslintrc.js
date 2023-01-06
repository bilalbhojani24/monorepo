const path = require('path');
const prettierConfig = require('./.prettierrc.js');

module.exports = {
  extends: ['@browserstack/eslint-config'],
  rules: {
    'prettier/prettier': [2, prettierConfig],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname, 'src')],
      },
    },
  },
};
