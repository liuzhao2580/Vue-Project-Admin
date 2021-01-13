import axios from '../axiosConfig'

// 用户登录
export const userLogin = (params: any) => {
    return axios.post(`/login`, params)
}

// 获取指定的用户信息
export const userInfoApi = (params: any) => {
    return axios.get(`/userInfo`, { params })
}

// 获取所有用户信息
export const userInfoListAPI = () => {
    return axios.get(`/user`)
}
