const globalConfigs = require('@browserstack/tailwind-config');

module.exports = {
  ...globalConfigs.globalTailwindConfig,
  content: [
    'src/**/*.{js,jsx}',
    './node_modules/@browserstack/bifrost/dist/*.js'
  ]
};
