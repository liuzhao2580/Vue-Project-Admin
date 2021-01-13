import axios from 'axios'
// const { getCookie } = require("@/utils/cookies")
const baseURL =
    process.env.NODE_ENV === 'development'
        ? process.env.VUE_APP_BASE_API
        : process.env.VUE_APP_BASE_URL
const Axios = axios.create({
    baseURL,
    withCredentials: true,
    timeout: 50000
})
// 设置 token 的请求头
// Axios.defaults.headers.common["Authorization"] = getCookie("token")
export default Axios
