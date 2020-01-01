var _ = require('lodash');
var gulp = require('gulp');
var brfs = require('gulp-brfs');
var source = require('vinyl-source-stream');

/**
 * Bundle code into browser compatible file
 */

gulp.task('bundle', function () {
  return gulp.src('lib/**/*.js', { buffer: false })
    .pipe(brfs())
    .pipe(gulp.dest('pkg'));
});


/**
 * Create examples contents
 */

gulp.task('examples', function () {
  var termcolors = require('./lib/index');
  _.each(termcolors, function (format, name) {
    if (!format.hasOwnProperty('export')) return;
    var file = source(name + '.txt');
    file.write(format.export(termcolors.defaults.colors));
    file.pipe(gulp.dest('./examples', {
      mode: '644'
    }));
  });
});

gulp.task('default', gulp.parallel('bundle'));

