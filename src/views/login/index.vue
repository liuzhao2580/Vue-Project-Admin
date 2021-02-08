<template>
    <el-col class="login-box">
        <el-row class="login-content">
            <p class="login-title">欢迎登录</p>
            <el-form label-position="left" :model="login_form" ref="login_form">
                <el-form-item label="用户名" prop="userName" label-width="80px">
                    <el-input v-model="login_form.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" label-width="80px">
                    <el-input
                        type="password"
                        v-model="login_form.password"
                        @keydown.enter.native="submitForm('login_form')"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        class="loginBtn"
                        type="primary"
                        @click="submitForm('login_form')"
                        :loading="login_loading"
                        >登录</el-button
                    >
                </el-form-item>
            </el-form>
        </el-row>
    </el-col>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import { namespace } from "vuex-class"
import { userLogin } from "@/api/modules/user"
import { ResultCodeEnum } from "@/typescript/enum"
const USER_VUEX = namespace("user")
@Component({
    name: "login",
})
export default class LoginComponent extends Vue {
    @USER_VUEX.Action ACT_userInfo!: (params) => void
    @USER_VUEX.Action ACT_Need_Refresh!: (params) => void
    login_form = {
        userName: "admin",
        password: "admin",
    }
    rules = {
        userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    }
    /** 登录的加载按钮样式 */
    login_loading: boolean = false

    submitForm(formName) {
        // @ts-ignore
        this.$refs[formName].validate(async (valid: boolean) => {
            if (valid) {
                this.login_loading = true
                const params = {
                    userName: this.login_form.userName,
                    password: this.login_form.password,
                }
                try {
                    const result = await userLogin(params)
                    console.log(result, "data")
                    if (result.code === ResultCodeEnum.success) {
                        this.$message({
                            message: "登录成功",
                            type: "success",
                        })
                        try {
                            await this.ACT_userInfo(result.data)
                            await this.ACT_Need_Refresh(true)
                            this.$router
                                .push({ path: "/" })
                                .catch((error) => console.log(error, 1111))
                        } catch (error) {
                            console.log(error, 111)
                        }
                    } else {
                        this.$message({
                            message: result.msg,
                            type: "error",
                        })
                    }
                    this.login_loading = false
                } catch (err) {
                    this.login_loading = false
                }
            } else {
                return false
            }
        })
    }
}
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
