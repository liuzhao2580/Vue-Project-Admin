<template>
  <div class="dashboard-box">
    <!-- 卡片 -->
    <CardCom />
    <!-- Echarts 图表 -->
    <EchartsCom :echartsData="echartsData" />
    <!-- 自动播放的 echart 图表 -->
    <EchartsCom ref="echartRef" :echartsData="autoPlayBarEchartsData" />
    <el-row :gutter="20">
      <!-- todo-list -->
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <TodoList />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref, shallowRef, onBeforeUnmount } from "vue"
import type { ECharts } from "echarts"
import { dashboardEchartsApi } from "@/api/modules/dashboard"
import EchartsCom from "@/components/EchartsCom/index.vue"
import CardCom from "./components/CardCom/index.vue"
import TodoList from "./components/TodoList/index.vue"
import { ResultCodeEnum } from "@/typescript/shared/enum"
import {
  AutoPlayBarEchartsUtils,
  clearEchartsInterval
} from "@/utils/modules/echarts.utils"

const echartsData = ref()
// 获取自动播放的 柱形图的 ref
const echartRef = ref<{
  echartsInstances: ECharts;
}>()

const autoPlayBarEchartsData = shallowRef()
onMounted(() => {
  init()
  nextTick(() => {
    autoPlayBarEchartsData.value = AutoPlayBarEchartsUtils(
      echartRef.value?.echartsInstances as ECharts
    )
  })
})

// 初始化
const init = async () => {
  try {
    const result = await dashboardEchartsApi()
    if (result.code === ResultCodeEnum.SUCCESS) {
      echartsData.value = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true
          }
        ]
      }
    }
  } catch (error) {
    console.log(error)
  }
}

onBeforeUnmount(() => {
  clearEchartsInterval()
})
</script>

<script lang="ts">
import { RouterName } from "@/router/RouteConst"
export default {
  name: RouterName.DASHBOARD
}
</script>

<style lang="scss" scoped></style>
