// 引入 mock
import Mock from 'mockjs'
import user from './modules/user'
import dashboard from './modules/dashboard'

// const impAll = requireContext => requireContext.keys().map(requireContext)
// const req = require.context("./modules", false, /\.js$/)
// impAll(req)
// const mockInfo = impAll(req)
// console.log(mockInfo)

// 如果是开发环境 就不使用 mock
process.env.NODE_ENV === 'development'
    ? null
    : (() => {
          const baseURL = process.env.VUE_APP_BASE_URL
          Mock.setup({
              timeout: 800 // 设置延迟响应，模拟向后端请求数据
          })
          Mock.mock(`${baseURL}/login`, 'post', user.setUserInfo)
          Mock.mock(RegExp(`${baseURL}/userInfo` + '*'), 'get', user.getUserInfo)
          Mock.mock(`${baseURL}/dashboard`, 'get', dashboard(Mock))
      })()
export default {
    Mock
}
