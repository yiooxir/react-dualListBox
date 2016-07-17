var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');
// var HtmlWebpackPlugin = require('html-webpack-plugin');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  // entry: [
  //   './src/js/index.js',
  //   './src/scss/style.scss'
  // ],

  output: {
    path: __dirname + '/dist/',
    filename: 'index.js',
    // libraryTarget: 'umd'
  },

  debug: false,
  devtool: false,
  entry: './src/index.js',

  stats: {
    colors: true,
    reasons: false
  },


  // output: {
  //   path: path.join(__dirname, 'dist'),
  //   filename: 'bundle.js'
  // },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    // new ExtractTextPlugin('app.css'),
    // new HtmlWebpackPlugin({
    //   template: './src/index.jade'
    // }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true
      },
      comments: false,
      sourceMap: false
    })
  ],
  resolve: {
    extensions: ['', '.js']
  },

  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ },
      {
        test: /\.(scss|css)$/,
        loaders: [
          // 'style?sourceMap',
          'css?importLoaders=2&localIdentName=[local]---[name]---[hash:base64:5]',
          'postcss',
          'sass'
        ]
      },
      // { test: /\.(scss|css)$/, loader: ExtractTextPlugin.extract('style', 'css!sass!postcss') },
      // { test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=500000' }
    ]
  },
  postcss: [
    autoprefixer({ browsers: ['last 2 versions'] })
  ]
}
