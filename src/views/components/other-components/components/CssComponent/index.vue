<template>
  <div class="css-component-box">
    <p class="title">Css的样式</p>
    <Water-Ripple />
  </div>
</template>
<script lang="ts">
/** Css的样式 */
import { Component, Vue } from 'vue-property-decorator'
import WaterRipple from './components/WaterRipple.vue'
@Component({
  name: 'CssComponent',
  components: {
    WaterRipple
  }
})
export default class CssComponent extends Vue {
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
