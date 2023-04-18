<template>
  <h2>WordPreview</h2>

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

  <Dialog>
    <div id="word-preview"></div>
  </Dialog>
</template>

<script setup lang="ts">
import axios from "axios"
import { provide, ref } from "vue"
// import * as mammoth from "mammoth"
import { renderAsync } from "docx-preview"
// @ts-expect-error
import staticWord from "./demo.docx"
import Dialog from "../Dialog/index.vue"

interface ITable {
  name: string
  sources: any
}
const tableData = ref<ITable[]>([
  {
    name: "本地-三角函数",
    sources: staticWord
  },
  {
    name: "线上-资源",
    sources:
      "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf"
  }
])

const dialogVisible = ref(false)

const preview = async ({ row }: { row: ITable }) => {
  const { sources } = row
  // dialogVisible.value = true
  // const res = await mammoth.convertToHtml({ path: sources })
  // console.log(res)
  axios.get(sources, { responseType: "blob" }).then(res => {
    console.log(res)
    renderAsync(
      res.data,
      document.getElementById("word-preview") as HTMLDivElement
    ).then(
      res => {
        console.log(res)
      },
      error => {
        console.log(error)
      }
    )
  })
  let xhr = new XMLHttpRequest()
  xhr.open("get", sources, true)
  xhr.responseType = "blob"
  xhr.onload = () => {
    if (xhr.status === 200) {
      // mammoth
      //   .convertToHtml({ arrayBuffer: new Uint8Array(xhr.response) })
      //   .then(function (resultObject) {
      //     console.log(resultObject)
      //   })
    }
  }
  xhr.send()
}

provide("dialogVisible", dialogVisible)
</script>

<script lang="ts">
export default {
  name: "WordPreview"
}
</script>

<style scoped lang="scss"></style>
