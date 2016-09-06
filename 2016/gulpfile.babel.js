import gulp from 'gulp';
import sass from "gulp-ruby-sass";
import util from "gulp-util";
import plumber from "gulp-plumber";
import autoprefixer from "gulp-autoprefixer";
import cleancss from "gulp-clean-css";

const browserSync = require('browser-sync').create();
const base_path = './',
      paths = {
        cssDir: base_path + 'css/',
        html: base_path + '**/*.html'
      };

gulp.task('css', () => {
  return sass(paths.cssDir + '**/*.scss', { style: 'expanded' })
      .pipe(plumber((error) => {
        util.log(util.colors.red(error.message));
        gulp.task('css').emit('end');
      }))
      .pipe(autoprefixer())
      .pipe(cleancss())
      .pipe(gulp.dest(paths.cssDir))
      .pipe(browserSync.stream());
});

gulp.task('server', ['css'], () => {
  browserSync.init({
    port: 4000,
    server: {
      baseDir: base_path,
    },
    ui: {
      port: 4001
    }
  });

  gulp.watch(paths.cssDir + '**/*.scss', ['css']);
  gulp.watch(paths.html).on('change', browserSync.reload);
});

gulp.task('default', [ 'css', 'server']);
