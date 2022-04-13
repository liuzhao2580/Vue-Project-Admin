<template>
  <div class="Progress-box">
    <div v-for="item in progressItems" :key="item.label">
      {{ item.label }}
      <el-progress
        :percentage="item.percentage"
        :color="item.color"
      ></el-progress>
    </div>
  </div>
</template>

<script lang="ts" setup>
const progressItems = [
  { label: 'Vue', percentage: 80, color: '#5cb87a' },
  { label: 'JavaScript', percentage: 70, color: '#e6a23c' },
  { label: 'CSS', percentage: 50, color: '#f56c6c' },
  { label: 'HTML', percentage: 60, color: '#6f7ad3' }
]
</script>

<script>
export default {
  name: 'ProgressCom'
}
</script>

<style lang="scss" scoped>
.Progress-box {
  .el-progress {
    margin: 10px 0;
  }
}
</style>
