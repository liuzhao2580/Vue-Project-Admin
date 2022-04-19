/** 1. 请求的状态参数返回的枚举 */
const ResultCodeEnum = {
  /** 成功 */
  success: 0,
  /** token 不合法 */
  invalidToken: 50001
}

/** 2. 请求的方式 */
const ResultTypeEnum = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
  PUTCH: 'putch'
}

module.exports = {
  ResultCodeEnum,
  ResultTypeEnum
}
