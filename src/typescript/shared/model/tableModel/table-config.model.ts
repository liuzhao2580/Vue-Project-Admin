/** 表格的基本配置 */
import {
  IColumnConfig,
  IOperation,
  ITableConfigModel
} from "../../interface/table-interface"

/** 表格配置 */
export class TableConfigModel implements ITableConfigModel {
  /** 表格是否需要序号 默认 true 带有序号 */
  indexFlag = true
  /** 是否带边框 默认 true 带有边框 */
  borderFlag = true
  /** 是否为斑马纹 table 默认 true  */
  stripeFlag = true
  /** 是否有选择框 默认 false 没有 */
  checkoutFlag = false
  /** 表格是否有打印功能 默认false */
  printFlag = false
  /** 表格是否有 搜索功能 默认true */
  searchFlag = true
  /** 表格的加载状态 */
  loading = true
  /** 表格的列配置 */
  columnConfig: IColumnConfig[] = []
  /** 表格的操作 */
  operation: IOperation[] = []
  /** 搜索事件 */
  handleSearch: () => void = () => {};
  [key: string]: any

  constructor(params?: ITableConfigModel) {
    for (const key in params) {
      this[key] = params[key]
    }
  }
}

/** 表格的列配置 */
export class ColumnConfig implements IColumnConfig {
  /** 每列的标题 */
  label!: string
  /** 每列的prop */
  prop!: string
  /** 当内容过长被隐藏时显示 tooltip 默认为true 显示 */
  tooltipFlag = true
  /** 是否固定 默认false 不固定 */
  fixed = false
  /** 是否可搜索  */
  searchable = true

  constructor() {}
}
