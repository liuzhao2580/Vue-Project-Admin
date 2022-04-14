<template>
  <div id="WangEidtor-id"></div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, reactive } from 'vue'
import WE from 'wangeditor'
import { configMenu, configColors, fontNames } from './config'


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
  const getHeight: number = (
    document.querySelector('.article-created-box') as Element
  ).scrollHeight
  let editor = new WE('#WangEidtor-id')
  // 自定义菜单配置
  editor.config.menus = configMenu
  // 使用 base64 保存图片
  editor.config.uploadImgShowBase64 = true
  // 配置字体颜色、背景色
  editor.config.colors = configColors
  editor.config.fontNames = fontNames
  // 设置 高度
  editor.config.height = getHeight - 200
  editor.config.zIndex = 500

  /** 编辑器监听内容变化 */
  editor.config.onchange = (newHtml: HTMLElement) => {
    if (newHtml) state.btnDisabled = false
    else state.btnDisabled = true
  }
  /** 监听触发的时间修改 */
  editor.config.onchangeTimeout = 500 // 修改为 500ms

  /** 创建 编辑器实例 */
  editor.create()
  state.wangEditorObj = editor
}

onBeforeUnmount(() => {
  state.wangEditorObj.destroy()
  state.wangEditorObj = null
})
</script>

<style lang="scss" scoped></style>
