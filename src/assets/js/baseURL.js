let baseUrl = ""

// 生产环境
if (process.env.NODE_ENV === "production") {
    baseUrl = process.env.VUE_APP_BASE_API 
}
// 开发环境
else {
    baseUrl = process.env.VUE_APP_BASE_API
}
module.exports =  baseUrl