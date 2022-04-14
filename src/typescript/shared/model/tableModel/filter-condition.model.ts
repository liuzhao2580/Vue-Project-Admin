/** 过滤条件的 model */

/** 查询条件 */
export class QueryConditionModel {
  /** 分页条件 */
  pageCondition: PageConditionModel
  /** 字段过滤条件 */
  filterCondition: FilterConditionModel[] = []
  constructor() {
    this.pageCondition = new PageConditionModel(10, 1)
  }
}

/** 字段过滤 */
export class FilterConditionModel {
  /** 过滤字段 */
  filterField: string
  /** 操作符 */
  operator: string | undefined
  /** 过滤值 */
  filterValue: any = null

  constructor(filterField?: string, operator?: string, filterValue: any = null) {
    this.filterField = filterField as string
    this.operator = operator
    this.filterValue = filterValue
  }
}

/** 分页条件 */
export class PageConditionModel {
  /** 当前页 */
  pageNum: number
  /** 一页多少条 */
  pageSize: number
  constructor(pageNum: number, pageSize: number) {
    this.pageNum = pageNum
    this.pageSize = pageSize
  }
}
