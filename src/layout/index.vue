<template>
  <div class="app-warpper">
    <el-container :class="[isMobile ? 'mobile' : 'desktop', 'container-box']">
      <el-aside :width="dynamicWidth" class="sider-box">
        <Sidebar />
      </el-aside>
      <el-main class="main-box" :style="{ marginLeft: dynamicWidth }">
        <Navbar class="nav-bar" />
        <AppMain class="app-main" />
      </el-main>
      <div
        v-show="isMobile"
        class="click-icon el-icon-s-operation"
        @click="showORhidden"
      ></div>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, onUnmounted } from "vue";
import { debounce } from "lodash";
import { AppMain, Sidebar, Navbar } from "./components";
import { useAppStore } from "@/store/app";

const store = useAppStore();

onBeforeMount(() => {
  // 页面进来的时候监听 屏幕的变化  调用方法
  window.addEventListener("resize", $_ResizeScreen);
});

onUnmounted(() => {
  // 页面销毁的时候移除监听 屏幕的变化  调用方法
  window.removeEventListener("resize", $_ResizeScreen);
});

const { body } = document;
// 设置一个宽度的大小, 用来判断当前的侧边栏展开折叠
const WIDTH = 992;

const isMobile = computed(() => {
  return store.state.isMobile;
});

const side_status = computed(() => {
  return store.state.side_status;
});

const dynamicWidth = computed(() => {
  if (isMobile.value) return "0";
  if (side_status.value) return "64px";
  return "200px";
});

// 在 mobile 移动端模式下显示隐藏 侧边栏按钮
const showORhidden = () => {
  store.unFlodSide();
};

const $_isMobile = () => {
  const react = body.getBoundingClientRect();
  if (react.width < 768) store.setDevice(true);
  else store.setDevice(false);
  return react.width - 1 < WIDTH;
};

/** 监听页面大小变化 */
const $_ResizeScreen = debounce((): void => {
  const side_flag = $_isMobile();
  if (side_flag) {
    store.flodSide();
  } else if (!side_flag) {
    store.unFlodSide();
  }
}, 500);
</script>

<script lang="ts">
export default {
  name: "LayoutIndex"
};
</script>

<style lang="scss" scoped>
.app-warpper {
  .mobile {
    .click-icon {
      cursor: pointer;
      width: 40px;
      height: 40px;
      font-size: 20px;
      text-align: center;
      line-height: 40px;
      box-shadow: 0px 0px 8px #a6a6a6;
      background-color: #fff;
      position: fixed;
      left: 0;
      top: 100px;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
  .main-box {
    display: flex;
    flex-direction: column;
    :deep(.app-main) {
      position: relative;
      flex: 1;
      height: 100%;
      padding: 12px;
      > div {
        height: 100%;
      }
    }
  }
}
</style>
