var gulp = require('gulp');
var haml = require('gulp-ruby-haml');
var templateCache = require('gulp-angular-templatecache');
var rev = require('gulp-rev');

gulp.task('templates-cache-prod', function() {
  return gulp.src('dist/html/**/*.html')
  .pipe(templateCache({root: '/html/', module: 'templates-cache', standalone: true }))
  .pipe(rev())
  .pipe(gulp.dest('dist/js/chato'));
});

