/** 表格分页的model */
export class PageModel {
  /** 每页多少条数据 */
  pageSize: number
  /** 当前的页数 */
  pageNum: number
  /** 总页数 */
  total: number
  constructor(pageSize = 10, pageNum = 1, total = 0) {
    this.pageSize = pageSize
    this.pageNum = pageNum
    this.total = total
  }
}
