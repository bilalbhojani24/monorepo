const { resolve } = require('path');
const { DefinePlugin } = require('webpack');
const commonRules = require('./webpack.rules');

commonRules.push({
  test: /\.(scss|css)$/,
  use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
});

commonRules.push({ test: /\.(png|jpg|gif)$/i, type: 'asset/resource' });

module.exports = {
  // Put your normal webpack config below here

  resolve: {
    alias: {
      api: resolve(__dirname, 'src/api/'),
      features: resolve(__dirname, 'src/features/'),
      utils: resolve(__dirname, 'src/utils/'),
      constants: resolve(__dirname, 'src/constants/'),
      assets: resolve(__dirname, 'src/assets/')
    }
  },
  output: {
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  module: {
    rules: commonRules
  },
  devtool: !process.argv.includes('IS_PROD') ? 'eval-source-map' : undefined,
  plugins: [
    new DefinePlugin({
      IS_DEV: JSON.stringify(process.argv.includes('IS_DEV')),
      IS_PROD: JSON.stringify(process.argv.includes('IS_PROD')),
      IS_WEB: false,
      IS_ELECTRON: true
    })
  ]
};