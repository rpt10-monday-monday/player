const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: __dirname + '/client',
  entry: './index.js',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'env']
        },
      },
      { test: /\.mp3$/,
        loader: 'file-loader'
      },
      {
        test: /\.css$/,
        use: [
          {loader: "style-loader"},
          {loader: "css-loader"}
        ]
      }
    ],
  },
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js',
  }
};