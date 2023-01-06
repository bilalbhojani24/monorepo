const bsPrettier = require("@browserstack/prettier-config");
const prettierPluginTalwind = require("prettier-plugin-tailwindcss");

module.exports = {
  ...bsPrettier,
  plugins: [...bsPrettier.plugins, prettierPluginTalwind],
  tailwindConfig: "./tailwind.config.js",
  "pluginSearchDirs": []
};
