<template>
  <div class="pdf-canvas-box">
    <h2>PDF 预览</h2>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="name" label="名称" />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="preview(scope)"
            >预览</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      v-model="dialogVisible"
      :close-on-click-modal="false"
      width="80%"
      title="预览"
    >
      <PDFIframe :url="url" />
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">
            关闭
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
// @ts-expect-error
import staticPdf from "./demo.pdf"
import PDFIframe from "./PDFIframe.vue"
interface ITable {
  name: string
  sources: any
}

const tableData = ref<ITable[]>([
  {
    name: "本地-三角函数",
    sources: staticPdf
  },
  {
    name: "线上-资源",
    sources:
      "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf"
  }
])

const url = ref("")
const dialogVisible = ref(false)

const preview = async ({ row }: { row: ITable }) => {
  const { sources } = row
  url.value = sources
  dialogVisible.value = true
}
</script>

<script lang="ts">
export default {
  name: "PDFPreview",
  components: { PDFIframe }
}
</script>

<style scoped lang="scss">
.pdf-canvas-box {
  ::v-deep(.el-dialog) {
    position: relative;
    margin-top: 0;
    margin-bottom: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    .el-dialog__body {
      flex: 1;
      padding: 0 16px;
    }
  }
}
</style>
