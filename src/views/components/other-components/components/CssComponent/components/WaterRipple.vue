<template>
  <div class="water-ripple-box">
    <p>水波纹</p>
    <div class="demo-box">
      <div :class="['demo-item cricle', clickFlag ? 'active' : '']">
        <span class="click-btn" @click="cricleClick">点击</span>
        <p class="cricle-bg"></p>
        <p class="cricle-bg"></p>
        <p class="cricle-bg"></p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
/** 水波纹 */
import { Component, Vue } from 'vue-property-decorator'
@Component({
  name: 'WaterRipple'
})
export default class WaterRipple extends Vue {
  /** 判断是否已经点击了 */
  clickFlag: boolean = false
  /** 点击事件 */
  cricleClick(): void {
    this.clickFlag = !this.clickFlag
  }
}
</script>

<style lang="scss" scoped>
.water-ripple-box {
  .demo-box {
    .demo-item {
      text-align: center;
      border: 1px solid #ccc;
      cursor: pointer;
      .click-btn {
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        width: 100%;
        height: 100%;
        z-index: 10;
      }
    }
    .cricle {
      position: relative;
      width: 100px;
      height: 100px;
      line-height: 100px;
      border-radius: 50%;
      &.active .cricle-bg {
        animation: waterRipple 2s infinite;
        border: 5px solid skyblue;
        transform: scale(0);
      }
      .cricle-bg {
        position: absolute;
        top: 0;
        border-radius: 50%;
        width: 100px;
        height: 100px;
        &:nth-of-type(1) {
          animation-delay: 0.3s;
        }
        &:nth-of-type(2) {
          animation-delay: 0.6s;
        }
        &:nth-of-type(3) {
          animation-delay: 0.9s;
        }
      }
    }
  }
}
@keyframes waterRipple {
  from {
    opacity: 1;
    transform: scale(0);
  }
  to {
    opacity: 0;
    transform: scale(1);
  }
}
</style>
