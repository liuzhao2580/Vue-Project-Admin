let baseUrl = ""

// 生产环境
if (process.env.NODE_ENV === "production") {
    // 再判断 线上 还是 测试
    if (process.env.VUE_APP_TITLE === "production") {
        baseUrl = ""
    }   
}
// 开发环境
else {
    baseUrl = "http://localhost:9527"
}
export default baseUrl