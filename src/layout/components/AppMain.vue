<template>
	<transition name="fade-transform" mode="out-in">
		<keep-alive>
			<router-view />
		</keep-alive>
	</transition>
</template>

<script>
export default {
	name: "AppMain",
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
