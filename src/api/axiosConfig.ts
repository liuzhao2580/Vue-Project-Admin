import axios from 'axios'
import { Message } from 'element-ui'

import { ResultCodeEnum } from '@/typescript/enum'
import { ResultModel } from '@/typescript/model'
import { getCookie, removeCookie } from '@/utils/cookies'
import { resetRouter } from '@/router'
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

// 添加请求拦截器
Axios.interceptors.request.use(
    (config) => {
        const reg = /\/login$/
        if(config.url && reg.test(config.url)) return config
        config.headers['x-csrf-token'] = getCookie('csrfToken')
        config.headers['Authorization'] = `Bearer ${getCookie('token')}`
        return config
    },
    (error) => {
        console.log(error, 'error')
    }
)

// 添加响应拦截器
Axios.interceptors.response.use(
    // 请求成功
    (response) => {
        const data: ResultModel<any> = response.data
        // 说明返回数据成功
        if (data.code === ResultCodeEnum.success) return response
        // 说明 token 无效
        else if (data.code === ResultCodeEnum.invalidToken) {
            Message.error({
                message: 'token 无效'
            })
            removeCookie('token')
            removeCookie('user_id')
            // 重置 路由
            resetRouter()
            return response
        } else return response
    },
    // 请求失败
    (error) => {
        return Promise.reject(error)
    }
)
export default Axios
