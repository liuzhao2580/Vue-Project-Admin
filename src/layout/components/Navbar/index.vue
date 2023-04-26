<template>
  <div class="Navbar-box">
    <div class="Navbar-Breadcrumb">
      <div class="side-btn hidden-xs-only" @click="sideBtn">
        <el-icon><Operation /></el-icon>
      </div>
      <Breadcrumb />
      <Personal />
    </div>
    <TagsView />
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/store/app"
import Breadcrumb from "./components/Breadcrumb/index.vue"
import TagsView from "./components/TagsView/index.vue"
import Personal from "./components/Personal/index.vue"
import { Operation } from "@element-plus/icons-vue"

const store = useAppStore()
// 侧边栏按钮点击事件
const sideBtn = () => {
  store.changeSideStatus()
}
</script>

<script lang="ts">
export default {
  name: "NavBar"
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
