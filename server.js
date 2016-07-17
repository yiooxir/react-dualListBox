var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var app = express();
var compiler = webpack(config);

var HOST = process.env.HOST || 'localhost';
var PORT = process.env.PORT || '8000';

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'demo/index.html'));
});

app.listen(PORT, HOST, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://' + HOST + ':' + PORT);
});
