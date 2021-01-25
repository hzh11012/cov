module.exports = {
    publicPath: './',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://apis.juhe.cn', //API服务器的地址
                ws: true, //代理websockets
                changeOrigin: true, // 虚拟的站点需要更管origin
                pathRewrite: { //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^/api': ''
                }
            },
            '/sdk': {
                target: 'https://i.snssdk.com/api/amos', //API服务器的地址
                ws: true, //代理websockets
                changeOrigin: true, // 虚拟的站点需要更管origin
                pathRewrite: { //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^/sdk': ''
                }
            }
        }
    },
    css: {
        extract: false
    },
    configureWebpack: {
        externals: {
            vue: 'Vue',
            axios: 'axios'
        }
    },
    transpileDependencies: ['vue-clamp', 'resize-detector']
}