import axios from 'axios'
const { getCookie } = require("@/utils/cookies")
const Axios = axios.create({
    // baseURL: baseURL, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})
Axios.defaults.headers.common["Authorization"] = getCookie("token")
export default Axios