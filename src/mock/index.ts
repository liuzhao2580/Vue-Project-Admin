// 引入 mock
import { ResultTypeEnum } from "@/typescript/shared/enum"
import Mock from "mockjs"
import user from "./modules/user"
import dashboard from "./modules/dashboard"
import article from "./modules/article"
const mocks = [...user, ...dashboard, ...article]

export default function mockXHR() {
  const baseURL = import.meta.env.VITE_APP_BASE_API
  Mock.setup({
    timeout: 500 // 设置延迟响应，模拟向后端请求数据
  })
  for (const mock of mocks) {
    Mock.mock(
      new RegExp(`${baseURL}${mock.url}`),
      mock.type || ResultTypeEnum.GET,
      mock.response
    )
  }
  // // 登录
  // Mock.mock(`${baseURL}/login`, 'post', user.userLogin)
  // // 获取用户信息
  // Mock.mock(RegExp(`${baseURL}/userInfo` + '*'), 'get', user.getUserInfo)
  // // 首页 Echarts 请求
  // Mock.mock(`${baseURL}/dashboard/echarts`, 'get', EchartsData(Mock))
}
