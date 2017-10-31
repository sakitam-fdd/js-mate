const path = require('path')
module.exports = {
  build: {
    env: require('./prod.env'),
    productionSourceMap: true
  },
  dev: {
    env: require('./dev.env'),
    devtoolSourceMap: '#source-map'
  },
  base: {
    fileName: 'js-mate',
    libraryName: 'Mate',
    distDirectory: path.resolve(__dirname, '../dist')
  }
}
