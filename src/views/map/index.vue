<template>
  <div class="map-box">
    <p class="href-box">
      <a href="https://lbs.amap.com/api/javascript-api/summary/" target="_black"
        >高德地图API</a
      >
    </p>
    <!-- 修改地图的配置 -->
    <!-- <option-config /> -->
    <!-- 地图主体 -->
    <div id="AMap"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import AMapUtils from './utils'

onMounted(()=> {
  AMapUtils.init()
})

</script>

<script lang="ts">
import { RouterName } from '@/router/RouteConst'
export default {
  name: RouterName.AMAP
}
</script>

<style lang="scss" scoped>
.map-box {
  .href-box {
    height: 100px;
  }
  #AMap {
    height: 800px;
  }
}
</style>
