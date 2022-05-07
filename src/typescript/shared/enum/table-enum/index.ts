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
  /** 年月日 时分秒范围 YYYY-MM-DD HH:mm:ss ~ YYYY-MM-DD HH:mm:ss */
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