<template>
  <div class="dashboard-box">
    <!-- 卡片 -->
    <!-- <CardCom /> -->
    <!-- Echarts 图表 -->
    <!-- <EchartsComponents :EchartsData="EchartsData" v-loading="EchartLoading" /> -->
    <el-row :gutter="20">
      <!-- todo-list -->
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <TodoList />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { dashboardEchartsApi } from '@/api/modules/dashboard'
// import EchartsComponents from './components/Echarts/index.vue'
// import CardCom from './components/CardCom/index.vue'
import TodoList from './components/TodoList/index.vue'


onMounted(() => {
  init()
})
// 初始化
const init = async () => {
  try {
    const result = await dashboardEchartsApi()
    console.log(result, 'result')
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
