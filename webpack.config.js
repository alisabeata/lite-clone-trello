const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    hot: true,
    publicPath: '/'
  },
  
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
        },
        output: {
          comments: false,
        },
      }
    }),
    
    new webpack.HotModuleReplacementPlugin()
  ]
};
