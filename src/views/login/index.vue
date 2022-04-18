<template>
  <div class="login-box">
    <div class="login-content">
      <p class="login-title">欢迎登录</p>
      <el-form
        label-position="left"
        :model="login_form"
        ref="formRef"
        :rules="rules"
      >
        <el-form-item label="用户名" prop="userName" label-width="80px">
          <el-input v-model="login_form.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="80px">
          <el-input
            type="password"
            v-model="login_form.password"
            @keydown.enter="submitForm(formRef)"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="loginBtn"
            type="primary"
            @click="submitForm(formRef)"
            :loading="login_loading"
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
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useStore } from '@/store'
import { userLogin } from '@/api/modules/user'
import { ResultCodeEnum } from '@/typescript/shared/enum'
// import DDAccountLogin from './components/DDAccountLogin.vue'
import { USER_ACTIONS_TYPES } from '@/store/modules/user/types'

const store = useStore()

const router = useRouter()

const login_form = reactive({
  userName: 'admin',
  password: 'admin'
})
const rules = reactive({
  userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})
/** 登录的加载按钮样式 */
const login_loading = ref(false)

const formRef = ref<FormInstance>()

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid: boolean) => {
    if (valid) {
      login_loading.value = true
      const params = {
        userName: login_form.userName,
        password: login_form.password
      }
      try {
        const result = await userLogin(params)
        console.log(result, 'data')
        if (result.code === ResultCodeEnum.success) {
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
            router.push({ path: '/' }).catch(error => console.log(error, 1111))
          } catch (error) {
            console.log(error, 111)
          }
        } else {
          ElMessage({
            message: result.msg,
            type: 'error'
          })
        }
        login_loading.value = false
      } catch (err) {
        login_loading.value = false
      }
    } else {
      return false
    }
  })
}
</script>

<script lang="ts">
import { RouterName } from '@/router/RouteConst'
export default {
  name: RouterName.LOGIN
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
