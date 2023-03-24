<template>
  <div>
    <!-- 说明是可搜索的 -->
    <template v-if="tableHeaderSearch.searchable">
      <!-- 输入框 -->
      <el-input
        style="width: 100%"
        size="small"
        v-model="state.inputValue"
        v-if="tableHeaderSearch.searchConfig?.type === ESearchType.input"
        placeholder="请输入"
      />
      <!-- 年月日 -->
      <el-date-picker
        style="width: 100%"
        size="small"
        v-else-if="tableHeaderSearch.searchConfig?.type === ESearchType.date"
        type="date"
        v-model="state.dateValue"
        placeholder="选择日期"
      >
      </el-date-picker>
      <!-- 年月日时分秒 -->
      <el-date-picker
        style="width: 100%"
        size="small"
        v-else-if="
          tableHeaderSearch.searchConfig?.type === ESearchType.dateTime
        "
        type="datetime"
        v-model="state.dateTimeValue"
        placeholder="选择日期时间"
      >
      </el-date-picker>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue"
import { SearchModelValue } from "../shared/model/serach-model-value"
import { IColumnConfig } from "@/typescript/shared/interface/table-interface"
import { ESearchType } from "@/typescript/shared/enum/table-enum"

interface IProps {
  /** 表格的搜索配置 */
  tableHeaderSearch: IColumnConfig;
  /** 给每个 model 赋值 */
  searchParamsValue: SearchModelValue;
}

defineProps<IProps>()

interface IState {
  /** 输入框 */
  inputValue: string;
  /** 年月日 */
  dateValue: string;
  /** 年月日时分秒 */
  dateTimeValue: string;
}

const state = reactive<IState>({
  inputValue: "",
  dateValue: "",
  dateTimeValue: ""
})
</script>

<script lang="ts">
export default {
  name: "TableHeaderSearch"
}
</script>

<style lang="scss" scoped></style>
