import gulp from 'gulp';
import del from 'del';
import ignore from 'gulp-ignore';
import through from 'through2';
import prettify from 'gulp-prettify';
import assemble from 'assemble';
import prettifyrc from './prettifyrc.json';
import yaml from 'js-yaml';
import fs from 'fs-extra';
import htmlBeautify from 'gulp-html-beautify';

const config = require('../../../config').assemble;
const app = assemble();

app.dataLoader('yml', (str, fp) => {
  return yaml.safeLoad(str)
})

gulp.task('assemble:clearn', () => {
  del.sync([`${ config.publishDir }/**/*.html`, `!${ config.publishDir }/assets`], { force: true })
})

gulp.task('assemble:load', (cb) => {

  app.data(`${ config.sourceDir }/data/*.yml`);

  app.layouts(`${ config.sourceDir }/layouts/*.hbs`);
  app.pages(`${ config.sourceDir }/pages/**/*.hbs`);
  app.partials(`${ config.sourceDir }/partials/**/*.hbs`);
  cb();
})

gulp.task('assemble:compile', () => {

  return app.toStream('pages')
    .pipe(through.obj((chunk, enc, cb) => {
      Object.assign(chunk.data, config.context)
      chunk.data['isProduction'] = (process.env.npm_lifecycle_event === 'build');

      //chunk.data['config'] = require(`${ config.base.sourceDir }/data/config.yml`);
      return cb(null, chunk)
    }))
    .pipe(app.renderFile())
    .pipe(process.$.rename({
      extname: '.html'
    }))
    .pipe(prettify( prettifyrc ))
    .pipe(ignore.exclude(['**/layouts/*.html', '**/partials/*.html']))
    .pipe(app.dest(`${ config.publishDir }/`))
})

gulp.task('beautify', () => {
  gulp.src(`${ config.publishDir }/**/*.html`)
    .pipe(htmlBeautify(config.options))
    .pipe(gulp.dest(`${ config.publishDir }/`))
})

gulp.task('assemble', ['assemble:clearn', 'assemble:load', 'assemble:compile', 'beautify'])