<template>
  <div class="table-component-box">
    <!-- 表格头部的盒子,用来填充左上角的按钮和右上角的功能按钮 -->
    <div class="table-top-box">
      <div class="operation-left"></div>
      <div class="operation-right">
        <!-- 搜索 -->
        <span
          v-if="searchIconFlag"
          title="搜索"
          @click="tableSearch"
          class="right-icon iconfont icon-sousuo"
        ></span>
        <!-- 打印 -->
        <span
          v-if="tableConfig.printFlag"
          title="打印"
          @click="tablePrint"
          class="right-icon iconfont icon-dayin-dayinji"
        ></span>
      </div>
    </div>
    <!-- 搜索组件 -->
    <TableSearch
      v-show="tableSearchShow"
      :column-config="tableSearchFilterData"
      :search-model="tableSearchModel"
      @maskClick="searchShow = false"
    />
    <el-table
      style="width: 100%"
      class="table"
      v-loading="tableConfig.loading"
      :border="tableConfig.borderFlag"
      :stripe="tableConfig.stripeFlag"
      :data="tableData"
      :header-cell-style="tableHeaderStyle"
    >
      <!-- 多选 -->
      <el-table-column
        fixed
        type="selection"
        width="60"
        v-if="tableConfig.checkoutFlag"
      >
      </el-table-column>
      <!-- 序号 -->
      <el-table-column
        fixed
        type="index"
        label="序号"
        width="60"
        v-if="tableConfig.indexFlag"
      >
      </el-table-column>
      <el-table-column
        :fixed="tableItem.fixed"
        :label="tableItem.label"
        :width="tableItem.width || 150"
        :show-overflow-tooltip="tableItem.tooltipFlag"
        v-for="(tableItem, tableIndex) in tableConfig.columnConfig"
        :key="tableIndex"
      >
        <template #default="scope">
          <!-- 时间,日期转换 -->
          <span v-if="EColumnTypeFlag(tableItem.type!)"
            >{{
                handleTranslateTime(scope.row[tableItem.prop], tableItem.type!)
            }}
          </span>
          <span v-else>{{ scope.row[tableItem.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="100">
        <!-- 其他操作 -->
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
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <div class="pagination-box">
      <el-pagination
        layout="total, prev, pager, next,sizes, jumper"
        :page-sizes="[10, 20, 50, 100]"
        background
        :total="pageConfig.total"
        @current-change="currentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, withDefaults } from 'vue'
import moment from 'moment'
import { TableConfigModel } from '@/typescript/shared/model/tableModel/table-config.model'
import { PageModel } from '@/typescript/shared/model/tableModel/page-config.model'
import { EColumnType } from '@/typescript/shared/enum/table-enum'
import TableSearch from './components/TableSearch/index.vue'
import { onBeforeRouteLeave } from 'vue-router'
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

const emits = defineEmits<{ (e: 'pageCurrentChange', current: number): void }>()

/** 用来处理 表格搜索组件的显示隐藏 */
const searchShow = ref<boolean>(false)
/** 表格搜索组件的显示隐藏 */
const tableSearchShow = computed(() => {
  let flag = false
  if (props.tableConfig.searchFlag) flag = false
  if (searchShow.value) flag = true
  return flag
})

/** 表格的样式 */
const tableHeaderStyle = computed(() => {
  return { background: '#e0e0e0', color: '#333', fontWeight: 900 }
})
/** 用来设置 搜索按钮的显示隐藏 */
const searchIconFlag = computed(() => {
  let flag = false
  const searchable = props.tableConfig.columnConfig.some(
    columnItem => columnItem.searchable
  )
  if (props.tableConfig.searchFlag || searchable) flag = true
  return flag
})

/** 用来过滤 表格搜索组件需要的参数 */
const tableSearchFilterData = computed(()=> {
  return props.tableConfig.columnConfig.filter(item => {
    return item.searchable
  })
})

/** 表格搜索组件中, 用来绑定 model */
const tableSearchModel = computed(()=> {
  let returnObj: {
    [key: string]: string
  } = {}
  tableSearchFilterData.value.forEach(item => {
    returnObj[item.prop] = ''
  })
  return returnObj
})

const EColumnTypeFlag = (type: EColumnType) => {
  return EColumnType[type]
}

onMounted(() => {
  window.addEventListener('keydown', listenerEscKey)
})

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
  searchShow.value = !searchShow.value
}

/** 表格的页码改变事件 */
const currentChange = (current: number) => {
  emits('pageCurrentChange', current)
}

/** 监听 esc 按钮按下 */
const listenerEscKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    if (searchShow.value) searchShow.value = false
  }
}

onBeforeRouteLeave(() => {
  window.removeEventListener('keydown', listenerEscKey)
})
</script>

<script lang="ts">
export default {
  name: 'TableComponent'
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
