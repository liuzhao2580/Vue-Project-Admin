/** 表格分页的model */
export class PageModel {
  /** 每页多少条数据 */
  pageSize: number
  /** 当前的页数 */
  pageNum: number
  /** 总页数 */
  total: number
  constructor(pageSize: number = 10, pageNum: number = 1, total: number = 0) {
    this.pageSize = pageSize
    this.pageNum = pageNum
    this.total = total
  }
}
