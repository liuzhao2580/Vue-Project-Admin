import axios from 'axios'
const { getCookie } = require("@/utils/cookies")
const Axios = axios.create({
    baseURL: process.env.BASE_URL + process.env.VUE_APP_BASE_API, // url = base url + request url
    withCredentials: true, // send cookies when cross-domain requests
    timeout: 50000 // request timeout
})
// 设置 token 的请求头
Axios.defaults.headers.common["Authorization"] = getCookie("token")
export default Axios