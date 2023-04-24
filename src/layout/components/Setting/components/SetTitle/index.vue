<template>
    <el-divider>
      <span class="set-title">{{ title }}</span>
    </el-divider>
</template>

<script setup lang="ts">
interface IProps {
  title: string
}

defineProps<IProps>()
</script>

<script lang="ts">
// 主题的标题
export default {
  name: "SetTitle"
}
</script>

<style scoped lang="scss">
.set-title {
  font-size: 16px;
  font-weight: 700;
}
</style>
