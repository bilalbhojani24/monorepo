const globalWebpackConfig = require('@browserstack/config/webpack.config');

const path = require('path');

module.exports = {
  ...globalWebpackConfig,
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
};
