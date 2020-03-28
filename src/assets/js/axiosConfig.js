import axios from 'axios'
const { getCookie } = require("@/utils/cookies")
const Axios = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    // baseURL: "http://localhost:1234/api/v1",
    withCredentials: true,
    timeout: 50000
})
// 设置 token 的请求头
Axios.defaults.headers.common["Authorization"] = getCookie("token")
export default Axios