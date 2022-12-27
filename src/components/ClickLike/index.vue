<template>
  <div class="ClickLike-box" @click="ClickLike">
    <img :src="src" alt="" />
    {{ dz_Name }}
    <div class="animate" v-show="ClickLike_Status"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { handleViteImages } from "@/utils";
const src_dz = handleViteImages("@/assets/images/dz.png");
/** 点赞后的图片 */
const src_dzd = handleViteImages("@/assets/images/dzd.png");
/** 点赞状态, 如果没有点赞 false  点赞之后就是 true */
const dzd_status = ref<boolean>(false);
const dz_Name = ref("赞");
const src = ref(src_dz);
/** 设置 缓缓升起的红心的显示状态 */
const ClickLike_Status = ref<boolean>(false);
const ClickLike = () => {
  // 说明已经点赞了, 如果再次点击 就是取消点赞
  if (dzd_status.value) {
    dz_Name.value = "赞";
    src.value = src_dz;
    dzd_status.value = false;
    return;
  }
  ClickLike_Status.value = true;
  setTimeout(() => {
    ClickLike_Status.value = false;
    src.value = src_dzd;
    dzd_status.value = true;
  }, 1000);
};

watch(dzd_status, val => {
  if (val) {
    dz_Name.value = "取消";
  }
});
</script>

<script lang="ts">
export default {
  name: "ClickLike"
};
</script>

<style lang="scss" scoped>
.ClickLike-box {
  position: relative;
  img {
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
  .animate {
    position: absolute;
    width: 20px;
    height: 20px;
    z-index: 100;
    animation: ClickLikeAni 1s ease-in-out;
    background-image: url("../../assets/images/dzd.png");
    background-size: cover;
  }
}
@keyframes ClickLikeAni {
  0% {
    top: 0px;
  }
  10% {
    top: -3px;
  }
  20% {
    top: -6px;
  }
  30% {
    top: -9px;
  }
  40% {
    top: -12px;
    transform: rotate(6deg);
  }
  50% {
    top: -15px;
    transform: rotate(12deg);
  }
  60% {
    top: -18px;
    transform: rotate(6deg);
  }
  70% {
    top: -21px;
    transform: rotate(0deg);
  }
  80% {
    top: -24px;
    transform: rotate(-6deg);
  }
  90% {
    top: -27px;
    transform: rotate(-12deg);
  }
  100% {
    top: -30px;
    transform: rotate(-6deg);
  }
}
</style>
