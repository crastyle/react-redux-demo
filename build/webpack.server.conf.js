var path = require('path')
var webpack = require('webpack')
var reporter = require('postcss-reporter')
var cssNext = require('postcss-cssnext')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const rootFolder = path.resolve(__dirname, '..');

const config = {
  target: 'node',

  node: {
    __filename: true,
    __dirname: true
  },

  context: rootFolder,

  entry: {
    server: ['./server/src/index.js']
  },

  output: {
    path: path.resolve(rootFolder, 'static/assets'),
    publicPath: '/assets/',
    // filename: '[name].[hash].js'
  },

  externals: require('fs').readdirSync(path.resolve(__dirname, '..', 'node_modules')).reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod
    return ext
  }, {}),

  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        // exclude: /node_modules/,
        use: 'url-loader?limit=10000'
      },
      {
        test: /\.(eot|ttf|wav|mp3)$/,
        use: 'file-loader',
        // exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules&localIdentName=[hash:8]', 'sass-loader']
        })
      },
      {
        test: /\.(css)$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader?modules&localIdentName=[hash:8]',
            options: {
              importLoaders: 2,
              sourceMap: true
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(true),
    // new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('style.css'),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        postcss: [
          cssNext({
            browsers: ['last 1 version']
          }),
          reporter
        ]
      }
    })
  ],

  resolve: {
    extensions: ['*', '.js', '.css', '.html'],
    modules: ['src', 'node_modules'],
    alias: {
      app: path.resolve(rootFolder, 'src/app')
    }
  }
};

module.exports = config;