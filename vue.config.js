module.exports = {
    outputDir: 'dist',   //build输出目录
    assetsDir: 'assets', //静态资源目录（js, css, img）
    lintOnSave: false, //是否开启eslint
    devServer: {
        proxyTable: {
            '/api/*': {
                target: 'https://didaedu.com', //API服务器的地址
                changeOrigin: true,
                pathRewrite: {
                    '^/api':''
                }
            }
        },
    }
}