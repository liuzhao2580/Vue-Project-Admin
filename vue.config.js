const path = require("path")

function resolve(dir) {
    return path.join(__dirname, dir)
}

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
        port: 8080,
        host: "0.0.0.0",
        open: true,
        https: false,
        overlay: {
            warnings: true,
            errors: true
        }
    }
}
