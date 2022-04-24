<template>
  <div class="UserImg-box">
    <div class="img" :style="{ backgroundImage: `url(${avatar})` }"></div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from '@/store'
const store = useStore()
const avatar = computed(() => {
  return store.state.user.avatar
})
</script>

<script lang="ts">
export default {
  name: 'UserImg'
}
</script>

<style lang="scss" scoped>
.UserImg-box {
  margin: 0 auto;
  width: 120px;
  height: 120px;
  text-align: center;
  &:hover {
    .img {
      transform: rotate(-360deg);
    }
  }
  .img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-size: cover;
    background-position: 50%;
    transition: all 0.6s;
  }
}
</style>
