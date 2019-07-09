const baseConfig = {
  sourceDir: '.',
  publishDir: '../dist',
  tasksDir: './gulp/tasks',
  taskPackagePrefix: 'gulp-task-module-'
};

/**
 * 使用モジュールの切り替え
 */
const tasks = {
  // 静的サイトジェネレータ（hbs）
  assemble: true,
  // 
  browser_sync: true,
  // 
  browserify: false,
  // gzip化
  compress: true,
  // 
  imagemin: true,
  // 特定のディレクトリ配下のscssを*指定でまとめる
  sass_globbing: true,
  // 
  sass: true,
  // 
  sprite_smith: true,
  // 
  webpack: true,
}

module.exports = {
  tasks: tasks,
  base: baseConfig,
  assemble: {
    sourceDir: './hbs',
    publishDir: '../dist',
    context: {
      domain: 'http://localhost:9000',
      assets: '/assets',
      og_image: 'og.png',
      og_type: '',
      fb_app_id: ''
    }
  },
  browser_sync: {
    open: false,
    port: 9000,
    browser: 'Google Chrome',
    server: {
      baseDir: '../dist'
    },
    https: false,
    files: [
      '../dist/**'
    ]
  },
  browserify: {
    sourceDir: './assets/js',
    publishDir: '../dist/assets/js',
    filename: 'app.js',
    build: 'bundle' // 出力後ファイル名
  },
  compress: {
    gzip: {
      level: 9
    },
    css: {
      sourceDir: '../dist/assets/css',
    },
    js: {
      sourceDir: '../dist/assets/js',
    }
  },
  imagemin: {
    sourceDir: './assets/img',
    publishDir: '../dist/assets/img',
    params: {
      optimizationLevel: 6,
      multipass: true,
    },
    pngquant: {
      quality: 60-80
    }
  },
  sass: {
    sourceDir: './assets/scss',
    publishDir: '../dist/assets/css',
    filename: '{style,print}',
    sourceMap: true,
  },
  sass_globbing: {
    sourceDir: './assets/scss',
    publishDir: './assets/scss/generated',
    files: [
      'foundations',
      'layouts',
      'mixins',
      'objects/components',
      'objects/projects',
      'utils',
      'variables'
    ]
  },
  sprite_smith: {
    sourceDir: './assets/img/sprite',
    publishDir: './assets/img',
    scssDir: './assets/scss',
    desktop: {
      padding: 20
    },
    mobile: {
      padding: 40
    }
  },
  webpack: {
    sourceDir: './assets/js',
    publishDir: '../dist/assets/js',
    assetsBase: './assets',
    entry: 'app.js',
    dev: {
      useEslint: true,
      assetsPublicPath: './assets/js',
    },
    build: {
      assetsPublicPath: '../dist/assets/js',
    }
  }
};