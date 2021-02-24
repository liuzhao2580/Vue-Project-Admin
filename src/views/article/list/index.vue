<template>
  <div class="article-list-box">
    <table-component :tableData="tableData" :tableConfig="tableConfig" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { queryArticleList_API } from "@/api/modules/article"
import { ResultCodeEnum } from "@/typescript/enum"
import {
  TableConfigModel,
  EColumnType,
  EOperationType,
  ESearchType,
} from "@/typescript/model/tableModel/table-config.model"
import { FilterConditionModel } from "@/typescript/model/filterModel/filter-condition.model"
import { IArticleBasic } from "../shared/interface/article-config.interface"
import tableComponent from "@/components/Table/index.vue"
@Component({
  name: "article-list",
  components: {
    tableComponent,
  },
})
export default class ArticleListComponent extends Vue {
  /** 表格的数据 */
  tableData: IArticleBasic[] = []
  /** 表格的列配置 */
  tableConfig: TableConfigModel = {
    loading: true,
    print: true,
    columnConfig: [
      {
        label: "文章标题",
        prop: "article_title",
        fixed: true,
        searchable: true,
        searchConfig: {
          type: ESearchType.input,
        },
      },
      {
        label: "分类",
        prop: "category_name",
        searchable: false,
      },
      {
        label: "创建时间",
        type: EColumnType.dateTime,
        prop: "article_time",
        width: 200,
        searchable: true,
        searchConfig: {
          type: ESearchType.dateTime,
        },
      },
      {
        label: "更新时间",
        type: EColumnType.dateTime,
        prop: "article_update_time",
        width: 200,
        searchable: true,
        searchConfig: {
          type: ESearchType.dateTime,
        },
      },
    ],
    operation: [
      {
        type: EOperationType.primary,
        text: "编辑",
        icon: "el-icon-edit",
        handle: () => {
          console.log("123")
        },
      },
      {
        type: EOperationType.danger,
        text: "删除",
        icon: "el-icon-delete",
        handle: () => {
          console.log(46, "123")
        },
      },
    ],
    handleSearch: (event: FilterConditionModel[]) => {
      console.log(event)
    },
  }
  created() {
    this.init()
  }
  /** 初始化 */
  async init() {
    const result = await queryArticleList_API()
    if (result.code === ResultCodeEnum.success) {
      console.log(result, "data")
      this.tableData = result.data
    }
    this.tableConfig.loading = false
  }
  /** 初始化表格 */
  initTableConfig() {}
}
</script>

<style lang="scss" scoped></style>
