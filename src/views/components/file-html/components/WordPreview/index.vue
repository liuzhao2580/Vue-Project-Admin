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
    sources: "http://192.168.13.14/static/word/demo.docx"
  }
])

const dialogVisible = ref(false)

const preview = async ({ row }: { row: ITable }) => {
  const { sources } = row
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
}

provide("dialogVisible", dialogVisible)
</script>

<script lang="ts">
export default {
  name: "WordPreview"
}
</script>

<style scoped lang="scss"></style>
