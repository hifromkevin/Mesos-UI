const path = require('path');
const DIST_DIR = path.join(__dirname, 'client/dist')

module.exports = {
  entry: ['./client/src/index.jsx'],
  mode: 'development',
  output: {
    path: DIST_DIR,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.sass$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    contentBase: DIST_DIR,
    compress: true,
    port: 9000
  }
};