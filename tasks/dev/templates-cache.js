var gulp = require('gulp');
var haml = require('gulp-ruby-haml');
var templateCache = require('gulp-angular-templatecache');

gulp.task('templates-cache', function() {
  return gulp.src('dist/html/**/*.html')
  .pipe(templateCache({root: '/html/', module: 'templates-cache', standalone: true }))
  .pipe(gulp.dest('dist/js/chato'));
});

