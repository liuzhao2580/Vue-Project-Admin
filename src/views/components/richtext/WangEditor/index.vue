<template>
  <div class="WangEidtor-box">
    <p>
      具体配置
      <a
        href="http://www.wangeditor.com/"
        style="color: #409eff"
        target="block"
      >
        官方文档</a
      >
    </p>
    <div id="WangEidtor"></div>
    <el-button type="primary" class="WangEidtor-btn">提交</el-button>
  </div>
</template>

<script lang="ts" setup>
import { configMenu, configColors, fontNames } from './config'
import WE from 'wangeditor'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const wangEditor = ref()

onMounted(() => {
  initWangEditor()
})

onBeforeUnmount(() => {
  if (wangEditor.value) {
    wangEditor.value.destroy()
    wangEditor.value = null
  }
})
const initWangEditor = () => {
  let editor = new WE('#WangEidtor')
  console.log(editor, 1111)
  // 自定义菜单配置
  editor.config.menus = configMenu
  // 使用 base64 保存图片
  editor.config.uploadImgShowBase64 = true
  // 配置字体颜色、背景色
  editor.config.colors = configColors
  editor.config.fontNames = fontNames
  editor.create()
  wangEditor.value = editor

  ;(document.querySelector('.WangEidtor-btn') as HTMLElement).addEventListener(
    'click',
    function () {
      // 读取 html
      console.log(editor.txt.html())
    },
    false
  )
}
</script>

<script lang="ts">
export default {
  name: 'WangEidtor'
}
</script>

<style lang="scss" scoped></style>
