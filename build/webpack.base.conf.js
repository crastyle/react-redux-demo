var path = require('path')
var utils = require('./utils')
var config = require('../config')
var webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: ['babel-polyfill', 'react-hot-loader/patch', './client/src/index.js']
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': resolve('src'),
      'react-draft-wysiwyg-css': path.join(__dirname, '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css')
    }
  },
  externals:{
    glob: 'glob',
    path: 'path'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['react-hot-loader/webpack', 'babel-loader'],
        include: [resolve('client'), resolve('server'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.BROWSER': JSON.stringify(true)
    })
  ]
}
