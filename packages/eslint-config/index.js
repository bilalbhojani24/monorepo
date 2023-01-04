module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true
  },
  extends: ['airbnb', 'airbnb/hooks', 'plugin:prettier/recommended'],
  parser: 'babel-eslint',
  settings: {
    'import/resolver': { node: {}, webpack: {} },
    react: { version: 'detect' }
  },
  rules: {
    // New React
    'comma-dangle': ['error', 'never'],
    'jsx-a11y/click-events-have-key-events': 'off',
    'no-param-reassign': 'off',
    'no-tabs': ['error', { allowIndentationTabs: true }],
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-curly-brace-presence': 'off',
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
    'jsx-a11y/label-has-associated-control': ['error', { required: { some: ['nesting', 'id'] } }],
    'react/jsx-props-no-spreading': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'react/sort-comp': 'off',
    'react/state-in-constructor': 'off',
    'react/button-has-type': 'off',
    'react/static-property-placement': 'off',
    'func-names': 'off',
    'import/no-cycle': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/prefer-default-export': 'off', // For ref: https://github.com/airbnb/javascript/issues/1365#issue-220713862
    // Old React
    'react/no-unused-prop-types': 'warn',
    'no-extend-native': 'warn',
    'no-console': 'off',
    eqeqeq: 'off'
  },
  globals: {}
};
