'use strict';
const fs = require('fs');
const gulp = require('gulp');
const util = require('gulp-util');
const plumber = require('gulp-plumber');
const ejs = require('gulp-ejs');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');

const browserSync = require('browser-sync').create();
const srcDirs = {
  html: './src/html',
  json: './src/json',
  js:   './src/js',
  css:  './src/scss'
};
const srcPaths = {
  html: `${srcDirs.html}/*.ejs`,
  js:   `${srcDirs.js}/main.js`,
  css:  `${srcDirs.css}/main.scss`
};
const destPath = './';

const json = {};
fs.readdirSync('./src/json')
  .map((fName) => { return fName.split('.json')[0]; })
  .forEach((key) => {
    Object.assign(json, { [key]: require(`./src/json/${key}.json`) });
  });


gulp.task('html', () => {
  return gulp
    .src(srcPaths.html)
    .pipe(plumber((error) => {
      util.log(util.colors.red(error.message));
      gulp.task('html').emit('end');
    }))
    .pipe(ejs(json, { ext: '.html' }))
    .pipe(gulp.dest(destPath))
    .pipe(browserSync.stream());
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

gulp.task('js', () => {
  return browserify({
      entries: [srcPaths.js]
    })
    .bundle()
    .pipe(plumber((error) => {
      util.log(util.colors.red(error.message));
      gulp.task('js').emit('end');
    }))
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(destPath))
    .pipe(browserSync.stream());
});

gulp.task('server', ['html', 'css', 'js', 'watch'], () => {
  browserSync.init({
    port: 4000,
    server: {
      baseDir: destPath,
    },
    ui: {
      port: 4001
    }
  });
});

gulp.task('watch', () => {
  gulp.watch(`${srcDirs.html}/**/*.ejs`,  ['html']).on('change', browserSync.reload);
  gulp.watch(`${srcDirs.json}/**/*.json`, ['html']).on('change', browserSync.reload);
  gulp.watch(`${srcDirs.css}/**/*.css`,   ['css']).on('change', browserSync.reload);
  gulp.watch(`${srcDirs.js}/**/*.js`,     ['js']).on('change', browserSync.reload);
});

gulp.task('default', ['html', 'css', 'js', 'server']);
gulp.task('dev', ['html', 'css', 'js', 'watch']);
