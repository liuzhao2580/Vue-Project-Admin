<template>
	<el-scrollbar class="SideBar-scrollbar">
		<div class="SideBar-title" :style="{paddingLeft: (!side_status ? '20px': '10px')}" @click="$router.push({path: '/'})">
            <img :src="user_img" alt="">
            <span v-show="!side_status">欢迎访问</span>
        </div>
		<el-menu
			:collapse="side_status"
			:default-active="activeMenu"
			:background-color="variables.menuBg"
			:text-color="variables.menuText"
			:active-text-color="variables.menuActiveText"
            :collapse-transition="false"
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
</template>

<script>
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";
import { mapGetters } from 'vuex'
export default {
	name: "SideBar",
	components: {
		SidebarItem
	},
	props: {},
	computed: {
        ...mapGetters(["user_img","side_status"]),
        // 获取当前页面的 url 地址
		activeMenu() {
			const route = this.$route;
			const { path } = route;
			return path;
        },
        // 导入 自定义的样式属性
		variables() {
			return variables;
		}
	},
	data() {
		return {
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
