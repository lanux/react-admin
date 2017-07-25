var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(name => {
  baseWebpackConfig.entry[ name ] = [ './build/dev-client' ].concat(baseWebpackConfig.entry[ name ])
})

module.exports = merge.smart(baseWebpackConfig, {
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),//定义变量插件，一般用于开发环境log或者全局变量
    new webpack.optimize.OccurrenceOrderPlugin(true),//根据模块调用次数，给模块分配ids，常被调用的ids分配更短的id，使得ids可预测，降低文件大小，该模块推荐使用
    new webpack.ProvidePlugin({}),// 自动加载模块，当配置（$:'jquery'）例如当使用$时，自动加载jquery
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),//跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误。
    // new webpack.ProgressPlugin(),//编译进度
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      //根据模板插入css/js等生成最终HTML
      favicon: './public/img/favicon.png', //favicon路径，通过webpack引入同时可以生成hash值
      template: './src/index.html', //html模板路径
      inject: true, //js插入的位置，true/'head'/'body'/false
      hash: true, //为静态资源生成hash值
      // chunks: ['vendors', 'about'],//需要引入的chunk，不配置就会引入所有页面的资源
      filename: 'index.html',//生成的html存放路径，相对于path
    }),
    new FriendlyErrorsPlugin()
  ]
})
