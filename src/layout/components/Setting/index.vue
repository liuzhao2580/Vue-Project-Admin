<template>
  <div class="setting-com-box">
    <div ref="settingIcon" class="setting-icon" @click="setClick">
      <el-icon v-if="visible"><Close /></el-icon>
      <el-icon v-else><Setting /></el-icon>
    </div>
    <el-drawer
      @close="visible = false"
      size="300px"
      title="主题配置"
      v-model="visible"
    >
      <ThemeColorSelect></ThemeColorSelect>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import { Setting, Close } from "@element-plus/icons-vue"
import ThemeColorSelect from "./components/ThemeColorSelect/index.vue"

const visible = ref(false)
const settingIcon = ref<HTMLDivElement>()

/** 设置按钮的点击事件 */
const setClick = () => {
  visible.value = !visible.value
}

watch(
  () => visible.value,
  flag => {
    if (flag) {
      settingIcon.value &&
        (settingIcon.value.style.transform = "translateX(-300px)")
    } else {
      settingIcon.value && (settingIcon.value.style.transform = "translateX(0)")
    }
  }
)
</script>

<script lang="ts">
export default {
  name: "SettingCom"
}
</script>

<style scoped lang="scss">
.setting-com-box {
  position: relative;
  .setting-icon {
    position: fixed;
    right: 0;
    top: 50%;
    background-color: var(--el-color-primary);
    padding: 14px;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    cursor: pointer;
    z-index: $maxZIndex;
    transition: all 0.5s;
    color: var(--lz-text-color);
    font-size: 18px;
  }
  :deep(.set-item) {
    display: flex;
    justify-content: space-between;
  }
  @keyframes openAnimate {
    0% {
      transform: translateX(0px);
    }
    100% {
      transform: translateX(-300px);
    }
  }
}
</style>
