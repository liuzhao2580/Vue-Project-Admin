<template>
  <div class="dashboard-box">
    <!-- 卡片 -->
    <!-- <CardCom /> -->
    <!-- Echarts 图表 -->
    <EchartsCom :echartsData="echartsData" />
    <el-row :gutter="20">
      <!-- todo-list -->
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <TodoList />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { dashboardEchartsApi } from '@/api/modules/dashboard'
import EchartsCom from '@/components/EchartsCom/index.vue'
// import CardCom from './components/CardCom/index.vue'
import TodoList from './components/TodoList/index.vue'
import { ResultCodeEnum } from '@/typescript/shared/enum'

const echartsData = ref()

onMounted(() => {
  init()
})
// 初始化
const init = async () => {
  try {
    const result = await dashboardEchartsApi()
    console.log(result, 'result')
    if (result.code === ResultCodeEnum.success) {
      echartsData.value = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
          }
        ]
      }
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<script lang="ts">
import { RouterName } from '@/router/RouteConst'
export default {
  name: RouterName.DASHBOARD
}
</script>

<style lang="scss" scoped></style>
