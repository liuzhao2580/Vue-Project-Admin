import { FilterConditionModel } from "@/typescript/shared/model/filterModel/filter-condition.model"
/** 搜索栏中 给每个组件绑定 v-model */
export class SearchModelValue {
  [propName: string]: FilterConditionModel
}
