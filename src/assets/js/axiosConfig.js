import axios from 'axios'
const { getCookie } = require("@/utils/cookies")
const Axios = axios.create({
    // baseURL: baseURL, // url = base url + request url
    withCredentials: true, // send cookies when cross-domain requests
    timeout: 50000 // request timeout
})
// 设置 token 的请求头
Axios.defaults.headers.common["Authorization"] = "Bearer " + getCookie("token")
export default Axios