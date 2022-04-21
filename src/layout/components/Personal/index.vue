<template>
  <div class="Personal-box">
    <el-dropdown trigger="click" @command="handleCommand">
      <span style="display: inline-block">
        <el-avatar :src="avatar"></el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="a" icon="el-icon-user-solid"
            >个人中心</el-dropdown-item
          >
          <el-dropdown-item command="b" icon="el-icon-s-home"
            >首页</el-dropdown-item
          >
          <el-dropdown-item command="c" icon="el-icon-document"
            >文档</el-dropdown-item
          >
          <el-dropdown-item command="d">
            <SvgIcon iconClass="github" /> GitHub
          </el-dropdown-item>
          <el-dropdown-item command="e" icon="el-icon-switch-button" divided
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { removeCookie } from '@/utils/cookies'
import { resetRouter } from '@/router'
import { useStore } from '@/store'
import { RouterPath } from '@/router/RouteConst'

const store = useStore()

const router = useRouter()

const avatar = computed(() => {
  return store.getters['user/avatar']
})
// 登出
const login_Out = () => {
  removeCookie('token')
  removeCookie('user_id')
  // 重置 路由
  resetRouter()
  router.push({ path: RouterPath.LOGIN })
}
const handleCommand = (command: string) => {
  switch (command) {
    case 'a':
      router.push(RouterPath.PERSONAL)
      break
    case 'b':
      router.push(RouterPath.DASHBOARD)
      break
    case 'c':
      router.push(RouterPath.DOCUMENTATION)
      break
    case 'd':
      window.open('https://github.com/liuzhao2580/Vue_project')
      break
    case 'e':
      login_Out()
      break
  }
}
</script>

<script lang="ts">
export default {
  name: 'PersonalCom'
}
</script>

<style lang="scss" scoped>
.Personal-box {
  margin-right: 10px;
  cursor: pointer;
  :deep(.el-avatar) {
    width: 50px;
    height: 50px;
    img {
      width: 100%;
    }
  }
}
</style>
