<template>
  <div class="back-to-top-box">
    <ul
      class="infinite-list"
      v-infinite-scroll="load"
      style="overflow:auto;height: 500px"
    >
      <li v-for="i in count" class="infinite-list-item" :key="i">{{ i }}</li>
    </ul>
    <el-backtop target=".infinite-list">
      <svg-icon iconClass="backtop"></svg-icon>
    </el-backtop>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const count = ref<number>(500)
const load = ()=> {
  count.value += 2
}
</script>

<script lang="ts">
import { RouterName } from '@/router/RouteConst'
export default {
  name: RouterName.BACK_TO_TOP
}
</script>

<style lang="scss" scoped></style>
