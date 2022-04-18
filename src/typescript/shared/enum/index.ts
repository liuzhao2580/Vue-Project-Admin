/** 一些基本的公共枚举 */

/** 1. 请求的状态参数返回的枚举 */
export enum ResultCodeEnum {
  /** 成功 */
  success = 0,
  /** token 不合法 */
  invalidToken = 50001,
}

/** 2. 请求的方式 */
export enum ResultTypeEnum {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  PUTCH = 'putch'
}
