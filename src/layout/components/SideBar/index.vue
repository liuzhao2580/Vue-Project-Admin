<template>
	<div>
		<h5>自定义颜色</h5>
		<el-menu
            :collapse="isCollapse"
			:default-active="activeMenu"
			class="el-menu-vertical-demo"
			background-color="#545c64"
			text-color="#fff"
			active-text-color="#ffd04b"
            :router="true"
		>
			<SidebarItem
                v-for="route in this.$router.options.routes"
                :key="route.path"
                :item="route"
                :base-path="route.path"
            />
		</el-menu>
	</div>
</template>

<script>
import SidebarItem from "./SidebarItem"
export default {
	name: "SideBar",
	components: {
        SidebarItem
    },
    props: {},
    computed: {
        activeMenu() {
            const route = this.$route
            const { path } = route
            return path
        }
    },
	data() {
		return {
            isCollapse: false
        };
	},
	created() {},
	mounted() {},
	methods: {},
	watch: {}
};
</script>

<style lang="scss" scoped>
</style>
