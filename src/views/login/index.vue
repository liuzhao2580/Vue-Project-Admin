<template>
  <div class="login-box">
    <div class="login-content">
      <p class="login-title">欢迎登录</p>
      <el-form
        label-position="left"
        :model="loginForm"
        ref="formRef"
        :rules="rules"
      >
        <el-form-item label="用户名" prop="userName" label-width="80px">
          <el-input v-model="loginForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="80px">
          <el-input
            type="password"
            v-model="loginForm.password"
            @keydown.enter="submitForm(formRef)"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="loginBtn"
            type="primary"
            @click="submitForm(formRef)"
            :loading="loginLoading"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
      <!-- <DDScanLogin/> -->
      <!-- <DDAccountLogin /> -->
      <!-- 提示 -->
      <LoginTip :userList="userList" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import type { FormInstance, FormRules } from "element-plus"
import { ElMessage } from "element-plus"
import { useUserStore } from "@/store/user"
import { userLogin, userInfoListAPI } from "@/api/modules/user"
import { ResultCodeEnum } from "@/typescript/shared/enum"
import { IUserBaseInfo } from "@/typescript/shared/interface/user-interface"
import LoginTip from "./components/LoginTip.vue"
const userStore = useUserStore()

const router = useRouter()

interface ILoginForm {
  userName: string;
  password: string;
}

const loginForm = reactive<ILoginForm>({
  userName: "liuzhao",
  password: "123456"
})
const rules = reactive<FormRules>({
  userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }]
})
/** 登录的加载按钮样式 */
const loginLoading = ref(false)

/** 用户列表 */
const userList = ref<IUserBaseInfo[]>([])

const formRef = ref<FormInstance>()

onMounted(() => {
  init()
})

const init = () => {
  userInfoList()
}

/** 获取所有用户信息 */
const userInfoList = async () => {
  const data = await userInfoListAPI()
  userList.value = data.data
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid: boolean) => {
    if (valid) {
      loginLoading.value = true
      const params = {
        userName: loginForm.userName,
        password: loginForm.password
      }
      try {
        const result = await userLogin(params)
        console.log(result, "data")
        if (result.code === ResultCodeEnum.SUCCESS) {
          ElMessage({
            message: "登录成功",
            type: "success"
          })
          try {
            await userStore.saveUserInfo(result.data)
            await userStore.findUserInfoByID()
            router.push({
              path: RouterPath.DASHBOARD
            })
          } catch (error) {
            console.log(error, 111)
          }
        } else {
          ElMessage({
            message: result.msg,
            type: "error"
          })
        }
        loginLoading.value = false
      } catch (err) {
        loginLoading.value = false
      }
    } else {
      return false
    }
  })
}
</script>

<script lang="ts">
import { RouterName, RouterPath } from "@/router/RouteConst"
export default {
  name: RouterName.LOGIN
}
</script>

<style lang="scss" scoped>
.login-box {
  width: 100%;
  height: 100%;
  position: relative;
  .login-content {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    width: 500px;
    max-width: 100%;
    padding: 10px;
    border-radius: 20px;
    background-color: rgba($color: #333, $alpha: 0.1);
    // backdrop-filter CSS 属性可以让你为一个元素后面区域添加图形效果（如模糊或颜色偏移）
    // https://developer.mozilla.org/zh-CN/docs/Web/CSS/backdrop-filter 添加毛玻璃样式
    backdrop-filter: blur(10px);
    border: 1px solid rgba($color: #333, $alpha: 0.1);
    box-shadow: 0px 0px 20px rgba($color: #333, $alpha: 0.1);
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
