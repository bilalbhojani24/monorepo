const globalWebpackConfig = require('webpack-config');

const path = require('path');

module.exports = {
  ...globalWebpackConfig,
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};
