/**
 * if you wish to extend this config,
 * add a .prettiecrc.js to your project and
 * require() this package in that file, then
 * remove the 'prettier' property from package.json
 * https://prettier.io/docs/en/configuration.html#sharing-configurations
 */

// explore for rules : http://json.schemastore.org/prettierrc

const prettierPluginTalwind = require('prettier-plugin-tailwindcss');

module.exports = {
  plugins: ['prettier-plugin-css-order', prettierPluginTalwind],
  tailwindConfig: 'packages/tailwind-config/tailwind.config.js',
  pluginSearchDirs: false,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  endOfLine: 'lf',
  arrowParens: 'always',
};
