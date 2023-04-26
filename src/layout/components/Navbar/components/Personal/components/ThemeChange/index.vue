<template>
  <!-- 切换全局样式 -->
  <span @click="themeChange">
    <Sunny v-show="themeValue === themeType.light" />
    <Moon v-show="themeValue === themeType.dark" />
  </span>
</template>

<script setup lang="ts">
// 主题切换

import { onMounted, ref } from "vue"
import {
  Sunny,
  Moon
} from "@element-plus/icons-vue"
enum themeType {
  light = "light",
  dark = "dark"
}
/** 获取 html dom元素 */
const htmlDom = ref<HTMLHtmlElement>()

/** 全局的样式切换 */
const themeValue = ref<themeType>(themeType.light)

onMounted(() => {
  htmlDom.value = document.querySelector("html") as HTMLHtmlElement
})

/** 全局样式 改变事件 */
const themeChange = () => {
  if (!htmlDom.value) return
  if (themeValue.value === themeType.light) {
    htmlDom.value.className = themeType.dark
    themeValue.value = themeType.dark
  } else if (themeValue.value === themeType.dark) {
    htmlDom.value.className = ""
    themeValue.value = themeType.light
  }
}
</script>

<script lang="ts">
export default {
  name: "ThemeChange"
}
</script>

<style scoped lang="scss"></style>
