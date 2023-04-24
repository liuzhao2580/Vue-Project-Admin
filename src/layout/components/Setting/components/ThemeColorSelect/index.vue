<template>
  <div class="system-theme">
    <SetTitle title="系统主题" />
    <ul>
      <li class="set-item">
        <span>主题色选择</span>
        <el-color-picker v-model="color" :predefine="predefineColors" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
/** 系统主题 */
import { ref } from "vue"
import SetTitle from "../SetTitle/index.vue"

const color = ref("rgba(255, 69, 0)")
const predefineColors = ref([
  "#ff4500",
  "#ff8c00",
  "#ffd700",
  "#90ee90",
  "#00ced1",
  "#1e90ff",
  "#c71585"
])
</script>

<script lang="ts">
export default {
  name: "ThemeColorSelect"
}
</script>

<style scoped lang="scss">
.system-theme {

}
</style>
