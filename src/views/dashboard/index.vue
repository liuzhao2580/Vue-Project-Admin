<template>
	<div class="dashboard-box">
        <!-- 卡片 -->
        <card />
        <!-- Echarts 图表 -->
        <echarts :EchartsData='EchartsData'/>
        <el-row :gutter="20">
            <!-- todo-list -->
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <todo-list />
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { dashboardApi } from "@api/dashboard"
export default {
	name: "dashboard",
	components: {
        card: () => import("./components/Card"),
        todoList: () => import('./components/TodoList'),
        echarts: () => import('./components/Echarts')
    },
	props: {},
	data() {
		return {
            EchartsData: {}
        };
	},
	created() {
        this.init()
    },
	mounted() {},
	methods: {
        // 初始化
        async init() {
            try {
                const {data} = await dashboardApi()
                this.EchartsData = data
            } catch (error) {
                console.log(error)
            }
        }
    },
	watch: {}
};
</script>

<style lang="scss" scoped>
</style>
