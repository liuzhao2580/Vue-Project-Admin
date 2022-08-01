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
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useStore } from '@/store'
import { userLogin } from '@/api/modules/user'
import { ResultCodeEnum } from '@/typescript/shared/enum'
// import DDAccountLogin from './components/DDAccountLogin.vue'
import { USER_ACTIONS_TYPES } from '@/store/modules/user/types'

const store = useStore()

const router = useRouter()

interface ILoginForm {
  userName: string
  password: string
}

const loginForm = reactive<ILoginForm>({
  userName: 'liuzhao',
  password: '123456'
})
const rules = reactive<FormRules>({
  userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})
/** 登录的加载按钮样式 */
const loginLoading = ref(false)

const formRef = ref<FormInstance>()

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
        console.log(result, 'data')
        if (result.code === ResultCodeEnum.SUCCESS) {
          ElMessage({
            message: '登录成功',
            type: 'success'
          })
          try {
            await store.dispatch(
              USER_ACTIONS_TYPES.ACT_FETCH_USERINFO,
              result.data
            )
            await store.dispatch(
              USER_ACTIONS_TYPES.ACT_FETCH_FIND_BY_USERID,
              true
            )
            router.push({
              path: RouterPath.DASHBOARD
            })
          } catch (error) {
            console.log(error, 111)
          }
        } else {
          ElMessage({
            message: result.msg,
            type: 'error'
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
import { RouterName, RouterPath } from '@/router/RouteConst'
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
