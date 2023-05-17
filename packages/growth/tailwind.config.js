const globalConfigs = require('@browserstack/tailwind-config');

const integrationsTailwindConfig = {
  ...globalConfigs.globalTailwindConfig,
  content: [
    'modules/**/*.{js,jsx}',
    './node_modules/@browserstack/bifrost/dist/*js'
  ]
};

module.exports = integrationsTailwindConfig;
