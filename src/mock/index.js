// 引入 mock
import Mock from 'mockjs'
import user from './modules/user'
// import { EchartsData } from './modules/dashboard'
const mocks = [...user]

// function mockXHR() {
//   const baseURL = process.env.VUE_APP_BASE_URL
//   Mock.setup({
//     timeout: 800 // 设置延迟响应，模拟向后端请求数据
//   })
//   // 登录
//   Mock.mock(`${baseURL}/login`, 'post', user.userLogin)
//   // 获取用户信息
//   Mock.mock(RegExp(`${baseURL}/userInfo` + '*'), 'get', user.getUserInfo)
//   // 首页 Echarts 请求
//   Mock.mock(`${baseURL}/dashboard/echarts`, 'get', EchartsData(Mock))
// }

function mockXHR() {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function () {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
    return function (options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  console.log(mocks, 'mocks')

  for (const i of mocks) {
    Mock.mock(
      new RegExp(i.url),
      i.type || 'get',
      XHR2ExpressReqWrap(i.response)
    )
  }
}

// 如果是开发环境 就不使用 mock
module.exports = {
  mocks,
  mockXHR
}
