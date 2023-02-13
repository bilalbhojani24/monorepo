module.exports = {
  extends: ['@browserstack/eslint-config'],
  rules: {
    'tailwindcss/no-custom-classname': [
      2,
      {
        whitelist: [
          '(bg|text|border)-(base|brand|danger|success|attention|info|)-(50|100|200|300|400|500|600|700|800|900)'
        ]
      }
    ],
    'tailwindcss/no-arbitrary-value': 0,
    'react/prop-types': 0,
    'global-require': 0
  }
};
