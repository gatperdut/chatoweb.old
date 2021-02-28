var gulp = require('gulp');
var runSequence = require('run-sequence');
var requireDir = require('require-dir');

requireDir('./tasks/dev',  { recurse: true });
requireDir('./tasks/prod', { recurse: true });

gulp.task('build', function() {
  runSequence(
    'clean',
    'haml2html',
    'haml2html-index',
    'templates-cache',
    [
      'copy-fonts',
      'copy-assets',
      'copy-vendor-css',
      'copy-chato-css',
      'copy-chato-js',
      'copy-vendor-js'
    ],
    'inject-js',
    'inject-css'
  );
});

gulp.task('build-prod', function() {
  runSequence(
    'clean',
    'haml2html',
    'haml2html-index',
    'templates-cache-prod',
    [
      'copy-fonts',
      'copy-assets',
      'copy-vendor-css',
      'copy-chato-css',
      'copy-chato-js-prod',
      'copy-vendor-js'
    ],
    'inject-js',
    'inject-css'
  );
});

gulp.task('default', function() {
  runSequence('play',
              'watch-haml',
              'watch-index-haml',
              'watch-js',
              'watch-css'
             );
});
