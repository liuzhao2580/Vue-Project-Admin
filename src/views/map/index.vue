<template>
  <div class="map-box">
    <!-- 地图主体 -->
    <div id="map"></div>
  </div>
</template>

<script lang="ts" setup>
import { RouterName } from "@/router/RouteConst"
import { MapboxInit } from "@/utils/modules/mapboxUtils/index"
defineOptions({
  name: RouterName.AMAP
})
onMounted(() => {
  new MapboxInit().createMap("map")
})
</script>

<style lang="scss" scoped>
.map-box {
  display: flex;
  flex-direction: column;

  #map {
    height: 100vh;
    width: 100vw;
  }
}
</style>
