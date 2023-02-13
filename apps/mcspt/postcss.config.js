const globalConfigs = require('@browserstack/tailwind-config');

const mcppc = {
  ...globalConfigs.globalPostcssConfig
};

mcppc.plugins = {
  'tailwindcss/nesting': {},
  ...globalConfigs.globalPostcssConfig.plugins
};

module.exports = mcppc;
