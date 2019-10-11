<template>
    <div class="login-container">
        <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            autocomplete="on"
            label-position="left"
        >
            <div class="title-container">
                <h3 class="title">欢迎进入国药物流管理系统</h3>
            </div>

            <el-form-item prop="username">
                <span class="svg-container">
                    <svg-icon icon-class="user" />
                </span>
                <el-input
                    ref="username"
                    v-model="loginForm.username"
                    placeholder="Username"
                    name="username"
                    type="text"
                    tabindex="1"
                    autocomplete="on"
                />
            </el-form-item>

            <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
                <el-form-item prop="password">
                    <span class="svg-container">
                        <svg-icon icon-class="password" />
                    </span>
                    <el-input
                        :key="passwordType"
                        ref="password"
                        v-model="loginForm.password"
                        :type="passwordType"
                        placeholder="Password"
                        name="password"
                        tabindex="2"
                        autocomplete="on"
                        @keyup.native="checkCapslock"
                        @keyup.enter.native="handleLogin"
                        show-password
                    />
                </el-form-item>
            </el-tooltip>
            <el-button
                :loading="loading"
                type="primary"
                style="width:100%;margin-bottom:30px;"
                @click.native.prevent="handleLogin"
            >登录</el-button>
        </el-form>
    </div>
</template>

<script>
import axios from "axios";
import baseURL from "@/assets/js/config";
import {aside} from "@/api/login.js";
import { validUsername } from "@/utils/validate";
import { setToken } from "@/utils/auth";
import { constantRoutes, asyncRoutes,resetRouter } from '@/router'

export default {
    name: "Login",
    components: { },
    data() {
        const validateUsername = (rule, value, callback) => {
            if (value == "") {
                callback("请输入用户名");
            } else {
                callback();
            }
        };
        const validatePassword = (rule, value, callback) => {
            if (value == "") {
                callback("请输入密码");
            } else {
                callback();
            }
        };
        return {
            loginForm: {
                username: "admin",
                password: "admin"
            },
            loginRules: {
                username: [
                    {
                        required: true,
                        trigger: "blur",
                        validator: validateUsername
                    }
                ],
                password: [
                    {
                        required: true,
                        trigger: "blur",
                        validator: validatePassword
                    }
                ]
            },
            passwordType: "password",
            capsTooltip: false,
            loading: false,
            redirect: undefined,
            otherQuery: {}
        };
    },
    watch: {
        $route: {
            handler: function(route) {
                const query = route.query;
                if (query) {
                    this.redirect = query.redirect;
                    this.otherQuery = this.getOtherQuery(query);
                }
            },
            immediate: true
        }
    },
    created() {},
    mounted() {
        if (this.loginForm.username === "") {
            this.$refs.username.focus();
        } else if (this.loginForm.password === "") {
            this.$refs.password.focus();
        }
    },
    destroyed() {},
    methods: {
        checkCapslock({ shiftKey, key } = {}) {
            if (key && key.length === 1) {
                if (
                    (shiftKey && (key >= "a" && key <= "z")) ||
                    (!shiftKey && (key >= "A" && key <= "Z"))
                ) {
                    this.capsTooltip = true;
                } else {
                    this.capsTooltip = false;
                }
            }
            if (key === "CapsLock" && this.capsTooltip === true) {
                this.capsTooltip = false;
            }
        },
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true;
                    let url = `${baseURL}/tbSysUser/login.do?loginName=${this.loginForm.username}&password=${this.loginForm.password}`
                    axios.get(url).then(({data}) => {
                        this.loading = false
                        if (data.status === 200) {
                            sessionStorage.setItem('GYWL2RoleId',data.entity.roleId)
                            this.$store.dispatch("user/get_ruleId", data.entity.roleId)
                            sessionStorage.setItem('GYWL2UserId',data.entity.userId)
                            this.$cookies.set('GYWL2UserName',data.entity.userName,'1D')
                            this.$cookies.set('GYWL2Account',this.loginForm.password,'1D')
                            this.$cookies.set('GYWL2Checked',this.checked,'1D')
                            resetRouter()
                            this.$store.dispatch("permission/Action_GET_SIDE").then((RouterData) => {
                                this.$router.addRoutes(RouterData)
                                if (RouterData[1].path != "/") {
                                    this.$router.push({path: RouterData[1].path +"/"+RouterData[1].children[0].path})
                                } else {
                                    this.$router.push({path: RouterData[1].path})
                                }
                            })
                        } else if(data.status === 400) {
                            this.$message({
                                message: '账号或密码错误',
                                type: 'error'
                            })
                            this.loading = false
                        }
                    })
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        getOtherQuery(query) {
            return Object.keys(query).reduce((acc, cur) => {
                if (cur !== "redirect") {
                    acc[cur] = query[cur];
                }
                return acc;
            }, {});
        }
    }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
        color: $cursor;
    }
}

/* reset element-ui css */
.login-container {
    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;

        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;
            caret-color: $cursor;

            &:-webkit-autofill {
                box-shadow: 0 0 0px 1000px $bg inset !important;
                -webkit-text-fill-color: $cursor !important;
            }
        }
    }

    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
    
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
        position: relative;
        width: 520px;
        max-width: 100%;
        padding: 160px 35px 0;
        margin: 0 auto;
        overflow: hidden;
    }

    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;

        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }

    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
    }

    .title-container {
        position: relative;

        .title {
            font-size: 26px;
            color: $light_gray;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
    }
    .copyRight {
        position: relative;
        text-align: center;
        font-size: 12px;
        line-height: 16px;
        letter-spacing: 1;
        color: #fff;
    }
}
</style>
