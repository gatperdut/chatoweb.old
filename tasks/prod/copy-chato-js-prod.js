var gulp  = require('gulp');
var cache = require('gulp-cached');
var rev = require('gulp-rev');

gulp.task('copy-chato-js-prod', function () {
  return gulp.src(['app/src/js/**/*.js'])
  .pipe(cache('js'))
  .pipe(rev())
  .pipe(gulp.dest('dist/js/chato'))
});