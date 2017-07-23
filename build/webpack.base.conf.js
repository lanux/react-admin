var path = require('path')
var config = require('../config')

const profile = process.env.NODE_ENV === 'production' ? config.build : config.dev

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
const assetsStaticFilePath = function (_path) {
    return path.posix.join(profile.assetsSubDirectory, _path)
}

module.exports = {
    entry: {
        app: './src/main.js',
        vendor:['react','react-dom','react-router','redux','antd']  //第三方库和框架
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].[hash:7].js',
        chunkFilename: '[id].[hash:7].js',
        publicPath: profile.assetsPublicPath,//这个配置影响图片的输出路径
    },
    resolve: {
        extensions: [' ', '.js', '.json', '.jsx'],
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
                loader: 'style!css!postcss!less',
            },
            {
                test: /\.css/,
                loader: 'style!css!postcss',
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
