<template>
  <p>
    具体配置
    <a href="https://www.wangeditor.com/" target="block"> 官方文档</a>
  </p>
  <div class="WangEidtor-box">
    <div id="toolbar-container"></div>
    <div id="WangEidtor" style="height: 600px"></div>
  </div>
  <el-button type="primary" class="WangEidtor-btn" @click="submitClick"
    >提交</el-button
  >
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, shallowRef } from "vue"
import "@wangeditor/editor/dist/css/style.css"
import {
  createEditor,
  createToolbar,
  IEditorConfig,
  IToolbarConfig
} from "@wangeditor/editor"
const editorConfig: Partial<IEditorConfig> = {}

// 工具栏配置
const toolbarConfig: Partial<IToolbarConfig> = {
  excludeKeys: ["fullScreen"]
}

// 创建编辑器
const editor = shallowRef()
onMounted(() => {
  initWangEditor()
})

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
    editor.value = null
  }
})
const initWangEditor = () => {
  editorConfig.placeholder = "请输入内容"
  editor.value = createEditor({
    selector: "#WangEidtor",
    config: editorConfig,
    mode: "default" // 或 'simple' 参考下文
  })

  createToolbar({
    editor: editor.value,
    selector: "#toolbar-container",
    config: toolbarConfig,
    mode: "default" // 或 'simple' 参考下文
  })
}

/** 提交按钮 */
const submitClick = () => {
  console.log(editor.value?.getHtml())
}
</script>

<script lang="ts">
export default {
  name: "WangEidtor"
}
</script>

<style lang="scss" scoped>
.WangEidtor-box {
  margin: 10px 0;
  border: 1px solid var(--lz-border-color);
  border-radius: 5px;
  > :deep(div) {
    .w-e-bar,
    .w-e-text-container {
      background-color: var(--lz-bg-color);
      color: var(--lz-text-color);
    }
  }
}
</style>
