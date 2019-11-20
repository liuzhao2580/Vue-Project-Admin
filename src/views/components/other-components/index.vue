<template>
	<div class="other-components">
		<el-row>
			<el-col :span="6">
				<Calculator />
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	name: "other-components",
	components: {
		Calculator: () => import("./Calculator")
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
