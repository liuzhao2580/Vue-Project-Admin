import axios from "axios"
import { ElMessage } from "element-plus"

import { ResultCodeEnum } from "@/typescript/shared/enum"
import { ResultModel } from "@/typescript/shared/model/"
import {
  getCookie,
  removeCookie,
  CONST_VARIABLE
} from "@/utils/modules/cookies"
import { resetRouter } from "@/router"
const baseURL = import.meta.env.VITE_APP_BASE_API
const Axios = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 50000
})
// 设置 token 的请求头
// Axios.defaults.headers.common["Authorization"] = getCookie("token")

// 添加请求拦截器
Axios.interceptors.request.use(
  config => {
    config.headers["Authorization"] = `Bearer ${getCookie(
      CONST_VARIABLE.TOKEN
    )}`
    return config
  },
  error => {
    console.log(error, "error")
  }
)
// 定义一个接受的参数，避免 在请求拦截的时候出现 Message undefined 报错问题
const _Message = ElMessage
// 添加响应拦截器
Axios.interceptors.response.use(
  // 请求成功
  response => {
    const data: ResultModel<any> = response.data
    // 说明返回数据成功
    if (data.code === ResultCodeEnum.SUCCESS) {
      return response.data
    }
    // 说明 token 无效
    else if (data.code === ResultCodeEnum.invalidToken) {
      _Message.error({
        message: "token 无效"
      })
      removeCookie(CONST_VARIABLE.TOKEN)
      removeCookie(CONST_VARIABLE.USER_ID)
      // 重置 路由
      resetRouter()
      return response.data
    } else return response.data
  },
  // 请求失败
  error => {
    // 获取请求失败的状态码
    const { response } = error
    if (response) {
      const { url } = error.config
      const { statusText } = error.response
      // 404
      if (response.status === 404) {
        _Message.error(`${url}请求地址 ${statusText}`)
      }
      // 500
      else if (response.status === 500) {
        _Message.error(`系统内部出错,状态码:${response.status}`)
      }
      return Promise.reject(error)
    }
  }
)
export default Axios
