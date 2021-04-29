<template>
  <div id="map-box">
    <!-- 修改地图的配置 -->
    <option-config />
    <!-- 地图主体 -->
    <a-map-com />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import AMapCom from "./components/AMap.vue"
import OptionConfig from "./components/OptionConfig.vue"
@Component({
  name: "amap",
  components: {
    AMapCom,
    OptionConfig,
  },
})
export default class AMap extends Vue {}
</script>

<style lang="scss" scoped></style>
