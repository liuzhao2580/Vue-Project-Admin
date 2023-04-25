<template>
  <el-scrollbar>
    <div
      class="sidebar-title"
      :style="{ paddingLeft: !side_status ? '20px' : '10px' }"
      @click="sideBarTitleClick"
    >
      <img :src="avatar" />
      <span v-show="!side_status">欢迎访问</span>
    </div>
    <el-menu
      class="sidebar-el-menu-box"
      :collapse="side_status"
      :default-active="activeMenu"
      unique-opened
      router
    >
      <SidebarItem
        v-for="route in sideBarList"
        :key="route.path"
        :item="route"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import SidebarItem from "./components/SidebarItem.vue"
import { computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import { RouterPath } from "@/router/RouteConst"
import { useAppStore } from "@/store/app"
import { useUserStore } from "@/store/user"

const routeConfig = useRoute()

const router = useRouter()

const userStore = useUserStore()
const appStore = useAppStore()

/** 获取当前页面的 url 地址 */
const activeMenu = computed(() => {
  const { path } = routeConfig
  return path
})

const avatar = computed(() => {
  return userStore.state.avatar
})
const side_status = computed(() => {
  return appStore.state.side_status
})
const sideBarList = computed(() => {
  return userStore.state.sideBarList
})
/** logo 点击事件 */
const sideBarTitleClick = () => {
  router.push(RouterPath.DASHBOARD)
}
</script>

<script lang="ts">
export default {
  name: "SideBar"
}
</script>

<style lang="scss" scoped>
// 标题
.sidebar-title {
  padding-top: 5px;
  white-space: nowrap;
  transition: padding-left 0.3s;
  cursor: pointer;
  display: flex;
  align-items: center;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: bottom;
  }
  span {
    font-size: 20px;
    margin-left: 10px;
    color: var(--lz-text-color);
    transition: display 0.3s;
  }
}
.sidebar-el-menu-box {
  border: 0;
}
</style>
