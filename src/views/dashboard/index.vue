<template>
    <div class="dashboard-box">
        <!-- 卡片 -->
        <card />
        <!-- Echarts 图表 -->
        <Echarts-components :EchartsData="EchartsData" v-loading="EchartLoading" />
        <el-row :gutter="20">
            <!-- todo-list -->
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <todo-list />
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { dashboardEcharts_Api } from '@/api/modules/dashboard'
import EchartsComponents from './components/Echarts/index.vue'
@Component({
  name: 'dashboard',
  components: {
    card: () => import('./components/Card/index.vue'),
    todoList: () => import('./components/TodoList/index.vue'),
    EchartsComponents
  }
})
export default class Dashboard extends Vue {
  /** Echarts 组件加载样式 */
  EchartLoading = true
  EchartsData: any = {}
  created() {
    this.init()
  }
  // 初始化
  async init() {
    try {
      const result = await dashboardEcharts_Api()
      this.EchartLoading = false
      this.EchartsData = result.data
    } catch (error) {
      this.EchartLoading = false
      console.log(error)
    }
  }
}
</script>

<style lang="scss" scoped></style>
