import gulp from 'gulp';
import sassGlobbing from 'gulp-sass-globbing';

const config = require('../../../config').sass_globbing;

gulp.task('sass_globbing', () => {
  return config.files.forEach(f => {
    gulp.src(`${f}/*.scss`, {cwd: `${ config.sourceDir }/`})
      .pipe(sassGlobbing(
        {
          path: `_${f}.scss`
        },
        {
          useSingleQuotes: true,
          signature: '/* generated with gulp-sass-globbing */'
        }
      ))
      //.pipe($.sass())
      .pipe(gulp.dest(`${ config.publishDir }/`))
  });
})