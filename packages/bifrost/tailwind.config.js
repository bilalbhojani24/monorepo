const globalConfig = require("../config/tailwind.config");

module.exports = {
  ...globalConfig,
  plugins: [require("@tailwindcss/forms")],
};
