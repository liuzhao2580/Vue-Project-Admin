// 引入 mock
import Mock from "mockjs"
import user from "./modules/user"
import dashboard from "./modules/dashboard"

// const impAll = requireContext => requireContext.keys().map(requireContext)
// const req = require.context("./modules", false, /\.js$/)
// impAll(req)
// const mockInfo = impAll(req)
// console.log(mockInfo)

Mock.setup({
    timeout: 800 // 设置延迟响应，模拟向后端请求数据
})
Mock.mock(`user/login`, "post", user.setUserInfo)
Mock.mock(RegExp('user/userInfo' + '.*'), "get", user.getUserInfo)
Mock.mock('/dashboard', "get", dashboard(Mock))
export default {
    Mock
}