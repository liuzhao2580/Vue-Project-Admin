<template>
  <div class="table-component-box">
    <!-- 表格头部的盒子,用来填充左上角的按钮和右上角的功能按钮 -->
    <div class="table-top-box">
      <div class="operation-left"></div>
      <div class="operation-right">
        <!-- 搜索 -->
        <span
          v-if="searchIconFlag()"
          title="搜索"
          @click="tableSearch"
          class="right-icon el-icon-search"
        ></span>
        <!-- 打印 -->
        <span
          v-if="tableConfig.print"
          title="打印"
          @click="tablePrint"
          class="right-icon el-icon-printer"
        ></span>
      </div>
    </div>
    <el-table
      style="width: 100%"
      class="table"
      v-loading="tableConfig.loading"
      :border="tableConfig.border !== false"
      :stripe="tableConfig.stripe !== false"
      :data="tableData"
      :header-cell-style="tableHeaderStyle"
    >
      <!-- 多选 -->
      <el-table-column
        fixed
        type="selection"
        width="60"
        v-if="tableConfig.checkout"
      >
      </el-table-column>
      <!-- 序号 -->
      <el-table-column
        fixed
        type="index"
        label="序号"
        width="60"
        :index="indexMethod"
        v-if="tableConfig.index !== false"
      >
      </el-table-column>
      <el-table-column
        :fixed="tableItem.fixed"
        :label="tableItem.label"
        :width="tableItem.width ? tableItem.width : 150"
        :show-overflow-tooltip="tableItem.showTooltip !== false"
        v-for="(tableItem, tableIndex) in tableConfig.columnConfig"
        :key="tableIndex"
      >
        <template v-slot="scope">
          <!-- 搜索栏 -->
          <template v-if="scope.$index === 0 && tableConfig.showSearch">
            <table-header-search
              :tableHeaderSearch="tableItem"
              :searchParamsValue="searchParamsValue"
            />
          </template>
          <!-- 数据栏 -->
          <template v-else>
            <!-- 时间,日期转换 -->
            <span v-if="EColumnTypeFlag(tableItem.type!)"
              >{{
                handleTranslateTime(scope.row[tableItem.prop], tableItem.type!)
              }}
            </span>
            <span v-else>{{ scope.row[tableItem.prop] }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="100">
        <template v-slot="scope">
          <!-- 搜索栏开启时的操作 -->
          <template v-if="scope.$index === 0 && tableConfig.showSearch">
            <el-tooltip placement="top" effect="light" content="搜索">
              <el-button
                icon="el-icon-search"
                size="small"
                circle
                @click="handleSearch"
              ></el-button>
            </el-tooltip>
            <el-tooltip placement="top" effect="light" content="重置">
              <el-button icon="el-icon-refresh" size="small" circle></el-button>
            </el-tooltip>
          </template>
          <!-- 其他操作 -->
          <template v-else>
            <el-tooltip
              v-for="(operaItem, operaIndex) in tableConfig.operation"
              :key="operaIndex"
              :content="operaItem.text"
              placement="top"
              effect="light"
            >
              <el-button
                size="small"
                circle
                :icon="operaItem.icon"
                :type="operaItem.type"
                @click="operaItem.handle"
              ></el-button>
            </el-tooltip>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <div class="pagination-box">
      <el-pagination
        layout="total, prev, pager, next,sizes, jumper"
        :page-sizes="[10, 20, 50, 100]"
        background
        :total="pageConfig.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, withDefaults } from 'vue'
import moment from 'moment'
import {
  TableConfigModel,
  EColumnType
} from '@/typescript/shared/model/tableModel/table-config.model'
import { FilterConditionModel } from '@/typescript/shared/model/tableModel/filter-condition.model'
import { initFilterField } from './shared/utils'
import { SearchModelValue } from './shared/model/serach-model-value'
import tableHeaderSearch from './components/table-header-search.vue'
import { PageModel } from '@/typescript/shared/model/tableModel/page-config.model'

interface IProps {
  /** 表格的数据 */
  tableData: any[]
  /** 表格的列配置 */
  tableConfig: TableConfigModel
  /** 表格的分页 */
  pageConfig: PageModel
}

const props = withDefaults(defineProps<IProps>(), {
  tableData: () => [],
  tableConfig: () => new TableConfigModel(),
  pageConfig: () => new PageModel()
})

/** 表格过滤的条件 */
const searchParamsValue = ref<SearchModelValue>(
  initFilterField(props.tableConfig)
)

/** 表格的样式 */
const tableHeaderStyle = computed(() => {
  return { background: '#e0e0e0', color: '#333', fontWeight: 900 }
})
/** 用来设置 搜索按钮的显示隐藏 */
const searchIconFlag = () => {
  const searchable = props.tableConfig.columnConfig.some(
    columnItem => columnItem.searchable
  )
  if (props.tableConfig.searchIcon !== false && searchable) return true
}
/** 自定义索引,当开启搜索栏的时候,索引为0的不显示 */
const indexMethod = (index: number) => {
  if (props.tableConfig.showSearch) {
    if (index) return index
  } else return index + 1
}

const EColumnTypeFlag = (type: EColumnType) => {
  return EColumnType[type]
}

/** 处理时间 */
const handleTranslateTime = (time: Date, type: EColumnType) => {
  let translateTime
  if (type === EColumnType.date) {
    translateTime = moment(time).format('YYYY-MM-DD')
  } else if (type === EColumnType.dateTime) {
    translateTime = moment(time).format('YYYY-MM-DD HH:mm:ss')
  }
  return translateTime
}
/** 表格的操作按钮的样式,可能是直接使用的 elementUI默认的icon ,也可能使用的是iconfont的字体图标 */
// const operaIcon = (icon: string) => {
//   if (icon.startsWith('el-icon')) return icon
//   else return `iconfont ${icon}`
// }
/** 表格的打印 */
const tablePrint = () => {
  window.print()
}
/** 展开关闭 表格的搜索 */
const tableSearch = () => {
  // 用来显示隐藏搜索栏
  const showSearch: boolean = props.tableConfig.showSearch as boolean
  // 说明搜索栏已经展开
  if (showSearch) {
    // props.tableData.splice(0, 1)
  }
  // 说明搜索栏还未展开
  else {
    if (props.tableConfig.columnConfig) {
      const getFilter = props.tableConfig.columnConfig.map(item => {
        return item.prop
      })
      const filterObj = {}
      // getFilter.forEach(item => (filterObj[item] = ''))
      // props.tableData.unshift(filterObj)
    }
  }
  // props.tableConfig.showSearch = !showSearch
}
/** 表格点击搜索按钮 */
const handleSearch = () => {
  let queryParams: FilterConditionModel[] = []
  // 用来过滤 只有当 filterValue 有值的时候才说明需要过滤数据
  for (const key in searchParamsValue.value) {
    if (searchParamsValue.value[key].filterValue)
      queryParams.push(searchParamsValue.value[key])
  }
  props.tableConfig.handleSearch && props.tableConfig.handleSearch(queryParams)
}
</script>

<script lang="ts">
export default {
  name: 'TableComponent'
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
