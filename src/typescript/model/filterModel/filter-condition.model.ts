/** 过滤条件的 model */

export class FilterConditionModel {
  /** 过滤字段 */
  filterField: string
  /** 操作符 */
  operator: string
  /** 过滤值 */
  filterValue: any = null

  constructor(filterField?: string, operator?, filterValue: any = null) {
    this.filterField = filterField as string
    this.operator = operator
    this.filterValue = filterValue
  }
}
