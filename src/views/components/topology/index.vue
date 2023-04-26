<template>
  <div class="topology-box">
    <p class="topology-box-title">
      <a
        href="https://antv-g6.gitee.io/zh/docs/manual/getting-started"
        target="_block"
        >官网地址</a
      >
    </p>
    <div id="container"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, shallowRef } from "vue"
import G6Utils from "./G6utils"

const graph = shallowRef<G6Utils>()

onMounted(() => {
  graph.value = new G6Utils()
  window.addEventListener("resize", resizeFunc)
})

function resizeFunc() {
  graph.value?.graphResize()
}

onUnmounted(() => {
  graph.value?.graphDestory()
  window.removeEventListener("resize", resizeFunc)
})
</script>

<script lang="ts">
import { RouterName } from "@/router/RouteConst"
export default {
  name: RouterName.TOPOLOGY
}
</script>

<style lang="scss" scoped>
.topology-box {
  &-title {
    height: 40px;
  }
  #container {
    height: 700px;
  }
  :deep(.g6-minimap) {
    .g6-minimap-container {
      border: 1px solid #e2e2e2;
    }
    .g6-minimap-viewport {
      border: 2px solid rgb(25, 128, 255);
    }
  }
}
</style>
