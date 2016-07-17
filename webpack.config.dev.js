var webpack = require('webpack');
var path = require('path');
var ConfigPlugin = require('webpack-config-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './demo/app.js',
    // css
    // 'normalize.css/normalize.css',
    // 'open-sans-fontface/open-sans.css',
    // 'font-awesome/css/font-awesome.css'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'VERSION': JSON.stringify(require('./package').version)
    }),
    new ConfigPlugin({ dir: path.join(__dirname, 'config') }),
    new CopyWebpackPlugin([
      { from: 'src/img/favicon/favicon.ico' }
    ])
  ],
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ },
      {
        test: /\.(scss|css)$/,
        loaders: [
          'style?sourceMap',
          'css?importLoaders=2&localIdentName=[local]---[name]---[hash:base64:5]',
          'postcss',
          'sass'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=500000&name=[name]-[hash].[ext]'
      },
    ]
  },
  postcss: [
    autoprefixer({ browsers: ['last 2 versions'] })
  ],
  resolve: {
    extensions: ['', '.js', '.json'],
    alias: {
      // 'src': path.join(__dirname, 'src'),
      'js': path.join(__dirname, 'src/js'),
      'style': path.join(__dirname, 'src/style'),
      'img': path.join(__dirname, 'src/img'),
      'api': path.join(__dirname, 'src/js/api'),
      'store': path.join(__dirname, 'src/js/store'),
      'utils': path.join(__dirname, 'src/js/utils'),
      'actions': path.join(__dirname, 'src/js/actions'),
      'reducers': path.join(__dirname, 'src/js/reducers'),
      'selectors': path.join(__dirname, 'src/js/selectors'),
      'constants': path.join(__dirname, 'src/js/constants'),
      'containers': path.join(__dirname, 'src/js/containers'),
      'components': path.join(__dirname, 'src/js/components'),
      'containers_new': path.join(__dirname, 'src/js/containers_new'),
      'components_new': path.join(__dirname, 'src/js/components_new'),
      // 'middleware': path.join(__dirname, 'src/middleware'),
      // 'openseadragon': path.join(__dirname, 'node_modules/OpenSeadragon/build/openseadragon/openseadragon.js')
    }
  }
};
