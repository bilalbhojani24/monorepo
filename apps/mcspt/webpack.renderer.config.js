const { DefinePlugin } = require('webpack');
const rules = require('./webpack.rules');

rules.push({
  test: /\.(scss|css)$/,
  use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules
  },
  plugins: [
    new DefinePlugin({
      IS_DEV: JSON.stringify(process.argv.includes('IS_DEV'))
    })
  ]
};
