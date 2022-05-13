<template>
  <div class="map-box">
    <p class="href-box">
      <a href="https://lbs.amap.com/api/javascript-api/summary/" target="_black"
        >高德地图API</a
      >
    </p>
    <!-- 地图主体 -->
    <div id="GDMap"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import MapUtils from './utils'
onMounted(() => {
  MapUtils.init()
})
</script>

<script lang="ts">
import { RouterName } from '@/router/RouteConst'
export default {
  name: RouterName.AMAP
}
</script>

<style lang="scss" scoped>
$height: 100px;
.map-box {
  display: flex;
  flex-direction: column;
  .href-box {
    height: $height;
  }
  #GDMap {
    height: 800px;
  }
}
</style>
