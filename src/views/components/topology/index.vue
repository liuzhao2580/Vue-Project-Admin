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
import { onMounted, onUnmounted } from 'vue'
import G6Utils from './G6utils'
onMounted(() => {
  G6Utils.init()
})

onUnmounted(()=> {
  G6Utils.graphDestory()
})
</script>

<script lang="ts">
import { RouterName } from '@/router/RouteConst'
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
    height: 600px;
  }
}
</style>
