<template>
  <el-scrollbar class="SideBar-scrollbar">
    <div
      class="SideBar-title"
      :style="{ paddingLeft: !side_status ? '20px' : '10px' }"
      @click="sideBarTitleClick"
    >
      <img :src="avatar" />
      <span v-show="!side_status">欢迎访问</span>
    </div>
    <el-menu
      :collapse="side_status"
      :default-active="activeMenu"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      router
      unique-opened
    >
      <SidebarItem
        v-for="(route, index) in sideBarList"
        :key="index"
        :item="route"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import SidebarItem from './components/SidebarItem.vue'
import { useStore } from '@/store'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { RouterPath } from '@/router/RouteConst'

const routeConfig = useRoute()

const router = useRouter()

const store = useStore()

/** 获取当前页面的 url 地址 */
const activeMenu = computed(() => {
  const { path } = routeConfig
  return path
})

const avatar = computed(() => {
  return store.state.user.avatar
})
const side_status = computed(() => {
  return store.state.app.side_status
})
const sideBarList = computed(() => {
  return store.state.user.sideBarList
})

/** 导入 自定义的样式属性 */
const variables = computed(() => {
  return require('@/styles/variables.module.scss')
})

/** logo 点击事件 */
const sideBarTitleClick = () => {
  router.push(RouterPath.DASHBOARD)
}
</script>

<script lang="ts">
export default {
  name: 'SideBar'
}
</script>

<style lang="scss" scoped></style>
