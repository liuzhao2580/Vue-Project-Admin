<template>
  <h2>导入 word pdf excel 进行预览功能</h2>
  <div>
    <WordPreview />
    <PDFPreview />
  </div>
</template>

<script setup lang="ts">
import WordPreview from "./components/WordPreview/index.vue"
import PDFPreview from "./components/PDFPreview/index.vue"
</script>

<script lang="ts">
import { RouterName } from "@/router/RouteConst"
export default {
  name: RouterName.FILE_HTML
}
</script>

<style scoped lang="scss"></style>
