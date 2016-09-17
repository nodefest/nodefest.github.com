'use strict';
import gulp from 'gulp';
import util from 'gulp-util';
import plumber from 'gulp-plumber';
import ejs from 'gulp-ejs';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import cleancss from 'gulp-clean-css';

const browserSync = require('browser-sync').create();
const srcPaths = {
        html: './src/html/*.ejs',
        css:  './src/scss/main.scss'
      };
const destPath = './';

gulp.task('html', () => {
  return gulp
    .src(srcPaths.html)
    .pipe(ejs({
      msg: 'Hello Gulp!'
    }, { ext: '.html' }))
    .pipe(plumber((error) => {
      util.log(util.colors.red(error.message));
      gulp.task('html').emit('end');
    }))
    .pipe(gulp.dest(destPath));
});

gulp.task('css', () => {
  return gulp
    .src(srcPaths.css)
    .pipe(sass({ style: 'expanded' }))
    .pipe(plumber((error) => {
      util.log(util.colors.red(error.message));
      gulp.task('css').emit('end');
    }))
    .pipe(autoprefixer())
    .pipe(cleancss())
    .pipe(gulp.dest(destPath))
    .pipe(browserSync.stream());
});

gulp.task('server', ['html', 'css'], () => {
  browserSync.init({
    port: 4000,
    server: {
      baseDir: destPath,
    },
    ui: {
      port: 4001
    }
  });

  gulp.watch(srcPaths.html, ['html']).on('change', browserSync.reload);
  gulp.watch(srcPaths.css, ['css']).on('change', browserSync.reload);
});

gulp.task('default', ['html', 'css', 'server']);
