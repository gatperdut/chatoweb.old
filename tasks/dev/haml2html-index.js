var gulp = require('gulp');
var haml = require('gulp-ruby-haml');
var debug = require('gulp-debug');
var prettify = require('gulp-prettify');

gulp.task('haml2html-index', function() {
  return gulp.src('app/src/haml/index.haml')
  .pipe(haml({ doubleQuote: true }).on('error', function(e) { console.log(e.message); }))
  .pipe(prettify({ indent_size: 2 }))
  .pipe(gulp.dest('dist'));
});