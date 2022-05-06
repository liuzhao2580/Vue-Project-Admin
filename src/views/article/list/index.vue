<template>
  <div class="article-list-box">
    <TableComponent
      :tableData="tableData"
      :tableConfig="tableConfig"
      :pageConfig="pageConfig"
      @pageCurrentChange="pageCurrentChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, shallowReactive, shallowRef } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { queryArticleListAPI } from '@/api/modules/article'
import { ResultCodeEnum } from '@/typescript/shared/enum'
import { TableConfigModel } from '@/typescript/shared/model/tableModel/table-config.model'
import { PageModel } from '@/typescript/shared/model/tableModel/page-config.model'
import { FilterConditionModel } from '@/typescript/shared/model/tableModel/filter-condition.model'
import { IArticleBasic } from '@/typescript/views/article/interface/article-config.interface'
import TableComponent from '@/components/Table/index.vue'
import {
  EColumnType,
  EOperationType,
  ESearchType
} from '@/typescript/shared/enum/table-enum'
/** 表格的数据 */
const tableData = ref<IArticleBasic[]>([])
/** 表格的分页 */
const pageConfig = shallowRef<PageModel>(new PageModel())
/** 表格的列配置 */
const tableConfig = shallowReactive<TableConfigModel>(
  new TableConfigModel({
    loading: true,
    printFlag: true,
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
        handle: handleEdit
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
)

onMounted(() => {
  init()
})
/** 初始化 */
const init = async () => {
  tableConfig.loading = true
  const result = await queryArticleListAPI(pageConfig.value)
  if (result.code === ResultCodeEnum.success) {
    tableData.value = result.data
    pageConfig.value.total = result.totalCount as number
  }
  tableConfig.loading = false
}

/** 编辑按钮触发 */
function handleEdit() {
  console.log(12345)
}

/** 页码改变时触发 */
const pageCurrentChange = (current: number) => {
  pageConfig.value.pageNum = current
  init()
}
</script>

<script lang="ts">
import { RouterName } from '@/router/RouteConst'
export default {
  name: RouterName.ARTICLE_LIST
}
</script>

<style lang="scss" scoped></style>
