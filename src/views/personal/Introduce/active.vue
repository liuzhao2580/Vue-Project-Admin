<template>
	<div class="active-box">
		<el-card>
			<img
				src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
				class="image"
			/>
			<div style="padding: 14px;">
				<span>好吃的汉堡</span>
				<div class="bottom clearfix">
					<time class="time">{{ new Date() }}</time>
					<el-button type="text" class="button">操作按钮</el-button>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script>
export default {
	name: "active",
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
