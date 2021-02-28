var gulp  = require('gulp');
var debug = require('gulp-debug');

gulp.task('copy-vendor-js', function () {
  return gulp.src(
    [
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-bootstrap/ui-bootstrap.min.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
      'bower_components/angularjs-slider/dist/rzslider.min.js',
      'bower_components/angular-ui-select/dist/select.min.js',
      'bower_components/angular-sanitize/angular-sanitize.min.js',
      'bower_components/angular-drag-and-drop-lists/angular-drag-and-drop-lists.min.js',
      'bower_components/vis/dist/vis.min.js',
      'bower_components/angular-visjs/angular-vis.js',
      'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
      'bower_components/underscore/underscore.js',
      'bower_components/angular-ui-notification/dist/angular-ui-notification.js',
      'bower_components/moment/min/moment.min.js',
      'bower_components/ng-tags-input/ng-tags-input.min.js',
      'bower_components/socket.io-client/dist/socket.io.js',
      'bower_components/angular-socket-io/socket.min.js'
    ],
    { base: process.cwd() + '/bower_components' }
  )
  .pipe(gulp.dest('dist/js/vendor'));
});