import { ResultTypeEnum } from '@/typescript/shared/enum'
import { ResultModel } from '@/typescript/shared/model'
/** mock 返回的参数 */
export interface IMockResponse<T> {
  /** 请求的 url */
  url: string
  /** 请求的 方式 get  post */
  type: ResultTypeEnum
  /** 返回的参数 */
  response(respond: any): ResultModel<T>
}
