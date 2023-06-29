const globalConfigs = require('@browserstack/tailwind-config');

module.exports = {
  ...globalConfigs.globalTailwindConfig,
  content: [
    'src/**/*.{js,jsx}',
    './node_modules/@browserstack/bifrost/dist/*.{js,jsx}',
    './node_modules/@browserstack/growth/dist/*.{js,jsx}',
    './node_modules/@browserstack/webex/dist/*.{js,jsx}'
  ]
};
