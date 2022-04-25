<template>
  <div class="article-created-box">
    <el-col :xs="24" :sm="24">
      <BigScreenTitle />
    </el-col>
    <el-col :xs="24" :sm="24">
      <div id="toolbar-container"></div>
      <div id="editor-container"></div>
    </el-col>
    <!-- 预览 -->
    <!-- <ReleaseContainer
      :title="state.titleValue"
      :articleContainer="state.articleContainer"
      :categoryData="state.categoryData"
      :visible="state.dialogVisible"
    /> -->
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, reactive } from 'vue'
import {
  createEditor,
  createToolbar,
  IEditorConfig,
  IDomEditor
} from '@wangeditor/editor'
import '@wangeditor/editor/dist/css/style.css'
// import { configMenu, configColors, fontNames } from './components/config'
import BigScreenTitle from './components/Big-screen-title.vue'
// import ReleaseContainer from './components/Release-container.vue'

interface IState {
  wangEditorObj: any
  btnDisabled: boolean
}

const state = reactive<IState>({
  wangEditorObj: '',
  btnDisabled: true
})
/** 传递给 title 组件 发布按钮和预览按钮禁用取消 */

onMounted(() => {
  initWangEditor()
})
/** 初始化 编辑器 */
const initWangEditor = () => {
  // const getHeight: number = (
  //   document.querySelector('.article-created-box') as Element
  // ).scrollHeight
  // let editor = new WE('#WangEidtor-id')
  // // 自定义菜单配置
  // editor.config.menus = configMenu
  // // 使用 base64 保存图片
  // editor.config.uploadImgShowBase64 = true
  // // 配置字体颜色、背景色
  // editor.config.colors = configColors
  // editor.config.fontNames = fontNames
  // // 设置 高度
  // editor.config.height = getHeight - 200
  // editor.config.zIndex = 500

  // /** 编辑器监听内容变化 */
  // editor.config.onchange = (newHtml: HTMLElement) => {
  //   if (newHtml) state.btnDisabled = false
  //   else state.btnDisabled = true
  // }
  // /** 监听触发的时间修改 */
  // editor.config.onchangeTimeout = 500 // 修改为 500ms

  // /** 创建 编辑器实例 */
  // editor.create()
  // state.wangEditorObj = editor

  const editorConfig: Partial<IEditorConfig> = {
  }
  editorConfig.placeholder = '请输入内容'
  editorConfig.onChange = (editor: IDomEditor) => {
    // 当编辑器选区、内容变化时，即触发
    console.log('content', editor.children)
    console.log('html', editor.getHtml())
  }
  // 创建编辑器
  const editor = createEditor({
    selector: '#editor-container',
    config: editorConfig,
    mode: 'default' // 或 'simple' 参考下文
  })
  // 创建工具栏
  createToolbar({
    editor,
    selector: '#toolbar-container',
    mode: 'default' // 或 'simple' 参考下文
  })
}

onBeforeUnmount(() => {
  state.wangEditorObj.destroy()
  state.wangEditorObj = null
})
</script>

<script lang="ts">
import { RouterName } from '@/router/RouteConst'
export default {
  name: RouterName.ARTICLE_CREATE
}
</script>

<style lang="scss" scoped>
.article-created-box {
  :deep(.el-col) {
    width: 100%;
  }
}
</style>
