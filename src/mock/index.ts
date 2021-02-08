// 引入 mock
import Mock from "mockjs"
import user from "./modules/user"
import { EchartsData } from "./modules/dashboard"

function MockImplement() {
    const baseURL = process.env.VUE_APP_BASE_URL
    Mock.setup({
        timeout: 800, // 设置延迟响应，模拟向后端请求数据
    })
    // 登录
    Mock.mock(`${baseURL}/login`, "post", user.setUserInfo)
    // 获取用户信息
    Mock.mock(RegExp(`${baseURL}/userInfo` + "*"), "get", user.getUserInfo)
    // 首页 Echarts 请求
    Mock.mock(`${baseURL}/dashboard/echarts`, "get", EchartsData(Mock))
}

// 如果是开发环境 就不使用 mock
process.env.NODE_ENV === "development" ? null : MockImplement()
export default {
    Mock,
}
