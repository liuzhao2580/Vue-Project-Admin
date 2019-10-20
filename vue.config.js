const defatulConfig = require("./src/setting")
const path = require("path")

function resolve(dir) {
    return path.join(__dirname, dir)
}
// 设置 项目名称
const name = defatulConfig.title
// 设置项目的端口号
const port = 9527
module.exports = {
    publicPath: "./",
    outputDir: process.env.VUE_APP_TITLE === "production" ? "dist" : "test",
    assetsDir: "",
    indexPath: "index.html",
    filenameHashing: true,
    lintOnSave: process.env.NODE_ENV === "development",
    //   lintOnSave: false,
    runtimeCompiler: false,
    transpileDependencies: [],
    productionSourceMap: false,
    integrity: false,
    // webpack 配置
    configureWebpack: {
        name: name,
        resolve: {
            alias: {
                "@": resolve("src")
            }
        }
    },
    devServer: {
        port: port,
        open: true,
        https: false,
        overlay: {
            warnings: true,
            errors: true
        },
        // 配置跨域
        proxy: {
            "/mock": {
                target: `http://localhost:${port}`,
                changeOrigin: true,
                // 设置之后请求会默认加上 /mock
                pathRewrite: {
                    ["^" + process.env.VUE_APP_BASE_API]: ""
                }
            }
        }
    },
    // 
    chainWebpack(config) {
        // set svg-sprite-loader
        // 设置 svg 导入
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
    }
}
