<template>
    <div class="WangEidtor-box">
        <p>
            具体配置
            <a href="http://www.wangeditor.com/" style="color: #409eff" target="block"> 官方文档</a>
        </p>
        <div id="WangEidtor"></div>
        <el-button type="primary" class="WangEidtor-btn">提交</el-button>
    </div>
</template>

<script>
import { configMenu, configColors, fontNames } from './config'
import wangEditor from 'wangeditor'
export default {
  name: 'WangEidtor',
  components: {},
  props: {},
  data() {
    return {
      wangEditor: null
    }
  },
  created() {},
  mounted() {
    this.initWangEditor()
  },
  methods: {
    initWangEditor() {
      let editor = new wangEditor('#WangEidtor')
      console.log(editor, 1111)
      // 自定义菜单配置
      editor.config.menus = configMenu
      // 使用 base64 保存图片
      editor.config.uploadImgShowBase64 = true
      // 配置字体颜色、背景色
      editor.config.colors = configColors
      editor.config.fontNames = fontNames
      editor.create()
      this.wangEditor = editor
      document.querySelector('.WangEidtor-btn').addEventListener(
        'click',
        function() {
          // 读取 html
          console.log(editor.txt.html())
        },
        false
      )
    }
  },
  beforeUnmount() {
    if (this.wangEditor) {
      this.wangEditor.destroy()
      this.wangEditor = null
    }
  },
  watch: {}
}
</script>

<style lang="scss" scoped></style>
