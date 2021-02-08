/** 提供公共的 model */

/**
 * 1. 返回参数的 model
 */
export class ResultModel<T> {
    /** 返回的状态码 */
    public code!: string | number
    /** 返回的消息*/
    public msg!: string
    /** 返回的数据 T 可能是数组、对象 */
    public data: T
    /** 如果是列表 返回有分页页码 */
    public pageNum?: number
    /** 如果是列表 返回有分页每页条数 */
    public size?: number
    /** 如果是列表 返回有分页总页数 */
    public totalCount?: number
    /** 如果是列表 返回有分页总条数 */
    public totalPage?: number
}
