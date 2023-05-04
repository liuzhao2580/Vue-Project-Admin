<template>
  <div class="navbar-box">
    <div class="navbar-breadcrumb">
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
.navbar-box {
  height: $NavbarHeight;
  .navbar-breadcrumb {
    display: flex;
    align-items: center;
    box-shadow: 0px 1px 1px #e6e6e6;
    // 侧边栏展开 收缩按钮
    .side-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      font-size: 26px;
      cursor: pointer;
      transition: 0.5s;
      &:hover {
        background-color: #ebe7e7;
      }
    }
    // 面包屑
    .breadcrumb-box {
      flex: 1;
    }
  }
}
</style>
