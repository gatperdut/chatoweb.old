var gulp = require('gulp');
var inject = require('gulp-inject');
var order = require("gulp-order");
var merge = require('merge2');
var rename = require('gulp-rename');
var debug = require('gulp-debug');

gulp.task('inject-js', function () {
  var vendor = gulp.src(['dist/js/vendor/**/*.js'], { base: process.cwd() })
  .pipe(order([
    'dist/js/vendor/jquery/dist/jquery.js',
    'dist/js/vendor/angular/angular.js',
    'dist/js/vendor/vis/dist/vis.min.js',
    'dist/js/socket.io-client/dist/socket.io.js',
    'dist/js/angular-socket-io/socket.min.js',
    '**/*.js'
  ]))
  .pipe(rename(function (path) {
    path.dirname = '../js/vendor/' + path.dirname.split('/').slice(3).join('/');
  }));

  var chato = gulp.src(['dist/js/chato/**/*.js'], { base: process.cwd() })
  .pipe(rename(function (path) {
    path.dirname = '../js/chato/' + path.dirname.split('/').slice(3).join('/');
  }));

  var all = merge(vendor, chato);

  return gulp.src('dist/index.html')
  .pipe(inject(all, { addRootSlash: false }))
  .pipe(gulp.dest('dist'));
});