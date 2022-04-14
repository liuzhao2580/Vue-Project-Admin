<template>
  <div class="article-list-box">
    <table-component
      :tableData="tableData"
      :tableConfig="tableConfig"
      :pageConfig="pageConfig"
    />
  </div>
</template>

<script lang="ts" setup>
import { queryArticleList_API } from '@/api/modules/article'
import { ResultCodeEnum } from '@/typescript/shared/enum'
import {
  TableConfigModel,
  EColumnType,
  EOperationType,
  ESearchType
} from '@/typescript/shared/model/tableModel/table-config.model'
import { PageModel } from '@/typescript/shared/model/tableModel/page-config.model'
import { FilterConditionModel } from '@/typescript/shared/model/tableModel/filter-condition.model'
import { IArticleBasic } from '@/typescript/views/article/interface/article-config.interface'
import tableComponent from '@/components/Table/index.vue'
import { RouterName } from '@/router/RouteConst'
import { onMounted, reactive, ref } from 'vue'
/** 表格的数据 */
const tableData = ref<IArticleBasic[]>([])
/** 表格的分页 */
const pageConfig = ref<PageModel>(new PageModel())
/** 表格的列配置 */
const tableConfig = reactive<TableConfigModel>({
  loading: true,
  print: true,
  columnConfig: [
    {
      label: '文章标题',
      prop: 'article_title',
      fixed: true,
      searchable: true,
      searchConfig: {
        type: ESearchType.input
      }
    },
    {
      label: '分类',
      prop: 'category_name',
      searchable: false
    },
    {
      label: '创建时间',
      type: EColumnType.dateTime,
      prop: 'article_time',
      width: 200,
      searchable: true,
      searchConfig: {
        type: ESearchType.dateTime
      }
    },
    {
      label: '更新时间',
      type: EColumnType.dateTime,
      prop: 'article_update_time',
      width: 200,
      searchable: true,
      searchConfig: {
        type: ESearchType.dateTime
      }
    }
  ],
  operation: [
    {
      type: EOperationType.primary,
      text: '编辑',
      icon: 'el-icon-edit',
      handle: () => {
        console.log('123')
      }
    },
    {
      type: EOperationType.danger,
      text: '删除',
      icon: 'el-icon-delete',
      handle: () => {
        console.log(46, '123')
      }
    }
  ],
  handleSearch: (event: FilterConditionModel[]) => {
    console.log(event)
  }
})
onMounted(() => {
  init()
})
/** 初始化 */
const init = async () => {
  const result = await queryArticleList_API()
  if (result.code === ResultCodeEnum.success) {
    console.log(result, 'data')
    tableData.value = result.data
  }
  tableConfig.loading = false
}
</script>

<script lang="ts">
export default {
  name: RouterName.ARTICLE_LIST
}
</script>

<style lang="scss" scoped></style>
