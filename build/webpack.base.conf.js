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
    extensions: [ ' ', '.js', '.json', '.jsx' ],
    alias: {
      '@': resolve('src'),
      // components:path.resolve(__dirname,'..')+'/src/components',
      // models:path.resolve(__dirname,'..')+'/src/models',
      // css:path.resolve(__dirname,'..')+'/src/css',
      // views:path.resolve(__dirname,'..')+'/src/views',
      // utils:path.resolve(__dirname,'..')+'/src/utils',
      // _actions:path.resolve('src/actions'),
      // reducers:path.resolve(__dirname,'..')+'/src/reducers',
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
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader?importLoaders=1&modules&localIdentName=[hash:base64:5]',
          {
            loader: "less-loader",
            options: {
              modifyVars: { "@primary-color": "#005ea5" },
              // 这里利用了 less-loader 的 modifyVars 来进行主题配置， 变量和其他配置方式可以参考 [配置主题]
              // (https://user-gold-cdn.xitu.io/2017/6/15/e8ba356d7b10cec196d48159e41b6e6e) 文档。
            },
          }
        ]
      },
      {
        test: /\.less$/,
        include: /node_modules/,
        use: [
          'style-loader',
          {
            // Use it after css-loader and style-loader, but before other preprocessor loaders like e.g sass|less|stylus-loader, if you use any.
            loader: require.resolve('postcss-loader'),
            options: {
              plugins: () => [
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                }),
              ],
            },
          },
          {
            loader: "less-loader",
            options: {
              modifyVars: { "@primary-color": "#005ea5" },
              // 这里利用了 less-loader 的 modifyVars 来进行主题配置， 变量和其他配置方式可以参考 [配置主题]
              // (https://user-gold-cdn.xitu.io/2017/6/15/e8ba356d7b10cec196d48159e41b6e6e) 文档。
            },
          }
        ]
      },
      {
        test: /\.css/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader?importLoaders=1&modules&localIdentName=[hash:base64:5]',
        ]
      },
      {
        test: /\.css/,
        include: /node_modules/,
        use: [
          'style-loader',
          {
            // Use it after css-loader and style-loader, but before other preprocessor loaders like e.g sass|less|stylus-loader, if you use any.
            loader: require.resolve('postcss-loader'),
            options: {
              plugins: () => [
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                }),
              ],
            },
          },
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
