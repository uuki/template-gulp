import gulp from 'gulp';
import requireDir from 'require-dir';
import gulpLoadPlugins from 'gulp-load-plugins';

const config = require('./config')

// ロード済プラグインをprocessに定義
process.$ = gulpLoadPlugins({
  pattern: ['gulp-*', 'gulp.*', 'fs-extra'],
  rename: { 'fs-extra': 'fs' }
})

// 実行時コマンドで環境変数を定義
process.env.NODE_ENV = process.env.npm_lifecycle_event === 'build' ? 'production' : 'development'

// 有効なモジュールのみrequireDir
Object.keys(config.tasks).forEach(name => {
  if (config.tasks[name]) {
    requireDir(`${ config.base.tasksDir }/${ name }`, { recurse: true })
  }
})

/**
 * ▼ 要編集エリア　TODO: モジュール化
 */
gulp.task('watch', () => {
  process.$.watch(`${ config.assemble.sourceDir }/**/*.{hbs,yml,json}`, () => gulp.start(['assemble']));
  process.$.watch(`${ config.sass.sourceDir }/**/*.scss`, () => gulp.start(['sass']));
  process.$.watch(`${ config.webpack.sourceDir }/**/*.js`, () => gulp.start(['webpack']));
})

gulp.task('default', ['browser-sync', 'sass_globbing', 'watch']);
gulp.task('build', ['imagemin', 'compress', 'webpack', 'assemble']);
gulp.task('host', ['browser-sync']);