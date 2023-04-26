<template>
  <el-popover
    :width="300"
    popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
    trigger="click"
  >
    <template #reference>
      <span class="message-tip">
          <span class="iconbell"><Bell /></span>
          <span class="message-num">{{ 3 }}</span>
        </span>
    </template>
    <template #default>
      <div class="demo-rich-conent">123</div>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { Bell } from "@element-plus/icons-vue"
</script>

<script lang="ts">
export default {
  name: "MessageTip"
}
</script>

<style scoped lang="scss">
.message-tip {
  position: relative;
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin: 0 6px;
  .iconbell {
    display: inline-block;
    width: 20px;
    height: 20px;
    animation: bellAnimation 1s infinite;
  }
  .message-num {
    position: absolute;
    top: 0;
    right: 5px;
    background-color: red;
    font-size: 12px;
    padding: 0 5px;
    border-radius: 8px;
    color: #fff;
    transform: translateY(-50%) translate(100%);
  }
}

@keyframes bellAnimation {
  0% {
    transform: rotate(0);
  }
  10% {
    transform: rotate(25deg);
  }
  20% {
    transform: rotate(0deg);
  }
  30% {
    transform: rotate(-25deg);
  }
  40% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(25deg);
  }
  55% {
    transform: rotate(0deg);
  }
  60% {
    transform: rotate(-10deg);
  }
  65% {
    transform: rotate(0deg);
  }
  70% {
    transform: rotate(10deg);
  }
  75% {
    transform: rotate(0deg);
  }
  80% {
    transform: rotate(-10deg);
  }
  85% {
    transform: rotate(0deg);
  }
  90% {
    transform: rotate(10deg);
  }
  95% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(10deg);
  }
}
</style>
