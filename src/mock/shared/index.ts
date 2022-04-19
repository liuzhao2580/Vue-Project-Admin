import { ResultTypeEnum } from '@/typescript/shared/enum'
// import { ResultModel } from '@/typescript/shared/model'

export interface IMockResponse {
  /** 请求的 url */
  url: string
  /** 请求的 方式 */
  type: ResultTypeEnum
  /** 返回的 数据 */
  response(options: any): any
}