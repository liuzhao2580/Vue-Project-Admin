<template>
  <div class="table-component-box">
    <!-- 表格头部的盒子,用来填充左上角的按钮和右上角的功能按钮 -->
    <div class="table-top-box">
      <div class="operation-left"></div>
      <div class="operation-right">
        <!-- 搜索 -->
        <span
          v-if="tableConfig.searchIcon !== false"
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
      <el-table-column fixed type="selection" width="60" v-if="tableConfig.checkout">
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
        <template slot-scope="scope">
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
            <span v-if="judgeTime(tableItem.type)"
              >{{ handleTranslateTime(scope.row[tableItem.prop], tableItem.type) }}
            </span>
            <span v-else>{{ scope.row[tableItem.prop] }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="100">
        <template slot-scope="scope">
          <!-- 搜索栏开启时的操作 -->
          <template v-if="scope.$index === 0 && tableConfig.showSearch">
            <el-tooltip placement="top" effect="light" content="搜索">
              <el-button icon="el-icon-search" size="mini" circle @click="handleSearch"></el-button>
            </el-tooltip>
            <el-tooltip placement="top" effect="light" content="重置">
              <el-button icon="el-icon-refresh" size="mini" circle></el-button>
            </el-tooltip>
          </template>
          <!-- 其他操作 -->
          <template v-else v-for="(operaItem, operaIndex) in tableConfig.operation">
            <el-tooltip :key="operaIndex" :content="operaItem.text" placement="top" effect="light">
              <el-button
                size="mini"
                circle
                :icon="operaIcon(operaItem.icon)"
                :type="operaItem.type"
                @click="operaHandle(operaItem.handle)"
              ></el-button>
            </el-tooltip>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
import moment from "moment"
import { TableConfigModel, EColumnType } from "@/typescript/model/tableModel/table-config.model"
import { FilterConditionModel } from "@/typescript/model/filterModel/filter-condition.model"
import { initFilterField } from "./shared/utils"
import { SearchModelValue } from "./shared/model/serach-model-value"
import tableHeaderSearch from "./components/table-header-search.vue"
@Component({
  name: "tableComponent",
  components: {
    tableHeaderSearch,
  },
})
export default class TableComponent extends Vue {
  /** 表格的数据 */
  @Prop({ required: true, type: Array, default: () => [] }) tableData!: Array<any>
  /** 表格的列配置 */
  @Prop({ required: true, type: Object, default: () => {} }) tableConfig!: TableConfigModel
  /** 表格的样式 */
  get tableHeaderStyle() {
    return { background: "#e0e0e0", color: "#333", fontWeight: 900 }
  }
  /** 表格的列 type 的类型 */
  EColumnType!: EColumnType
  /** 表格过滤的条件 */
  searchParamsValue: SearchModelValue = new SearchModelValue()
  created() {
    this.searchParamsValue = initFilterField(this.tableConfig)
    console.log(this.searchParamsValue, "this.filterCondition")
  }
  /** 自定义索引 */
  indexMethod(index) {
    if (this.tableConfig.showSearch) {
      if (index) return index
    } else return index + 1
  }
  /** 判断是否是时间type */
  judgeTime(type: EColumnType) {
    return EColumnType[type]
  }
  /** 处理时间 */
  handleTranslateTime(time: Date, type: EColumnType) {
    let translateTime
    if (type === EColumnType.date) {
      translateTime = moment(time).format("YYYY-MM-DD")
    } else if (type === EColumnType.dateTime) {
      translateTime = moment(time).format("YYYY-MM-DD HH:mm:ss")
    }
    return translateTime
  }
  /** 表格的操作按钮的样式,可能是直接使用的 elementUI默认的icon ,也可能使用的是iconfont的字体图标 */
  operaIcon(icon: string) {
    if (icon.startsWith("el-icon")) return icon
    else return `iconfont ${icon}`
  }
  /** 表格按钮的操作 */
  operaHandle(handle) {
    handle()
  }
  /** 表格的打印 */
  tablePrint() {
    window.print()
  }
  /** 展开关闭 表格的搜索 */
  tableSearch() {
    // 用来显示隐藏搜索栏
    const showSearch: boolean = this.tableConfig.showSearch as boolean
    // 说明搜索栏已经展开
    if (showSearch) {
      this.tableData.splice(0, 1)
    }
    // 说明搜索栏还未展开
    else {
      if (this.tableConfig.columnConfig) {
        const getFilter = this.tableConfig.columnConfig.map((item) => {
          return item.prop
        })
        const filterObj = {}
        getFilter.forEach((item) => (filterObj[item] = ""))
        this.tableData.unshift(filterObj)
      }
    }
    this.tableConfig.showSearch = !showSearch
  }
  /** 表格点击搜索按钮 */
  handleSearch() {
    console.log(this.searchParamsValue, "this.searchParamsValue")
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
