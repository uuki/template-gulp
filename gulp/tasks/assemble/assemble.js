import gulp from 'gulp';
import del from 'del';
import ignore from 'gulp-ignore';
import through from 'through2';
import prettify from 'gulp-prettify';
import assemble from 'assemble';
import prettifyrc from './prettifyrc.json';
import yaml from 'js-yaml';
import fs from 'fs-extra';

const app = assemble();
const config = require('../../../config').assemble;

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

gulp.task('assemble', ['assemble:clearn', 'assemble:load', 'assemble:compile'])