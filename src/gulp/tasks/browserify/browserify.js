import gulp from 'gulp';
import browserify from 'browserify';
import browserifyShim from 'browserify-shim';
import babelify from 'babelify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import transform from 'vinyl-transform';
import eslint from 'gulp-eslint';
import uglify from 'gulp-uglify';

const RED     = '\u001b[31m';
const YELLOW  = '\u001b[33m';
const RESET   = '\u001b[0m';

const config = require('../../../config').browserify;

gulp.task('browserify', () => {
  return watchify(browserify(`${ config.sourceDir }/${ config.filename }`, { debug: true }))
    .transform(babelify, { presets: ['env'] })
    //.transform(browserifyShim)
    .bundle()
    .on('error', (err) => { console.log(`Error : ${ err.message }`); /*console.log(err.stack);*/ })
    .pipe(source(`${ config.build }.js`))
    .pipe(buffer())

    .pipe(eslint({ useEslintrc: true }))
    .pipe(eslint.format())
    .pipe(eslint.results(results => {
      //Called once for all ESLint results.
      console.log('[ESLint]', results)
      if(results.errorCount) {
        // * files lint free.
        // console.log(`${YELLOW}Total Results: ${results.length}${RESET}`)
        // console.log(`${YELLOW}Total Warnings: ${results.warningCount}${RESET}`)
        // console.log(`${RED}Total Errors: ${results.errorCount}${RESET}`)
      }
    }))
    .pipe(uglify())
    .pipe(process.$.rename(`${ config.build }.min.js`))
    .pipe(gulp.dest(`${ config.publishDir }/`))
})