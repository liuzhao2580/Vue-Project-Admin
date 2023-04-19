<template>
  <h2>导入 word pdf excel 进行预览功能</h2>
  <h2>PDF 预览-依赖pdfjs.dist模块</h2>
  <h2>
    <a target="_blank" href="https://docs.sheetjs.com/docs/demos/"> Word 预览-依赖docx-preview模块</a>
  </h2>
  <h2>
    <a target="_blank" href="https://docs.sheetjs.com/docs/demos/">Excel 预览-依赖xlsx模块</a>
  </h2>
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
  <div class="file-dialog-box">
    <Dialog>
      <div v-show="tableType === EType.word" id="word-preview"></div>
      <PDFIframe v-show="tableType === EType.pdf" :url="url" />
      <ExcelTable v-show="tableType === EType.excel" :table-data="excelTable" :dialog-visible="dialogVisible" />
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from "vue"
import axios from "axios"
import { renderAsync } from "docx-preview"
import * as XLSX from "xlsx"
import PDFIframe from "./components/PDFIframe.vue"
import Dialog from "./components/Dialog.vue"
import ExcelTable from "./components/ExcelTable.vue"
// @ts-expect-error
import staticPdf from "./static/demo.pdf"
// @ts-expect-error
import staticWord from "./static/demo.docx"
// @ts-expect-error
import staticExcel from "./static/demo.xlsx"

enum EType {
  word = "word",
  pdf = "pdf",
  excel = "excel"
}
interface ITable {
  name: string
  type: EType
  sources: any
}
const url = ref("")
const tableType = ref<EType>()
const dialogVisible = ref(false)
const excelTable = ref()
provide("dialogVisible", dialogVisible)
const tableData = ref<ITable[]>([
  {
    name: "word-本地-三角函数",
    type: EType.word,
    sources: staticWord
  },
  {
    name: "word-线上-资源",
    type: EType.word,
    sources:
      "https://mp-59459393-e8b3-4748-81f4-a9150958c7dc.cdn.bspapp.com/cloudstorage/2e85f396-d991-459b-8c6e-79ca7ceb38f3.docx"
  },
  {
    name: "PDF-本地-三角函数",
    type: EType.pdf,
    sources: staticPdf
  },
  {
    name: "PDF-线上-资源",
    type: EType.pdf,
    sources:
      "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf"
  },
  {
    name: "excel-本地-资源",
    type: EType.excel,
    sources: staticExcel
  },
  {
    name: "excel-线上-资源",
    type: EType.excel,
    sources:
      "https://mp-59459393-e8b3-4748-81f4-a9150958c7dc.cdn.bspapp.com/cloudstorage/7d422459-c8ae-4d12-9bd7-39d861e653f7.xlsx"
  }
])

// 预览按钮
const preview = async ({ row }: { row: ITable }) => {
  const { type, sources } = row
  tableType.value = type
  switch (type) {
    case EType.word:
      axios.get(sources, { responseType: "blob" }).then(res => {
        renderAsync(
          res.data,
          document.getElementById("word-preview") as HTMLDivElement
        ).then(
          () => {
            dialogVisible.value = true
          },
          error => {
            console.log(error)
          }
        )
      })
      break
    case EType.pdf:
      url.value = sources
      dialogVisible.value = true
      break
    case EType.excel:
      axios.get(sources, { responseType: "arraybuffer" }).then(res => {
        const workbook = XLSX.read(res.data, { type: "array" })
        const { SheetNames, Sheets } = workbook
        SheetNames.forEach(sheetName => {
          const worksheet = Sheets[sheetName]
          const excelData = XLSX.utils.sheet_to_json(worksheet)
          excelTable.value = excelData
          dialogVisible.value = true
        })
      })
      break
  }
}
</script>

<script lang="ts">
import { RouterName } from "@/router/RouteConst"
export default {
  name: RouterName.FILE_HTML
}
</script>

<style scoped lang="scss">
.file-dialog-box {
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
      overflow: auto;
    }
  }
}
</style>
