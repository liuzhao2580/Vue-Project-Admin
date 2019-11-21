// 引入 mock
import Mock from "mockjs"
// import userInfo from "./modules/user"

const impAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context("./modules", false, /\.js$/)
impAll(req)
const mockInfo = impAll(req)
Mock.setup({
    timeout: 800, // 设置延迟响应，模拟向后端请求数据
});


export default {
    mockInfo
}