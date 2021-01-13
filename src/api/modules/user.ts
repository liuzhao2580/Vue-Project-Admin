import axios from '../axiosConfig'
import { ResultModel } from '@/typescript/model'

// 用户登录
export const userLogin = (params: any): Promise<ResultModel<any>> => {
    return axios.post(`/login`, params)
}

// 获取指定的用户信息
export const userInfoApi = (userId: string | number|undefined): Promise<ResultModel<any>> => {
    return axios.get(`/userInfo/${userId}`)
}

// 获取所有用户信息
export const userInfoListAPI = () => {
    return axios.get(`/user`)
}
