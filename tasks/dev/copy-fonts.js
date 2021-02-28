var gulp = require('gulp');

gulp.task('copy-fonts', function () {
  gulp.src(
    [
      'bower_components/components-font-awesome/fonts/fontawesome-webfont.woff',
      'bower_components/components-font-awesome/fonts/fontawesome-webfont.woff2',
    ]
  )
  .pipe(gulp.dest('dist/fonts'));

  return gulp.src(
    [
      'bower_components/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.woff2',
      'bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.woff',
      'bower_components/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.ttf'
    ]
  ).pipe(gulp.dest('dist/fonts/bootstrap'))
      
});