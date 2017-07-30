// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'public',
        assetsPublicPath: '/react-admin/', // 如果需要给项目指定项目名称需要配置,否则配置成 “/”
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: true,
        productionGzipExtensions: ['js','jsx', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        port: 9000,
        autoOpenBrowser: false,   //是否自动打开浏览器
        assetsPublicPath: '/',
        assetsSubDirectory: 'public',   //静态文件目录
        proxyTable: {
            // 代理请求到后端服务器，如在浏览器请求http://loaclhost:3333/api/users则会请求http://localhost:3000/api/users
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true
            },
            // '/img': {
            //     target: 'http://localhost:3000',
            //     changeOrigin: true
            // },
            // "/proxy":{
            //     filter:"/proxy/*",
            //     target: 'http://www.example.org', // target host
            //     changeOrigin: true,               // needed for virtual hosted sites
            //     ws: true,                         // proxy websockets
            //     pathRewrite: {
            //         '^/api/old-path' : '/api/new-path',     // rewrite path
            //         '^/api/remove/path' : '/path'           // remove base path
            //     },
            //     router: {
            //         // when request.headers.host == 'dev.localhost:3000',
            //         // override target 'http://www.example.org' to 'http://localhost:8000'
            //         'dev.localhost:3000' : 'http://localhost:8000'
            //     }
            // },
            // "/api" : "http://127.0.0.1:9000"
        },  //代理
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}
