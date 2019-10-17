const path = require("path")

function resolve(dir) {
    return path.join(__dirname, dir)
}
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
    configureWebpack: {
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
        proxy: {
            "/mock": {
                target: `http://localhost:${port}`,
                changeOrigin: true,
                pathRewrite: {
                    ["^" + process.env.VUE_APP_BASE_API]: ""
                }
            }
        }
    }
}
