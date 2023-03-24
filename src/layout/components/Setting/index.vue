<template>
  <div class="setting-com-box">
    <div class="setting-icon">
      <span class="iconfont icon-setting"></span>
    </div>
    <el-drawer v-model="visible">
      <div>Hi, there!</div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const visible = ref(false)
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
  }
}
</style>
