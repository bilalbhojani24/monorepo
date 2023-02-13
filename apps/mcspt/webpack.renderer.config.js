const rules = require('./webpack.rules');

rules.push({
  test: /\.(scss|css)$/,
  use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules
  }
};
