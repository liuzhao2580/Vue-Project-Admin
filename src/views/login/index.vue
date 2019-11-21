<template>
	<el-col class="login-box">
		<el-row class="login-content">
            <p class="login-title">欢迎登录</p>
			<el-form label-position="left" :model="login_form" ref="login_form">
				<el-form-item label="用户名" prop="username" label-width="80px">
					<el-input v-model="login_form.username"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password" label-width="80px">
					<el-input type="password" v-model="login_form.password"></el-input>
				</el-form-item>
				<el-form-item label="验证码" prop="code" label-width="80px">
					<el-input v-model="login_form.code"></el-input>
				</el-form-item>
				<el-form-item >
					<el-button class="loginBtn" type="primary" @click="submitForm('login_form')">登录</el-button>
				</el-form-item>
			</el-form>
		</el-row>
	</el-col>
</template>

<script>
import { userLogin } from "@/api/user"
export default {
	name: "login",
	components: {},
	props: {},
	data() {
		return {
			login_form: {
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
                    const params = {
                        username: this.login_form.username,
                        password: this.login_form.password
                    }
                    // this.$router.push({path: "/"})
                    userLogin(params).then(({data}) => {
                        console.log(data,"data")
                    })
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
