<template>
  <div class="css-component-box">
    <p class="title">Css的样式</p>
    <WaterRipple />
  </div>
</template>
<script lang="ts" setup>
/** Css的样式 */
import WaterRipple from './components/WaterRipple.vue'
</script>

<script lang="ts">
export default {
  name: 'CssComponent'
}
</script>

<style lang="scss" scoped>
.css-component-box {
  .title {
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 10px;
  }
}
</style>
