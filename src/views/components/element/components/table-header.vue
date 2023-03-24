<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <template v-for="(headerItem, headerIndex) in headerData">
        <!-- 下拉框选择器 -->
        <el-table-column
          v-if="headerItem.select"
          :label="headerItem.label"
          :prop="headerItem.prop"
          :key="headerIndex"
        >
          <!-- 表头的 slot -->
          <template #header>
            <el-popover
              placement="bottom"
              title="请选择"
              width="200"
              trigger="click"
            >
              <template #reference>
                <div class="search-header">
                  <span class="search-title">{{ headerItem.label }}</span>
                  <i class="search-icon el-icon-search"></i>
                </div>
              </template>
              <el-select v-model="headerItem.selectValue" placeholder="请选择">
                <el-option
                  v-for="item in headerItem.selectOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-popover>
          </template>
          <!-- 表格的 内容 slot -->
          <template #default="scope">
            {{ scope.row[headerItem.prop] }}
          </template>
        </el-table-column>
        <!-- 日期选择器 -->
        <template v-else-if="headerItem.dateSelect">
          <el-table-column
            :label="headerItem.label"
            :prop="headerItem.prop"
            :key="headerIndex"
          >
            <template #header>
              <el-popover placement="bottom" title="请选择" trigger="click">
                <template #reference>
                  <div class="search-header">
                    <span class="search-title">{{ headerItem.label }}</span>
                    <i class="el-icon-arrow-down search-icon"></i>
                  </div>
                </template>
                <el-date-picker
                  v-model="headerItem.dateValue"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-popover>
            </template>
            <template #default="scope">
              {{ scope.row[headerItem.prop] }}
            </template>
          </el-table-column>
        </template>
        <!-- 输入框 -->
        <template v-else-if="headerItem.inputSelect">
          <el-table-column
            :label="headerItem.label"
            :prop="headerItem.prop"
            :key="headerIndex"
          >
            <template #header>
              <el-popover placement="bottom" title="请选择" trigger="click">
                <template #reference>
                  <div class="search-header">
                    <span class="search-title">{{ headerItem.label }}</span>
                    <i class="search-icon el-icon-search"></i>
                  </div>
                </template>
                <el-input
                  v-model="headerItem.inputValue"
                  placeholder="请输入内容"
                ></el-input>
              </el-popover>
            </template>
            <template #default="scope">
              {{ scope.row[headerItem.prop] }}
            </template>
          </el-table-column>
        </template>
        <template v-else>
          <el-table-column
            :label="headerItem.label"
            :prop="headerItem.prop"
            :key="headerIndex"
          >
          </el-table-column>
        </template>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { shallowRef } from "vue"
const headerData = shallowRef([
  {
    label: "日期",
    prop: "date",
    dateSelect: true,
    dateValue: ""
  },
  {
    label: "名称",
    prop: "name",
    inputSelect: true,
    inputValue: ""
  },
  {
    label: "类型",
    prop: "type",
    select: true,
    selectValue: "",
    selectOptions: [
      {
        value: "Vue",
        label: "Vue"
      },
      {
        value: "React",
        label: "React"
      },
      {
        value: "Angular",
        label: "Angular"
      }
    ]
  }
])
const tableData = shallowRef([
  {
    date: "2016-05-02",
    name: "王小虎",
    type: "Vue"
  },
  {
    date: "2016-05-04",
    name: "王小虎",
    type: "React"
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    type: "Angular"
  }
])
</script>

<script lang="ts">
export default {
  name: "TableHeaderCom"
}
</script>

<style lang="scss" scoped>
.search-header {
  cursor: pointer;
  .search-title {
    font-weight: 900;
    margin-right: 10px;
  }
  .search-icon {
    font-size: 16px;
  }
}
</style>
