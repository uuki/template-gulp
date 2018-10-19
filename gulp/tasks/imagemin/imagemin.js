import gulp from 'gulp';
import pngquant from 'imagemin-pngquant';
import imagemin from 'gulp-imagemin';
import chmod from 'gulp-chmod';

const config = require('../../../config').imagemin;

gulp.task('imagemin', () => {
  gulp.src([
    `${ config.sourceDir }/{,**/}*.{jpg,png,gif,svg,ico}`,
    `!${ config.sourceDir }/sprite/{,**/}*.png`,
    ])
    // .pipe(chmod(777))
    .pipe(imagemin({
      optimizationLevel: config.params.optimizationLevel,
      multipass: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [ pngquant({ quality: config.pngquant.quality, speed: 1}) ]
    }))
    // .pipe(chmod(644))
    .pipe(gulp.dest(`${ config.publishDir }/`))
})