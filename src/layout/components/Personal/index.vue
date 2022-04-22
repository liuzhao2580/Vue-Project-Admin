<template>
  <div class="Personal-box">
    <el-dropdown @command="handleCommand">
      <span style="display: inline-block">
        <el-avatar :src="avatar"></el-avatar>
        <el-icon class="el-icon--right"><ArrowDown /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="(item, index) in dropdownList"
            :key="index"
            :command="item.command"
            :divided="item.dividedFlag"
            :icon="item.icon"
          >
            {{ item.title }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { Component, computed, shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import { removeCookie } from '@/utils/cookies'
import { resetRouter } from '@/router'
import { useStore } from '@/store'
import { RouterPath } from '@/router/RouteConst'
import {
  User,
  HomeFilled,
  Document,
  SwitchButton,
  Guide,
  ArrowDown
} from '@element-plus/icons-vue'

const store = useStore()

const router = useRouter()

interface IRef {
  command: string
  title: string
  icon: Component
  dividedFlag?: boolean
}

const dropdownList = shallowRef<IRef[]>([
  {
    command: RouterPath.PERSONAL,
    title: '个人中心',
    icon: User
  },
  {
    command: RouterPath.DASHBOARD,
    title: '首页',
    icon: HomeFilled
  },
  {
    command: RouterPath.DOCUMENTATION,
    title: '文档',
    icon: Document
  },
  {
    command: 'https://github.com/liuzhao2580/Vue_project',
    title: 'GitHub',
    icon: Guide
  },
  {
    command: RouterPath.LOGIN,
    title: '退出登录',
    icon: SwitchButton,
    dividedFlag: true
  }
])

const avatar = computed(() => {
  return store.state.user.avatar
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
  if (command === RouterPath.LOGIN) {
    login_Out()
  } else if (/http(s?):/.test(command)) {
    window.open(command)
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
