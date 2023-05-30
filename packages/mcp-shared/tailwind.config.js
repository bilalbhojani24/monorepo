const globalConfigs = require('@browserstack/tailwind-config');
const tailwindSupportedScssNesting = require('@tailwindcss/nesting');

const mcpSharedTailwindConfig = {
  ...globalConfigs.globalTailwindConfig
};

mcpSharedTailwindConfig.plugins.push(tailwindSupportedScssNesting);

module.exports = mcpSharedTailwindConfig;
