const globalTailwindConfigs = require('@browserstack/config/tailwind.config');

module.exports = {
  ...globalTailwindConfigs,
  plugins: [require('@tailwindcss/forms')],
};
