import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import cleanCss from 'gulp-clean-css';
const config = require('../../../config').sass;

gulp.task('sass', () => {
  gulp.src(`${ config.sourceDir }/${ config.filename }.scss`)
    .pipe(process.$.plumber({
      errorHandler: function(err) {
        console.log(err.messageFormatted);
        this.emit('end');
      }
    }))
    .pipe(sass({
      sourceMap: config.sourceMap
    }))
    .pipe(autoprefixer({
      browsers: config.browsers,
      grid: true
    }))
    .pipe(cleanCss({
      debug: true
    }, (details) => {
      console.log(`${ details.name }: ${ details.stats.originalSize } Byte > ${ details.stats.minifiedSize } Byte`);
    } ))
    .pipe(process.$.rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest(`${ config.publishDir }/`))
})