import { FilterConditionModel } from '@/typescript/shared/model/tableModel/filter-condition.model'
import { TableConfigModel } from '@/typescript/shared/model/tableModel/table-config.model'
import { SearchModelValue } from '../model/serach-model-value'
/** 初始化表格过滤的字段 */
export const initFilterField = (tableConfig: TableConfigModel): SearchModelValue => {
  const queryParam = new SearchModelValue()
  tableConfig.columnConfig.forEach((columnItem) => {
    if (columnItem.searchable) {
      const filterCondition = new FilterConditionModel(columnItem.searchKey || columnItem.prop)
      queryParam[columnItem.prop] = filterCondition
    }
  })
  return queryParam
}
