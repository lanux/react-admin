var path = require('path')
var config = require('../config')
var autoprefixer = require('autoprefixer'); // CSS浏览器兼容
var webpack = require('webpack')

const profile = process.env.NODE_ENV === 'production' ? config.build : config.dev

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
const assetsStaticFilePath = function (_path) {
  return path.posix.join(profile.assetsSubDirectory, _path)
}

module.exports = {
  entry: {
    app: './src/main.js',
    vendor: [ 'react', 'react-dom', 'react-router', 'redux', 'antd' ]  //第三方库和框架
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].[hash:7].js',
    /*
     name 是在代码里为创建的 chunk 指定的名字，如果代码中没指定则 webpack 默认分配 id 作为 name。
     chunkhash 是文件的 hash 码，这里只使用前五位。
     */
    chunkFilename: '[name].[chunkhash:7].js',
    publicPath: profile.assetsPublicPath,//这个配置影响图片的输出路径
  },
  resolve: {
    extensions: [ '.js', '.json', '.jsx' ],
    alias: {
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      // {
      //     test: /\.(js|jsx)$/,
      //     loader: 'eslint-loader',
      //     enforce: "pre",
      //     include: [resolve('src'), resolve('test')],
      //     options: {
      //         formatter: require('eslint-friendly-formatter')
      //     }
      // },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          // Use it after css-loader and style-loader, but before other preprocessor loaders like e.g sass|less|stylus-loader, if you use any.
          'postcss-loader',
          'less-loader',
        ]
      },
      {
        test: /\.css/,
        use: [
          'style-loader',
          'css-loader',
          // Use it after css-loader and style-loader, but before other preprocessor loaders like e.g sass|less|stylus-loader, if you use any.
          'postcss-loader',
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 8192,
          name: assetsStaticFilePath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 8192,
          name: assetsStaticFilePath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
}
