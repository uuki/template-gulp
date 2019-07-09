import gulp from 'gulp';
import _gzip from 'gulp-gzip';
import _merge from 'gulp-merge';

const config = require('../../../config').compress;

gulp.task('compress', () => {
  const task_css = gulp.src(`${ config.css.sourceDir }/*.min.css`)
    .pipe(_gzip({
      append: true,
      gzipOptions: {
        level: config.gzip.level
      }
    }))
    .pipe(gulp.dest(`${ config.css.sourceDir }/`))

  const task_js = gulp.src(`${ config.js.sourceDir }/*.min.js`)
    .pipe(_gzip({
      append: true,
      gzipOptions: {
        level: config.gzip.level
      }
    }))
    .pipe(gulp.dest(`${ config.js.sourceDir }/`))

  // let compress_task = () => {
  //   _merge(task_js, task_css);
  // };

  // return compress_task;
  return _merge(task_js, task_css)
})