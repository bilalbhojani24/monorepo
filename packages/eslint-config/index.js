const prettierConfig = require('../prettier-config');

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
    es2021: true
  },
  extends: [
    'airbnb',
    'prettier',
    'plugin:react-hooks/recommended',
    'plugin:sonarjs/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:lodash/recommended'
  ],
  globals: {},
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  plugins: [
    'prettier',
    'react',
    'react-hooks',
    'jsx-a11y',
    'jest',
    'simple-import-sort',
    'sonarjs',
    'tailwindcss',
    'lodash'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  ignorePatterns: ['node_modules/'],
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // Packages `react` related packages come first.
              ['^react', '^@?\\w'],
              // Internal packages.
              ['^(@|components)(/.*|$)'],
              // Side effect imports.
              ['^\\u0000'],
              // Parent imports. Put `..` last.
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              // Other relative imports. Put same-folder imports and `.` last.
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              // Style imports.
              ['^.+\\.?(css)$']
            ]
          }
        ]
      }
    },
    {
      files: ['*.stories.jsx'],
      rules: {
        'no-console': 0
      }
    }
  ],
  rules: {
    'comma-dangle': 0,
    'prettier/prettier': [2, prettierConfig],
    'import/prefer-default-export': 0,
    'max-len': 0,
    'no-console': 1,
    'no-unused-vars': 1,
    'no-tabs': [2, { allowIndentationTabs: true }],
    'jsx-a11y/label-has-associated-control': [
      2,
      { required: { some: ['nesting', 'id'] } }
    ],
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state']
      }
    ],
    // This is good for accessibility
    'jsx-a11y/click-events-have-key-events': 2,
    'func-names': 0,
    'react/jsx-props-no-spreading': 0,
    'import/no-cycle': 0,
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
    'simple-import-sort/imports': 2,
    'simple-import-sort/exports': 2,
    'tailwindcss/classnames-order': 1,
    'tailwindcss/enforces-negative-arbitrary-values': 1,
    'tailwindcss/enforces-shorthand': 2,
    'tailwindcss/migration-from-tailwind-2': 2,
    'tailwindcss/no-arbitrary-value': 2,
    'tailwindcss/no-custom-classname': 2,
    'tailwindcss/no-contradicting-classname': 2,
    'lodash/prefer-lodash-method': 'off'
  }
};
