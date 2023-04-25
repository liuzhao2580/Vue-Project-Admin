<template>
  <iframe class="iframe-box" :src="iframeUrl" frameborder="0"></iframe>
</template>

<script setup lang="ts">
// 专门用来处理 iframe 的
import { ref, watch } from "vue"
import { useRoute } from "vue-router"
const route = useRoute()
const iframeUrl = ref<string>()
iframeUrl.value = route.meta.iframeUrl
watch(
  () => route.meta.iframeUrl,
  () => {
    iframeUrl.value = route.meta.iframeUrl
  }
)
</script>

<script lang="ts">
export default {
  name: "IframePage"
}
</script>

<style scoped lang="scss">
.iframe-box {
  width: 100%;
  height: 100%;
}
</style>
