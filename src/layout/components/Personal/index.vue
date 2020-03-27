<template>
	<div class="Personal-box">
		<el-dropdown trigger="click" @command="handleCommand">
			<span style="display: inline-block">
				<el-avatar :src="avatar"></el-avatar>
				<i class="el-icon-arrow-down el-icon--right"></i>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="a" icon="el-icon-user-solid">个人中心</el-dropdown-item>
				<el-dropdown-item command="b" icon="el-icon-s-home">首页</el-dropdown-item>
				<el-dropdown-item command="c" icon="el-icon-document">文档</el-dropdown-item>
				<el-dropdown-item command="d" >
					<svg-icon iconClass="github" /> GitHub
				</el-dropdown-item>
				<el-dropdown-item command="e" icon="el-icon-switch-button" divided>退出登录</el-dropdown-item>
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
		...mapGetters(["avatar"])
	},
	data() {
		return {};
	},
	created() {},
	mounted() {},
	methods: {
		// 登出
		login_Out() {
            removeCookie("token")
            removeCookie("user_id")
            this.$router.push({path: "/login"})
		},
		handleCommand(command) {
			switch (command) {
				case "a":
					this.$router.push("/personal/index")
					break;
				case "b":
					this.$router.push("/")
					break;
				case "c":
					this.$router.push("/documentation/index")
					break;
				case "d":
					window.open( "https://github.com/liuzhao2580/Vue_project")
					break;
				case "e":
					this.login_Out()
					break;
			}
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
