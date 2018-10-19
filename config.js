const baseConfig = {
  sourceDir: './src',
  publishDir: './dist',
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
    sourceDir: './src/hbs',
    publishDir: './dist',
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
      baseDir: './dist'
    },
    https: false,
    files: [
      './dist/**'
    ]
  },
  browserify: {
    sourceDir: './src/assets/js',
    publishDir: './dist/assets/js',
    filename: 'app.js',
    build: 'bundle' // 出力後ファイル名
  },
  compress: {
    gzip: {
      level: 9
    },
    css: {
      sourceDir: './dist/assets/css',
    },
    js: {
      sourceDir: './dist/assets/js',
    }
  },
  imagemin: {
    sourceDir: './src/assets/img',
    publishDir: './dist/assets/img',
    params: {
      optimizationLevel: 6,
      multipass: true,
    },
    pngquant: {
      quality: 60-80
    }
  },
  sass: {
    sourceDir: './src/assets/scss',
    publishDir: './dist/assets/css',
    filename: '{style,print}',
    sourceMap: true,
    browsers: [
      'last 2 versions',
      'ie 9',
      'safari 8'
    ]
  },
  sass_globbing: {
    sourceDir: './src/assets/scss',
    publishDir: './src/assets/scss/generated',
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
    sourceDir: './src/assets/img/sprite',
    publishDir: './src/assets/img',
    scssDir: './src/assets/scss',
    desktop: {
      padding: 20
    },
    mobile: {
      padding: 40
    }
  },
  webpack: {
    sourceDir: './src/assets/js',
    publishDir: './dist/assets/js',
    assetsBase: './src/assets',
    entry: 'app.js',
    dev: {
      useEslint: true,
      assetsPublicPath: './src/assets/js',
    },
    build: {
      assetsPublicPath: './dist/assets/js',
    }
  }
};