var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var del = require('del');

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

gulp.task('clean', function(done) {
    del(['dist/'], done);
});

gulp.task('build', function () {
  return gulp
    .src('src/**/*.scss')
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(postcss([require('autoprefixer')({ browsers: [
      '>1%',
      'last 4 versions',
      'Firefox ESR',
      'not ie < 11']
    })]))
    .pipe(gulp.dest('dist/'))
    .pipe(postcss([ require('cssnano')() ]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/'));
});
