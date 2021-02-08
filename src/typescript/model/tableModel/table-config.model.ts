import { ColumnTypeEnum } from "../../enum/table-enum"
/** 表格的基本配置 */

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
    /** 表格的列配置 */
    columnConfig!: ColumnConfig[]
}

/** 表格的列配置 */
class ColumnConfig {
    /** 类型 */
    type?: ColumnTypeEnum
    searchKey?: string // 用于查询
    sortKey?: string // 排序
    width?: any // 每列的宽度
    label!: string // 每列的标题
    prop!: string // 每列的prop
}
