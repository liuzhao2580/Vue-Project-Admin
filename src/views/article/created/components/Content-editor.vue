<template>
  <div id="WangEidtor-id"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import wangEditor from 'wangeditor'
import { configMenu, configColors, fontNames } from './config'
import { EventBus } from '../../shared/utils/EventBus'
@Component({})
export default class ContentEditor extends Vue {
  wangEditorObj: any
  /** 传递给 title 组件 发布按钮和预览按钮禁用取消 */
  btnDisabled = true
  mounted() {
    this.initWangEditor()
  }
  /** 初始化 编辑器 */
  initWangEditor() {
    const getHeight: number = (document.querySelector(
      '.article-created-box'
    ) as Element).scrollHeight
    let editor = new wangEditor('#WangEidtor-id')
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
    editor.config.onchange = (newHtml: HTMLDocument) => {
      if (newHtml) this.btnDisabled = false
      else this.btnDisabled = true
      // 使用 事件总线 传递当前的按钮状态
      EventBus.$emit('btnDisabled', this.btnDisabled)
      // 使用事件总线 传递 内容
      EventBus.$emit('getContent', newHtml)
    }
    /** 监听触发的时间修改 */
    editor.config.onchangeTimeout = 500 // 修改为 500ms

    /** 创建 编辑器实例 */
    editor.create()
    this.wangEditorObj = editor
  }
  beforeDestroy() {
    this.wangEditorObj.destroy()
    this.wangEditorObj = null
  }
}
</script>

<style lang="scss" scoped></style>
