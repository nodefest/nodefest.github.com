'use strict';
const fse = require('fse');
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
const confCal = require('conf-cal');

const srcDirs = {
  html: './src/html',
  json: './src/json',
  js:   './src/js',
  css:  './src/scss',
  confcal: './src/confcal',
};
const srcPaths = {
  html: `${srcDirs.html}/*.ejs`,
  js:   `${srcDirs.js}/main.js`,
  css:  `${srcDirs.css}/main.scss`,
};
const destPath = './';

function readSchedule () {
  const calendar = {};
  return fse.readdir(`${__dirname}/src/confcal`)
    .then(fNames =>
      fNames.map(fName => {
        const parts = /^([^.]*).confcal$/.exec(fName);
        if (parts) {
          return parts[1];
        }
      }).filter(Boolean)
    )
    .then(days => Promise.all(days.map(day => {
      const filePath = `${__dirname}/src/confcal/${day}.confcal`;
      return fse.readFile(filePath, 'utf8')
        .then(data => confCal({
          apiKey: process.env.GOOGLE_API_KEY,
          cache: `${__dirname}/src/confcal/geo.cache`
        }, data))
        .then(data => {
          data.day = day;
          return data;
        })
        .catch(error => {
          error.message = `Error reading ${filePath}: ${error.message}`;
          return Promise.reject(error);
        })
    })))
    .then(cals => {
      for (const cal of cals.sort((a, b) => a.date > b.date)) {
        calendar[cal.day] = cal;
      }
    })
    .then(() => calendar)
}

function readJsonsTo (allData) {
  return fse.readdir(`${__dirname}/src/json`)
    .then(fNames => fNames.map(fName => fName.split('.json')[0]))
    .then(names => Promise.all(
      names.map(name => {
        const filePath = `${__dirname}/src/json/${name}.json`;
        return fse.readFile(filePath, 'utf8')
          .then(data => JSON.parse(data))
          .then(data => allData[name] = data)
          .catch(err => Promise.reject(new Error(`Error reading ${filePath}: ${err.message}`)));
      })
    ))
}

function readData () {
  const allData = {
    momentTz: require('moment-timezone'),
    isSpeakerForEntry (entry, speaker) {
      return entry.person === speaker.name || entry.person === speaker['氏名'] || entry.person === speaker.nickName
    }

  };
  return Promise.all([
      readSchedule().then(calendar => allData.calendar = calendar),
      readJsonsTo(allData)
    ])
    .then(() => allData);
}

gulp.task('html', () => readData().then(data => new Promise((resolve, reject) => {
  const stream = gulp
    .src(srcPaths.html)
    .pipe(plumber((error) => {
      util.log(util.colors.red(error.message));
      resolve();
    }))
    .pipe(ejs(data, {}, { ext: '.html' }))
    .pipe(gulp.dest(destPath));
  stream.on('end', () => resolve());
})));

gulp.task('css', () => {
  return gulp
    .src(srcPaths.css)
    .pipe(plumber((error) => {
      util.log(util.colors.red(error.message));
      // gulp.task('css').emit('end');
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
  gulp.watch(`${srcDirs.confcal}/**/*.confcal`, ['html']);
  gulp.watch(`${srcDirs.css}/**/*.scss`,  ['css']);
  gulp.watch(`${srcDirs.js}/**/*.js`,     ['js']);
});

gulp.task('clean', del.bind(null, ['./*.html', './*.ejs']));

gulp.task('dev', ['build', 'watch']);
gulp.task('build', ['clean', 'html', 'css', 'js']);
