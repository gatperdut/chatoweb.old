var gulp        = require('gulp');
var http        = require('http');
var connect     = require('connect');
var serveStatic = require('serve-static');
var open        = require('open');
var proxy       = require('proxy-middleware');
var url         = require("url");

gulp.task('play', function () {
  var port = 9000;

  var app = connect()
  .use(serveStatic(__dirname + './../../dist/'))
  .use('/api', proxy(url.parse('http://localhost:3000')));

  http.createServer(app).listen(port, function () {
    //open('http://localhost:' + port);
  });
});