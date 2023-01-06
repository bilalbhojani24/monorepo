const prettierConfig = require("./.prettierrc.js");

module.exports = {
  extends: ["@browserstack/eslint-config"],
  rules: {
    "prettier/prettier": [2, prettierConfig],
  },
};
