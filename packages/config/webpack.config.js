const path = require('path');

const resolveLoaderViaDirname = (loaderName) => {
  return path.resolve(`${__dirname}/node_modules/${loaderName}`);
};

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        loader: resolveLoaderViaDirname('babel-loader'), // "babel-loader",
        resolve: { extensions: ['.js', '.jsx'] },
        test: /\.js(?:|x)$/,
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
};
