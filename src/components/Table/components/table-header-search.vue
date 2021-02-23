<template>
  <div>
    <!-- 说明是可搜索的 -->
    <template v-if="tableHeaderSearch.searchable">
      <!-- 输入框 -->
      <el-input
        style="width: 100%"
        size="mini"
        v-model="modelValue"
        v-if="tableHeaderSearch.searchConfig.type === ESearchType.input"
        placeholder="请输入"
      />
      <!-- 年月日 -->
      <el-date-picker
        style="width: 100%"
        size="mini"
        v-else-if="tableHeaderSearch.searchConfig.type === ESearchType.date"
        type="date"
        v-model="modelValue"
        placeholder="选择日期"
      >
      </el-date-picker>
      <!-- 年月日时分秒 -->
      <el-date-picker
        style="width: 100%"
        size="mini"
        v-else-if="tableHeaderSearch.searchConfig.type === ESearchType.dateTime"
        type="datetime"
        v-model="modelValue"
        placeholder="选择日期时间"
      >
      </el-date-picker>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import { ESearchType } from "@/typescript/model/tableModel/table-config.model"
@Component({
  name: "tableHeaderSearch",
})
export default class TableHeaderSearchComponent extends Vue {
  /** 表格的搜索配置 */
  @Prop({ required: true, default: () => {}, type: Object }) tableHeaderSearch
  /** 搜索的类型 */
  ESearchType = ESearchType
  modelValue = null
}
</script>

<style lang="scss" scoped></style>
