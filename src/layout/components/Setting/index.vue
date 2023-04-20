<template>
  <div class="setting-com-box">
    <div class="setting-icon" @click="setClick">
      <span class="iconfont icon-setting"></span>
    </div>
    <el-drawer v-model="visible">
      <div>Hi, there!</div>
      <ThemeColorSelect></ThemeColorSelect>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import ThemeColorSelect from "./components/ThemeColorSelect/index.vue"

const visible = ref(false)

const setClick = ()=> {
  visible.value = true
}
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
    background-color: pink;
    padding: 16px;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    cursor: pointer;
    z-index: $maxZIndex;
  }
}
</style>
