<template>
  <div class="dashboard-box">
    <!-- 卡片 -->
    <card />
    <!-- Echarts 图表 -->
    <!-- <EchartsComponents :EchartsData="EchartsData" v-loading="EchartLoading" /> -->
    <el-row :gutter="20">
      <!-- todo-list -->
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <todo-list />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { dashboardEcharts_Api } from '@/api/modules/dashboard'
// import EchartsComponents from './components/Echarts/index.vue'
import Card from './components/Card/index.vue'
import todoList from './components/TodoList/index.vue'
import { onMounted, ref } from 'vue'
/** Echarts 组件加载样式 */
const EchartLoading = ref<boolean>(true)
const EchartsData = ref({})

onMounted(() => {
  init()
})
// 初始化
const init = async () => {
  try {
    const result = await dashboardEcharts_Api()
    EchartLoading.value = false
    EchartsData.value = result.data
  } catch (error) {
    EchartLoading.value = false
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
