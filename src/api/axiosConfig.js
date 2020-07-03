import axios from 'axios'
// const { getCookie } = require("@/utils/cookies")
const Axios = axios.create({
    // baseURL: process.env.VUE_APP_BASE_URL,
    // baseURL: process.env.VUE_APP_BASE_URL + process.env.VUE_APP_BASE_API,
    withCredentials: true,
    timeout: 50000
})
// 设置 token 的请求头
// Axios.defaults.headers.common["Authorization"] = getCookie("token")
export default Axios