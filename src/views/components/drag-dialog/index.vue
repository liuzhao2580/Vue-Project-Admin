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
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import dragDialog from '@/directives/el-drag-dialog'
export default {
  name: 'DragDialog',
  components: {},
  directives: { dragDialog },
  props: {},
  data() {
    return {
      dialogVisible: false
    }
  },
  created() {},
  mounted() {},
  methods: {
    dialog_closed() {
      this.$refs.dialogREF.style.left = 0
      this.$refs.dialogREF.style.top = 0
    }
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
.dialog-box {
  /deep/ .el-dialog {
    margin-bottom: 0;
  }
}
</style>
