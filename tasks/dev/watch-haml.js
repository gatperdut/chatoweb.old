var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('watch-haml', function() {
  gulp.watch(['app/src/haml/**/*.haml', '!app/src/haml/index.haml'], function() {
    runSequence(
      'haml2html',
      'templates-cache'
    )
  });
});