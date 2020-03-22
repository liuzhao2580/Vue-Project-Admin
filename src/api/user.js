import axios from '@/assets/js/axiosConfig'
import baseURL from "@/assets/js/baseURL"
// 获取用户信息
export const userInfoApi = () => {
    return axios.get("/user/info")
}
// 用户登录
export const userLogin = (params) => {
    return axios.post(`${baseURL}/login`, params)
}