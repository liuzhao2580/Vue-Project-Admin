/** 部署的时候带有二级域名 https://example.com/folder/ */
let basePrefix = ''

/** 判断是否不是开发环境 */
const notDevFlag = process.env.NODE_ENV !== 'development'

/** 部署在 GitHub 的 Pages 上 */
if (process.env.NODE_ENV === 'pages') {
  basePrefix = '/Vue-Project-Admin/'
}

module.exports = {
  title: '小火车况且况且',
  targetURL: 'http://localhost:7777',
  basePrefix,
  notDevFlag
}
