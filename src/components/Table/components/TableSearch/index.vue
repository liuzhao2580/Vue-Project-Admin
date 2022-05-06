<template>
  <div class="table-search">
    <div class="table-search-container">TableSearch</div>
    <div class="table-search-mask" @click="maskClick"></div>
  </div>
</template>

<script setup lang="ts">

const emits = defineEmits<{ (e: 'maskClick'): void }>()

/** 遮罩层点击事件 */
const maskClick = ()=> {
  emits('maskClick')
}
</script>

<script lang="ts">
export default {
  name: 'TableSearch'
}
</script>

<style scoped lang="scss">
.table-search {
  position: absolute;
  width: 100%;
  height: calc(100% - 50px);
  overflow-y: auto;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  &-container {
    height: 300px;
    background-color: pink;
  }
  &-mask {
    flex: 1;
    background-color: #787878;
    opacity: .4;
  }
}
</style>
