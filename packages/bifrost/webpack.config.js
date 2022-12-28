const globalWebpackConfig = require('@browserstack/webpack-config');

const path = require('path');

module.exports = {
  ...globalWebpackConfig,
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  externals: {
    react: 'react',
  },
};
