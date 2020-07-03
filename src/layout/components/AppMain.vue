<template>
	<div class="AppMain-box">
        <transition name="fade-transition" mode="out-in">
            <keep-alive>
                <router-view/>
            </keep-alive>
        </transition>
    </div>
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
