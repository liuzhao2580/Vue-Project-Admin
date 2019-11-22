<template>
	<div class="Personal-box">
		<el-dropdown trigger="click">
			<span style="display: inline-block">
				<el-avatar :src="user_img"></el-avatar>
				<i class="el-icon-arrow-down el-icon--right"></i>
			</span>
			<el-dropdown-menu slot="dropdown">
				<template v-for="(item,index) in dropdown_Item">
					<el-dropdown-item v-if="item.svg" :key="index">
						<a href="https://github.com/liuzhao2580/Vue_project.git" target="block">
							<svg-icon iconClass="github" />
							{{item.label}}
						</a>
					</el-dropdown-item>
					<el-dropdown-item v-else-if="item.divided" divided :key="index"></el-dropdown-item>
					<el-dropdown-item v-else-if="item.command" :key="index" :icon="item.icon">
						<span @click="login_Out">{{item.label}}</span>
					</el-dropdown-item>
					<el-dropdown-item v-else :key="index" :icon="item.icon">
						<span @click="$router.push({path: item.path})">{{item.label}}</span>
					</el-dropdown-item>
				</template>
			</el-dropdown-menu>
		</el-dropdown>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import { removeCookie } from '@/utils/cookies'
export default {
	name: "Personal",
	components: {},
	props: {},
	computed: {
		...mapGetters(["user_img"])
	},
	data() {
		return {
			dropdown_Item: [
				{
					label: "个人中心",
					icon: "el-icon-user-solid",
					path: "/personal/index"
				},
				{ label: "首页", icon: "el-icon-s-home", path: "/" },
				{
					label: "文档",
					icon: "el-icon-document",
					path: "/documentation/index"
				},
				{ label: "GitHub", svg: true },
				{ divided: true },
				{
					label: "退出登录",
					command: "loginOut",
					icon: "el-icon-switch-button"
				}
			]
		};
	},
	created() {},
	mounted() {},
	methods: {
		// 登出
		login_Out() {
            removeCookie("token")
            this.$router.push({path: "/login"})
		}
	},
	watch: {}
};
</script>

<style lang="scss" scoped>
.Personal-box {
	margin-right: 10px;
	cursor: pointer;
	/deep/ .el-avatar {
		width: 50px;
		height: 50px;
		img {
			width: 100%;
		}
	}
}
</style>
