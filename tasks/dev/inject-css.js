var gulp   = require('gulp');
var inject = require('gulp-inject');
var order  = require("gulp-order");
var rename = require('gulp-rename');
var debug  = require('gulp-debug');

gulp.task('inject-css', function () {
  var css = gulp.src(['dist/css/vendor.css', 'dist/css/chato.css'], { base: process.cwd() })
  .pipe(order([
    'dist/css/vendor.css',
    'dist/css/chato.css'
  ]))
  .pipe(rename(function (path) {
    path.dirname = '../css/' + path.dirname.split('/').slice(2).join('/');
  }));

  return gulp.src('dist/index.html')
  .pipe(inject(css, { addRootSlash: false }))
  .pipe(gulp.dest('dist'));
});