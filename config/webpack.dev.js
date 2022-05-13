const { merge } = require('webpack-merge')
const common = require('./webpack.config.js')

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:5000',
    },
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  }
})