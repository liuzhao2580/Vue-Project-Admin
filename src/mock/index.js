// 引入 mock
import Mock from "mockjs"
import user from "./modules/user"
const getBaseURL = process.env.VUE_APP_BASE_URL

// const impAll = requireContext => requireContext.keys().map(requireContext)
// const req = require.context("./modules", false, /\.js$/)
// impAll(req)
// const mockInfo = impAll(req)
// console.log(mockInfo)

Mock.setup({
    timeout: 800 // 设置延迟响应，模拟向后端请求数据
})
Mock.mock(`${getBaseURL}/user/login`, "post", user.setUserInfo)
Mock.mock(RegExp(getBaseURL + '/user/userInfo' + '.*'), "get", user.getUserInfo)
export default {
    Mock
}