<template>
  <div>
    <!-- 说明是可搜索的 -->
    <template v-if="tableHeaderSearch.searchable">
      <!-- 输入框 -->
      <el-input
        style="width: 100%"
        size="mini"
        v-model="searchParamsValue[tableHeaderSearch.prop].filterValue"
        v-if="tableHeaderSearch.searchConfig.type === ESearchType.input"
        placeholder="请输入"
      />
      <!-- 年月日 -->
      <el-date-picker
        style="width: 100%"
        size="mini"
        v-else-if="tableHeaderSearch.searchConfig.type === ESearchType.date"
        type="date"
        v-model="searchParamsValue[tableHeaderSearch.prop].filterValue"
        placeholder="选择日期"
      >
      </el-date-picker>
      <!-- 年月日时分秒 -->
      <el-date-picker
        style="width: 100%"
        size="mini"
        v-else-if="tableHeaderSearch.searchConfig.type === ESearchType.dateTime"
        type="datetime"
        v-model="searchParamsValue[tableHeaderSearch.prop].filterValue"
        placeholder="选择日期时间"
      >
      </el-date-picker>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import { ESearchType, ColumnConfig } from "@/typescript/shared/model/tableModel/table-config.model"
import { SearchModelValue } from "../shared/model/serach-model-value"
@Component({
  name: "tableHeaderSearch",
})
export default class TableHeaderSearchComponent extends Vue {
  /** 表格的搜索配置 */
  @Prop({ required: true, default: () => {}, type: Object }) tableHeaderSearch!: ColumnConfig
  /** 给每个 model 赋值 */
  @Prop({ required: true, default: () => new SearchModelValue(), type: Object })
  searchParamsValue!: SearchModelValue
  /** 搜索的类型 */
  ESearchType = ESearchType
}
</script>

<style lang="scss" scoped></style>
