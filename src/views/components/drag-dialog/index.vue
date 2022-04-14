<template>
  <div class="dragDialog-box">
    <el-button type="text" @click="dialogVisible = true"
      >点击打开 Dialog</el-button
    >
    <el-dialog
      v-el-drag-dialog
      v-model:visible="dialogVisible"
      width="30%"
      :close-on-click-modal="false"
      @closed="dialog_closed"
      class="dialog-box"
      ref="dialogREF"
    >
      <!-- <span slot="title">这是一段信息</span> -->
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
// import dragDialog from '@/directives/el-drag-dialog'
import { ref } from 'vue'

const dialogVisible = ref<boolean>(false)

const dialogREF = ref<HTMLDivElement>()

const dialog_closed = () => {
  if (dialogREF.value) {
    dialogREF.value.style.left = '0'
    dialogREF.value.style.top = '0'
  }
}

</script>

<script lang="ts">
import { RouterName } from '@/router/RouteConst'
export default {
  name: RouterName.DRAG_DIALOG
}
</script>

<style lang="scss" scoped>
.dialog-box {
  /deep/ .el-dialog {
    margin-bottom: 0;
  }
}
</style>
