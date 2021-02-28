var gulp = require('gulp');

gulp.task('watch-js', function() {
  gulp.watch('app/src/js/**/*.js',  ['copy-chato-js']);
});