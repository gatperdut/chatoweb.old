var gulp = require('gulp');

gulp.task('copy-assets', function () {
  return gulp.src(['app/assets/**/*'])
  .pipe(gulp.dest('dist/assets'))
});