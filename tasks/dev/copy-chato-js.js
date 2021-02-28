var gulp  = require('gulp');
var cache = require('gulp-cached');

gulp.task('copy-chato-js', function () {
  return gulp.src(['app/src/js/**/*.js'])
  .pipe(cache('js'))
  .pipe(gulp.dest('dist/js/chato'))
});