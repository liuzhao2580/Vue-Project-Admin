<template>
	<div class="SideBar-box">
		<h5>自定义颜色</h5>
        <el-scrollbar class="SideBar-scrollbar">
            <el-menu
                :collapse="isCollapse"
                :default-active="activeMenu"
                class="el-menu-vertical-demo"
                :background-color="variables.menuBg"
                :text-color="variables.menuText"
                :active-text-color="variables.menuActiveText"
                :router="true"
            >
                <SidebarItem
                    v-for="route in this.$router.options.routes"
                    :key="route.path"
                    :item="route"
                    :base-path="route.path"
                />
            </el-menu>
        </el-scrollbar>
	</div>
</template>

<script>
import SidebarItem from "./SidebarItem"
import variables from '@/styles/variables.scss'
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
        },
        variables() {
            return variables
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
