import gulp from 'gulp';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';

const webpackConfig = require('../../../webpack.config');
const config = require('../../../config')['webpack'];

gulp.task('webpack', () => {
  return gulp.src(`${ config.sourceDir }/${ config.entry }`)
  .pipe(webpackStream(webpackConfig, webpack))
  .on('error', function(error) {
    this.emit('end')
  })
  .pipe(gulp.dest(config.publishDir));
})