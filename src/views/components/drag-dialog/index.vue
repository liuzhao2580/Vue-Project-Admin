<template>
  <div class="dragDialog-box">
    <el-button type="primary" link @click="dialogVisible = true"
      >点击打开 Dialog</el-button
    >
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      :close-on-click-modal="false"
      draggable
    >
      <template #header>这是一段信息</template>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"

const dialogVisible = ref<boolean>(false)
</script>

<script lang="ts">
import { RouterName } from "@/router/RouteConst"
export default {
  name: RouterName.DRAG_DIALOG
}
</script>

<style lang="scss" scoped></style>
