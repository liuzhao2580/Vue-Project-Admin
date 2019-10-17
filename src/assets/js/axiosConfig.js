import axios from 'axios'
const Axios = axios.create({
    // baseURL: baseURL, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})
export default Axios