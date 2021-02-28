var gulp = require('gulp');
var haml = require('gulp-ruby-haml');
var debug = require('gulp-debug');
var prettify = require('gulp-prettify');
var cache = require('gulp-cached');

gulp.task('haml2html', function() {
  return gulp.src(['app/src/haml/**/*.haml', '!app/src/haml/index.haml'])
  .pipe(cache('haml'))
  .pipe(haml({ doubleQuote: true }).on('error', function(e) { console.log(e.message); }))
  .pipe(prettify({ indent_size: 2 }))
  .pipe(gulp.dest('dist/html'));
});