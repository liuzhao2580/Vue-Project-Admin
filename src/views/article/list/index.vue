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
import { onMounted, ref, shallowReactive, shallowRef } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { queryArticleListAPI } from '@/api/modules/article'
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
/** 表格的数据 */
const tableData = ref<IArticleBasic[]>([])
/** 表格的分页 */
const pageConfig = shallowRef<PageModel>(new PageModel())
/** 表格的列配置 */
const tableConfig = shallowReactive<TableConfigModel>({
  loading: true,
  print: true,
  columnConfig: [
    {
      label: '文章标题',
      prop: 'title',
      fixed: true,
      width: 'auto',
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
      prop: 'create_time',
      width: 200,
      searchable: true,
      searchConfig: {
        type: ESearchType.dateTime
      }
    },
    {
      label: '更新时间',
      type: EColumnType.dateTime,
      prop: 'update_time',
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
      icon: Edit,
      handle: () => handleEdit
    },
    {
      type: EOperationType.danger,
      text: '删除',
      icon: Delete,
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
  const result = await queryArticleListAPI()
  if (result.code === ResultCodeEnum.success) {
    console.log(result, 'data')
    tableData.value = result.data
  }
  tableConfig.loading = false
}

/** 编辑按钮触发 */
const handleEdit = ()=> {
  console.log(12345)
}
</script>

<script lang="ts">
import { RouterName } from '@/router/RouteConst'
export default {
  name: RouterName.ARTICLE_LIST
}
</script>

<style lang="scss" scoped></style>
