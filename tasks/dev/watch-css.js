var gulp = require('gulp');

gulp.task('watch-css', function() {
  gulp.watch('app/src/css/**/*.scss',  ['copy-chato-css']);
});