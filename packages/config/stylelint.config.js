module.exports = {
  plugins: ["stylelint-scss", "./plugins/variableLintRule.js"],
  extends: ["stylelint-config-standard", "stylelint-prettier/recommended"],
  ignoreFiles: ["app/speedlab/Icons/styles/*.scss"],
  rules: {
    "browserstack/consistent-css-variables": [
      ["color", "font-size"],
      {
        ignoreValues: ["transparent", "inherit", "initial"],
        mappedFiles: {
          //   "live-env": {
          //     filePath: "app/(live)|(app_live)",
          //     styles: "app/live_shared/_styles",
          //   },
        },
      },
    ],
    "string-quotes": "single",
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,
    "selector-pseudo-element-colon-notation": "single",
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["export"],
      },
    ],
    "property-no-unknown": [
      true,
      {
        ignoreSelectors: [":export"],
      },
    ],
  },
};
