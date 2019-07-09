import gulp from 'gulp';
import spritesmith from 'gulp.spritesmith';

const config = require('../../../config').sprite_smith;

gulp.task('sprite_smith', () => {
  const desktop = gulp.src(`${ config.sourceDir }/*.png`)
                  .pipe(spritesmith({
                    imgName: 'spritesheet.png',
                    cssName: `_sprites.scss`,
                    imgPath: `${ config.publishDir }/spritesheet.png`,
                    padding: config.desktop.padding
                  }));
  const mobile = gulp.src(`${ config.sourceDir }/mobile/*.png`)
                .pipe(spritesmith({
                  imgName: 'spritesheet.mobile.png',
                  cssName: '_sprites.mobile.scss',
                  imgPath: `${ config.publishDir }/spritesheet.mobile.png`,
                  padding: config.desktop.padding
                }));

  return () => {
    desktop.img.pipe(gulp.dest(`${ config.publishDir }/`));
    desktop.css.pipe(gulp.dest(`${ config.scssDir }/`));
    mobile.img.pipe(gulp.dest(`${ config.publishDir }/`));
    mobile.css.pipe(gulp.dest(`${ config.scssDir }/`));
  }
})