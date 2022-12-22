const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const IS_DEV = true;

module.exports = {
  stories: ['../modules/**/*.stories.mdx', '../modules/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
    // {
    //   name: "@storybook/addon-postcss",
    //   options: {
    //     postcssLoaderOptions: {
    //       implementation: require("postcss"),
    //     },
    //   },
    // },
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5'
  },
  webpackFinal: (config) => {
    config.module.rules.push({
      test: /\.(scss)$/,
      use: [
        IS_DEV
          ? 'style-loader'
          : {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: './'
              }
            },
        { loader: 'css-loader', options: { sourceMap: IS_DEV } }
      ]
    });
    config.module.rules.push({
      test: /\.(css|scss)$/,
      use: [
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [require('@tailwindcss/nesting'), require('tailwindcss'), require('autoprefixer')]
            }
          }
        }
      ],
      include: path.resolve(__dirname, '../')
    });
    return config;
  }
};
