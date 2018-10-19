import gulp from 'gulp';
import history from 'connect-history-api-fallback';

const browserSync = require('browser-sync');
const config = require('../../../config').browser_sync;
// const __root = process.env.PWD;

gulp.task('browser-sync', () => {
  return browserSync({
    open: config.open,
    port: config.port,
    browser: config.browser,
    server: {
      baseDir: config.server.baseDir,
      middleware: [history()]
    },
    https: config.https,
    files: config.files
  })
})