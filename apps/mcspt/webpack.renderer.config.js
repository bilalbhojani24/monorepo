// eslint-disable-next-line import/no-extraneous-dependencies
const { resolve } = require('path');
const { DefinePlugin } = require('webpack');
const rules = require('./webpack.rules');

rules.push({
  test: /\.(scss|css)$/,
  use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
});

module.exports = {
  // Put your normal webpack config below here

  resolve: {
    alias: {
      api: resolve(__dirname, 'src/api/'),
      features: resolve(__dirname, 'src/features/'),
      utils: resolve(__dirname, 'src/utils/'),
      constants: resolve(__dirname, 'src/constants/')
    }
  },
  module: {
    rules
  },
  plugins: [
    new DefinePlugin({
      IS_DEV: JSON.stringify(process.argv.includes('IS_DEV'))
    })
  ]
};
