<template>
  <iframe
    :src="src"
    frameborder="0"
    width="100%"
    height="100%"
    class="pdf-iframe"
  ></iframe>
</template>

<script setup lang="ts">
import { computed } from "vue"

interface IProp {
  url: string
}
const props = defineProps<IProp>()

const src = computed(() => {
  let urlSrc = ""
  // 说明是线上的资源
  if(/http(s)/.test(props.url)) {
    urlSrc = props.url
  }
  else {
    // 说明是本地的文件
    urlSrc = `/libs/pdfjs/web/viewer.html?file=${props.url}`
  }
  return urlSrc
})
</script>

<script lang="ts">
export default {
  name: "PDFIframe"
}
</script>

<style scoped lang="scss">
</style>
