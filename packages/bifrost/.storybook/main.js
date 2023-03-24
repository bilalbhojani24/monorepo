const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const IS_DEV = true;

module.exports = {
  stories: ['../modules/**/*.stories.mdx', '../modules/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    "storybook-addon-designs",
    {
      name: 'storybook-addon-sass-postcss',
      options: {
        loadSassAfterPostCSS: true,
        postcssLoaderOptions: {
          implementation: require('postcss')
        },
        rule: {
          test: /\.(scss|sass)$/i
        }
      }
    }
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5'
  },
  webpackFinal: (config) => {
    return config;
  }
};
