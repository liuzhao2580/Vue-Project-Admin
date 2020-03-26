import axios from '@/assets/js/axiosConfig'
// 获取指定的用户信息
export const userInfoApi = (params) => {
    return axios.get(`/user/${params.user_id}`)
}
// 用户登录
export const userLogin = (params) => {
    return axios.post(`/login`, params)
}

// 获取所有用户信息
export const userInfoListAPI = () => {
    return axios.get(`/user`)
}