/** 表格的基本配置 */

import { Component } from 'vue'
import { FilterConditionModel } from './filter-condition.model'

/** 表格配置 */
export class TableConfigModel {
  /** 表格是否需要序号 默认 true 带有序号 */
  index?: boolean = true
  /** 是否带边框 默认 true 带有边框 */
  border?: boolean = true
  /** 是否为斑马纹 table 默认 true  */
  stripe?: boolean = true
  /** 是否有选择框 默认 false 没有 */
  checkout?: boolean = false
  /** 表格是否有打印功能 默认false */
  print?: boolean = false
  /** 表格是否有 搜索功能按钮 默认true */
  searchIcon?: boolean = true
  /** 点击搜索按钮之后 显示搜索栏 */
  showSearch?: boolean = false
  /** 表格的加载状态 */
  loading = true
  /** 表格的列配置 */
  columnConfig!: ColumnConfig[]
  /** 表格的操作 */
  operation?: Operation[]
  /** 搜索事件 */
  handleSearch?: (event: FilterConditionModel[]) => void
}

/** 表格的列配置 */
export class ColumnConfig {
  /** 类型 */
  type?: EColumnType
  /** 排序 */
  sortKey?: string
  /** 每列的宽度 */
  width?: string | number
  /** * 每列的标题 */
  label!: string
  /** 每列的prop */
  prop!: string
  /** 当内容过长被隐藏时显示 tooltip 默认为true 显示 */
  showTooltip?: boolean = true
  /** 是否固定 默认false 不固定 */
  fixed?: boolean = false
  /** 是否可搜索  */
  searchable = true
  /** 用于需要搜索的字段 */
  searchKey?: string
  /** 搜索的配置 */
  searchConfig?: SearchConfig
}
/** 搜索的配置 */
class SearchConfig {
  /** 搜索类型 默认都是input */
  type!: ESearchType
  /** 当搜索类型为下拉选择时 默认多选 */
  selectType?: ESelectType
  /** 当搜索类型为下拉选择时 下拉框中的数据 */
  selectData?: string
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
interface Operation {
  /** 按钮的类型 */
  type: EOperationType
  /** 按钮的名称 */
  text: string
  /** 按钮的icon */
  icon: Component | string
  /** 操作 */
  handle(): void
}

// ------------------------------------------------表格的枚举---------------------------------
/** 表格列的类型 */
export enum EColumnType {
  /** 日期 YYYY-MM-DD */
  date = 'date',
  /** 日期时间 YYYY-MM-DD HH:mm:ss */
  dateTime = 'dateTime'
}

/** 操作按钮的类型 */
export enum EOperationType {
  /** 默认 */
  default = 'default',
  /** 主要按钮 */
  primary = 'primary',
  /** 成功 */
  success = 'success',
  /** 信息 */
  info = 'info',
  /** 警告 */
  warning = 'warning',
  /** 危险 */
  danger = 'danger'
}

/** 搜索栏的 搜索类型 */
export enum ESearchType {
  /** 输入框 */
  input = 'input',
  /** 下拉选 */
  select = 'select',
  /** 年月日 YYYY-MM-DD */
  date = 'date',
  /** 年月日 范围 YYYY-MM-DD~YYYY-MM-DD */
  dateRange = 'dateRange',
  /** 年月日 时分秒 YYYY-MM-DD HH:mm:ss */
  dateTime = 'dateTime',
  /** 年月日 时分秒范围 YYYY-MM-DD HH:mm:ss ~ YYYY-MM-DD HH:mm:ss*/
  dateTimeRange = 'dateTimeRange',
  /** 步进器 */
  inputNumber = 'inputNumber'
}

/** 搜索栏的搜索类型为 select 的时候 是多选还是单选 */
export enum ESelectType {
  /** 多选 */
  multiple = 'multiple',
  /** 单选 */
  default = 'default'
}
// ------------------------------------------------表格的枚举---------------------------------
