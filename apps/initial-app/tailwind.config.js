const globalCssConfigs = require("tailwind-bs-config");

module.exports = {
  ...globalCssConfigs.globalTailwindConfig,
  plugins: [require("@tailwindcss/forms")],
};
