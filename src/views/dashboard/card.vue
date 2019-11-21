<template>
	<div>
		<el-card class="box-card">
			<div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
		</el-card>
	</div>
</template>

<script>
export default {
	name: "card",
	components: {},
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
