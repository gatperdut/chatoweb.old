var gulp = require('gulp');
var sass = require('gulp-sass');
var debug = require('gulp-debug');
var sassglob = require('gulp-sass-glob');

gulp.task('copy-chato-css', function () {
  return gulp.src('app/src/css/chato.scss')
  .pipe(sassglob())
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('dist/css'))
});