import { Component } from 'vue'
import { EColumnType, EOperationType, ESearchType, ESelectType } from '../../enum/table-enum'
import { FilterConditionModel } from '../../model/tableModel/filter-condition.model'

/** 表格配置 */
export interface ITableConfigModel {
  /** 表格是否需要序号 默认 true 带有序号 */
  indexFlag?: boolean
  /** 是否带边框 默认 true 带有边框 */
  borderFlag?: boolean
  /** 是否为斑马纹 table 默认 true  */
  stripeFlag?: boolean
  /** 是否有选择框 默认 false 没有 */
  checkoutFlag?: boolean
  /** 表格是否有打印功能 默认false */
  printFlag?: boolean
  /** 表格是否有 搜索功能 默认true */
  searchFlag?: boolean
  /** 表格的加载状态 */
  loading: boolean
  /** 表格的列配置 */
  columnConfig: IColumnConfig[]
  /** 表格的操作 */
  operation?: IOperation[]
  /** 搜索事件 */
  handleSearch?: (event: FilterConditionModel[]) => void
  [key: string] : any
}

/** 表格的列配置 */
export interface IColumnConfig {
  /** 类型 */
  type?: EColumnType
  /** 排序 */
  sortKey?: string
  /** 每列的宽度 */
  width?: string | number
  /** * 每列的标题 */
  label: string
  /** 每列的prop */
  prop: string
  /** 当内容过长被隐藏时显示 tooltip 默认为true 显示 */
  tooltipFlag?: boolean
  /** 是否固定 默认false 不固定 */
  fixed?: boolean
  /** 是否可搜索  */
  searchable: boolean
  /** 用于需要搜索的字段 */
  searchKey?: string
  /** 搜索的配置 */
  searchConfig?: ISearchConfig
}

/** 搜索的配置 */
export interface ISearchConfig {
  /** 搜索类型 默认都是input */
  type: ESearchType
  /** 当搜索类型为下拉选择时 默认多选 */
  selectType?: ESelectType
  /** 当搜索类型为下拉选择时 下拉框中的数据 */
  selectOptions?: string
  label?: string
  value?: string
  /** 初始值 */
  initialValue?: string
  /** 当搜索类型为 步进器的时候 最小数字 */
  min?: number
  /** 当搜索类型为 步进器的时候 数字步长 */
  step?: number
}

/** 表格的操作按钮 */
export interface IOperation {
  /** 按钮的类型 */
  type: EOperationType
  /** 按钮的名称 */
  text: string
  /** 按钮的icon */
  icon: Component | string
  /** 操作 */
  handle(): void
}