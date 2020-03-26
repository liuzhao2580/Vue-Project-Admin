import axios from '@/assets/js/axiosConfig'
import baseURL from "@/assets/js/baseURL"
// 获取指定的用户信息
export const userInfoApi = () => {
    return axios.get(`${baseURL}/user/5e76c9244e4b101dc86d57de`)
}
// 用户登录
export const userLogin = (params) => {
    return axios.post(`${baseURL}/login`, params)
}

// 获取所有用户信息
export const userInfoListAPI = () => {
    return axios.get(`${baseURL}/user`)
}