<template>
    <div class="dashboard-box">
        <!-- 卡片 -->
        <card />
        <!-- Echarts 图表 -->
        <Echarts-components :EchartsData="EchartsData" />
        <el-row :gutter="20">
            <!-- todo-list -->
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <todo-list />
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import { dashboardApi } from '@/api/modules/dashboard'
import EchartsComponents from './components/Echarts/index.vue'
import { Component, Vue } from 'vue-property-decorator'
@Component({
    name: 'dashboard',
    components: {
        card: () => import('./components/Card/index.vue'),
        todoList: () => import('./components/TodoList/index.vue'),
        EchartsComponents
    }
})
export default class Dashboard extends Vue {
    EchartsData: any = {}
    created() {
        this.init()
    }
    // 初始化
    async init() {
        try {
            const { data } = await dashboardApi()
            console.log(data, 'data')
            this.EchartsData = data
        } catch (error) {
            console.log(error)
        }
    }
}
</script>

<style lang="scss" scoped></style>
