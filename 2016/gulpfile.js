'use strict';
const gulp = require('gulp');
const util = require('gulp-util');
const plumber = require('gulp-plumber');
const ejs = require('gulp-ejs');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');

const browserSync = require('browser-sync').create();
const srcPaths = {
        html: './src/html/*.ejs',
        css:  './src/scss/main.scss'
      };
const destPath = './';

gulp.task('html', () => {
  return gulp
    .src(srcPaths.html)
    .pipe(plumber((error) => {
      util.log(util.colors.red(error.message));
      gulp.task('html').emit('end');
    }))
    .pipe(ejs({
      /**
       * 全ページで共通して使いたい変数とかあれば
       * ここでjsonとかぶっこめばいいけど
       * たぶんない
       *
       */
    }, { ext: '.html' }))
    .pipe(gulp.dest(destPath));
});

gulp.task('css', () => {
  return gulp
    .src(srcPaths.css)
    .pipe(plumber((error) => {
      util.log(util.colors.red(error.message));
      gulp.task('css').emit('end');
    }))
    .pipe(sass({ style: 'expanded' }))
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
