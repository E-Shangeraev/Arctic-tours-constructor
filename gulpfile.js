let gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  babel = require('gulp-babel'),
  autoprefixer = require('gulp-autoprefixer');

gulp.task(function scss() {
  return gulp
    .src('app/scss/**/style.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 8 versions'],
      }),
    )
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('css', function () {
  return gulp
    .src([
      // 'node_modules/normalize.css/normalize.css',
      'node_modules/slick-carousel/slick/slick.css',
    ])
    .pipe(concat(libs.scss));
});

gulp.task('html', function () {
  return gulp.src('app/*.html').pipe(browserSync.reload({ stream: true }));
});

gulp.task('script', function () {
  return gulp.src('app/js/*.js').pipe(browserSync.reload({ stream: true }));
});

gulp.task('php', function () {
  return gulp.src('app/**/*.php').pipe(browserSync.reload({ stream: true }));
});

gulp.task(function watch() {
  gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch('app/*.html', gulp.parallel('html'));
  gulp.watch('app/js/*.js', gulp.parallel('script'));
  gulp.watch('app/**/*.php', gulp.parallel('php'));
});

gulp.task('browser-sync', function () {
  browserSync.init({
    proxy: 'arc',
  });
});

gulp.task('default', gulp.parallel('scss', 'browser-sync', 'watch'));
