'use strict'
require('babel-polyfill')

const webpack = require('webpack')
const config = require('./config')['webpack']
const autoprefixer = require('autoprefixer')
const path = require('path')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')


function resolve (dir) {
  return path.join(__dirname, dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), /*resolve('test')*/],
  exclude: /node_modules/,
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: true
  }
})

const Entries = {
  'app': ['babel-polyfill', `${config.sourceDir}/${config.entry}`]
}

const webpackConfig = {
  entry: Entries,
  output: {
    path: resolve(config.publishDir),
    filename: '[name].js',
    chunkFilename: 'bundle.chunk.js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '~': resolve(`${config.sourceDir}/`),
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // loaders: utils.cssLoaders(),
          // cssSourceMap: true,
          // cacheBusting: true,
          // transformToRequire: {
          //   video: ['src', 'poster'],
          //   source: 'src',
          //   img: 'src',
          //   image: 'xlink:href'
          // }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!(dom7|swiper)\/).*/,
        loader: 'babel-loader',
        use: {
          options: {
            presets: [
              ['env',
                {
                  modules: false,
                  targets: {
                    browsers: ['last 2 versions', 'not ie < 11']
                  }
                }
              ],
              "stage-2"
            ],
            'plugins': ['transform-runtime'],
            env: {
              'test': {
                'presets': [
                  'env',
                  'stage-2'
                ],
                'plugins': [
                  'transform-vue-jsx',
                  'transform-object-rest-spread',
                  'transform-class-properties',
                  'transform-object-assign',
                  'dynamic-import-node'
                ]
              }
            }
          }
        },
        // include: [resolve(config.sourceDir), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'vue-style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: (loader) => [
                  autoprefixer({
                    browsers: ['last 2 versions'],
                    grid: true
                  })
                ]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                // includePaths: [
                //   path.join(__dirname, '..', 'src/assets/scss'),
                //   path.join(__dirname, '..', 'node_modules'),
                // ],
                plugins: [
                  autoprefixer({
                    browsers: ['last 2 versions'],
                    grid: true
                  })
                ]
              },
            }
          ]
        }),
      },
      {
        test: /\.ya?ml$/,
        loader: 'js-yaml-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: resolve(`${config.assetsBase}/img/[name].[ext]`)
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: resolve(`${config.assetsBase}/media/[name].[ext]`)
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: resolve(`${config.assetsBase}/fonts/[name].[hash:7].[ext]`)
        }
      }
    ]
  },
  plugins: [
    // new webpack.ProvidePlugin({
    //   $:                'jquery',
    //   jQuery:           'jquery'
    // }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: Entries,
    }),
    new ExtractTextPlugin({
      filename: 'style.[contenthash].css',
    }),
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}

if(process.env.NODE_ENV === 'production') {
  webpackConfig.plugins.push(
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: false,
      parallel: true
    })
  )
}

module.exports = webpackConfig