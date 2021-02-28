var gulp = require('gulp');

gulp.task('watch-index-haml', function() {
  gulp.watch('app/src/haml/index.haml', function() {
    runSequence(
      'haml2html-index',
      'inject-js',
      'inject-css'
    )
  });
});