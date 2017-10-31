/* global __dirname, require, module */
const path = require('path')
const config = require('../config')
const resolve = (dir) => {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  entry: resolve('src') + '/index.js',
  output: {
    path: config.base.distDirectory,
    filename: config.base.fileName + (process.env.NODE_ENV === 'production' ? '.min.js' : '.js'),
    library: config.base.libraryName,
    chunkFilename: '../dist/[name].js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('src'),
          resolve('node_modules/ol-extent/src'),
          resolve('node_modules/nature-dom-util/src'),
          resolve('node_modules/observable-emit/src'),
          resolve('test')
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.json', '.js'],
    alias: {
      '@': resolve('src')
    }
  },
  plugins: []
}
