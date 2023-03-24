<template>
  <!-- 视频播放 -->
  <VideoComponent />
</template>

<script setup lang="ts">
import VideoComponent from "./components/VideoComponent/index.vue"
</script>

<script lang="ts">
import { RouterName } from "../../../router/RouteConst"
export default {
  name: RouterName.AUDIO_VIDEO
}
</script>

<style scoped lang="scss"></style>
