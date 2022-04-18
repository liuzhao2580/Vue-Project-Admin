import { ResultCodeEnum } from '@/typescript/shared/enum/index'
/** mockJS 的数据返回字段 */

/** 1. 数据返回的字段标准 */
export interface IMockResponseData<T> {
  /** 状态码 */
  code: ResultCodeEnum
  /** 返回的数据 */
  data?: T
  /** 返回的参数说明 */
  msg?: string
}
