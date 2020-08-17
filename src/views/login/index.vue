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
				<el-form-item >
					<el-button class="loginBtn" type="primary" @click="submitForm('login_form')" :loading="login_loading">登录</el-button>
				</el-form-item>
			</el-form>
		</el-row>
	</el-col>
</template>

<script>
import { userLogin } from "@api/user"
import {mapMutations,mapActions} from 'vuex'
export default {
	name: "login",
	components: {},
	props: {},
	data() {
		return {
			login_form: {
				username: "admin",
				password: "admin"
			},
			rules: {
				username: [
					{ required: true, message: "请输入用户名", trigger: "blur" }
				],
				password: [
					{ required: true, message: "请输入密码", trigger: "blur" }
				]
            },
            login_loading: false
		};
	},
	created() {},
	mounted() {},
	methods: {
		...mapActions({
			ACT_userInfo: 'user/ACT_userInfo',
			ACT_Need_Refresh: 'user/ACT_Need_Refresh'
		}),
		...mapMutations({
			Need_refresh: 'user/Need_refresh'
		}),
		submitForm(formName) {
			this.$refs[formName].validate(async valid => {
				if (valid) {
                    this.login_loading = true
                    const params = {
                        username: this.login_form.username,
                        password: this.login_form.password
					}
					try {
						const {data: getData} = await userLogin(params)
						if(getData.status == 200) {
							this.$message({
								message: "登录成功",
								type: "success"
							})
							try {
								await this.ACT_userInfo(getData)
								await this.ACT_Need_Refresh(true)
								this.$router.replace({path: "/"})
							} catch (error) {
								console.log(error, 111)
							}
                        }
                        else {
                            this.$message({
                                message: getData.message,
                                type: "error"
                            })
                        }
						this.login_loading = false
					} catch (error) {
						this.login_loading = false
                        this.$message({
                            message: "系统出错,请稍后再试",
                            type: "error"
                        })
					}
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
