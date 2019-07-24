const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: "./dist",
    }
  })
})

const paths = {
  src: {
    html: 'src/*.html',
    css: 'src/scss/**/*.scss',
  },
  dist: {
    html: 'dist/',
    css: 'dist/css',
  }
}

gulp.task('bundleHtml', () => {
  return gulp.src(paths.src.html)
    .pipe(gulp.dest(paths.dist.html))
    .pipe(browserSync.stream())
});

gulp.task('bundleCss', () => {
  return gulp.src(paths.src.css)
    .pipe(sourcemaps.init())
    .pipe(sass({
      errorLogToConsole: true,
      outputStyle: 'compressed',
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dist.css))
    .pipe(browserSync.stream())
})


gulp.task('watch', () => {
  gulp.watch(paths.src.css, gulp.series('bundleCss'))
})

gulp.task('default', gulp.parallel(['bundleHtml', 'bundleCss', 'browser-sync', 'watch']))