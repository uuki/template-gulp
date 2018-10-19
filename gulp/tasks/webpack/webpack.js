import gulp from 'gulp';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';

const webpackConfig = require('../../../webpack.config');
const config = require('../../../config')['webpack'];

gulp.task('webpack', () => {
  return webpackStream(webpackConfig, webpack)
    .pipe(process.$.plumber())
    .pipe(gulp.dest(config.publishDir));
})