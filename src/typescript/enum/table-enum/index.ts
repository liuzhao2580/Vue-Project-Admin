/** 表格列的类型 */
export enum ColumnTypeEnum {
    /** 日期 YYYY-MM-DD */
    time = "time",
    /** 日期时间 YYYY-MM-DD HH:mm:ss */
    dateTime = "dateTime",
}

/** 操作按钮的类型 */
export enum OperationTypeEnum {
    /** 默认 */
    default = "default",
    /** 主要按钮 */
    primary = "primary",
    /** 成功 */
    success = "success",
    /** 信息 */
    info = "info",
    /** 警告 */
    warning = "warning",
    /** 危险 */
    danger = "danger",
}
