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
const del = require('del');

const srcDirs = {
  html: './src/html',
  json: './src/json',
  js:   './src/js',
  css:  './src/scss',
};
const srcPaths = {
  html: `${srcDirs.html}/*.ejs`,
  js:   `${srcDirs.js}/main.js`,
  css:  `${srcDirs.css}/main.scss`,
};
const destPath = './';

const json = fs.readdirSync('./src/json')
  .map(fName => fName.split('.json')[0])
  .reduce((cur, acc) => {
    return Object.assign(cur, { [acc]: require(`./src/json/${acc}.json`) });
  }, {});


gulp.task('html', () => {
  return gulp
    .src(srcPaths.html)
    .pipe(plumber((error) => {
      util.log(util.colors.red(error.message));
      gulp.task('html').emit('end');
    }))
    .pipe(ejs(json, {}, { ext: '.html' }))
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
    .pipe(gulp.dest(destPath));
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
    .pipe(gulp.dest(destPath));
});

gulp.task('watch', () => {
  gulp.watch(`${srcDirs.html}/**/*.ejs`,  ['html']);
  gulp.watch(`${srcDirs.json}/**/*.json`, ['html']);
  gulp.watch(`${srcDirs.css}/**/*.scss`,  ['css']);
  gulp.watch(`${srcDirs.js}/**/*.js`,     ['js']);
});

gulp.task('clean', del.bind(null, ['./*.html', './*.ejs']));

gulp.task('dev', ['build', 'watch']);
gulp.task('build', ['clean', 'html', 'css', 'js']);
