<template>
	<el-col class="login-box">
		<el-row class="login-content">
            <p class="login-title">欢迎登录</p>
			<el-form label-position="left" :model="login_from" ref="login_from">
				<el-form-item label="用户名" prop="username" label-width="80px">
					<el-input v-model="login_from.username"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password" label-width="80px">
					<el-input type="password" v-model="login_from.password"></el-input>
				</el-form-item>
				<el-form-item label="验证码" prop="code" label-width="80px">
					<el-input v-model="login_from.code"></el-input>
				</el-form-item>
				<el-form-item >
					<el-button class="loginBtn" type="primary" @click="submitForm('login_from')">登录</el-button>
				</el-form-item>
			</el-form>
		</el-row>
	</el-col>
</template>

<script>
export default {
	name: "login",
	components: {},
	props: {},
	data() {
		return {
			login_from: {
				username: "admin",
				password: "admin",
				code: "7777"
			},
			rules: {
				username: [
					{ required: true, message: "请输入用户名", trigger: "blur" }
				],
				password: [
					{ required: true, message: "请输入密码", trigger: "blur" }
				],
				code: [
					{ required: true, message: "请输入验证码", trigger: "blur" }
				]
			}
		};
	},
	created() {},
	mounted() {},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
                    this.$router.push({path: "/"})
				} else {
					return false;
				}
			});
		}
	},
	watch: {}
};
</script>

<style lang="scss" scoped>
.login-box {
    width: 100%;
    height: 100%;
    .login-content {
        width: 500px;
        max-width: 100%;
        margin: 0 auto;
        margin-top: 200px;
        .login-title {
            text-align: center;
            height: 60px;
            line-height: 60px;
            font-size: 20px;
            font-weight: 700;
        }
        .loginBtn {
            width: 100%;
            
        }
    }
}
</style>
