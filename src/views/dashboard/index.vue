<template>
	<div class="dashboard-box">
        <!-- 卡片 -->
        <card />
        <!-- Echarts 图表 -->
        <echarts />
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
        card: () => import("./components/card"),
        todoList: () => import('./components/todoList'),
        echarts: () => import('./components/Echarts')
    },
	props: {},
	data() {
		return {};
	},
	created() {
        // this.init()
    },
	mounted() {},
	methods: {
        // 初始化
        async init() {
            try {
                const data = await dashboardApi()
                console.log(data)
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
