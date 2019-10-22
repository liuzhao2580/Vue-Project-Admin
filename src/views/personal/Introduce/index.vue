<template>
	<el-card class="box-card">
		<el-tabs value="active">
			<el-tab-pane label="最近活跃" name="active">
                <active />
            </el-tab-pane>
			<el-tab-pane label="时间线" name="timeline">时间线</el-tab-pane>
			<el-tab-pane label="账号" name="account">账号</el-tab-pane>
		</el-tabs>
	</el-card>
</template>

<script>
import active from './active'
export default {
	name: "Introduce",
	components: {
        active
    },
	props: {},
	data() {
		return {};
	},
	created() {},
	mounted() {},
	methods: {},
	watch: {}
};
</script>

<style lang="scss" scoped>
</style>
