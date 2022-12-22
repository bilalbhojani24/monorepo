module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-browserstack`
  extends: ["browserstack"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
