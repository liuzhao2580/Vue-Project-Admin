<template>
  <el-dialog
    v-model="dialogVisible"
    :close-on-click-modal="false"
    width="80%"
    title="预览"
  >
    <slot></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">
          关闭
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { inject } from "vue"

const dialogVisible = inject<boolean>("dialogVisible")
</script>

<script lang="ts">
export default {
  name: "FileDialog"
}
</script>

<style scoped lang="scss"></style>
