module.exports = {
    outputDir: 'dist',   //build输出目录
    assetsDir: 'assets', //静态资源目录（js, css, img）
    lintOnSave: false, //是否开启eslint
    devServer: {
        proxy: {
            '/api': {
                target: 'https://didaedu.com', //API服务器的地址
                ws:true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api':''
                }
            },
            '/cen': {
                target: 'http://localhost:3000', //API服务器的地址
                changeOrigin: true,
                ws: true, 
                pathRewrite: {
                    '^/cen':'/'
                }
            }
        },
    }
}