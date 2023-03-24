<template>
  <div class="article-created-box">
    <el-col :xs="24" :sm="24">
      <ArticleTitle @release-click="releaseClick" />
    </el-col>
    <!-- 编辑器 -->
    <el-col :xs="24" :sm="24" class="editor-box">
      <div id="toolbar-container"></div>
      <div id="editor-container"></div>
    </el-col>
    <!-- 预览 -->
    <ReleaseContainer
      :title="state.articleTitle"
      :articleContainer="state.articleContainer"
      :categoryData="state.categoryData"
      :visible="state.dialogVisible"
      @update:visible="state.dialogVisible = $event"
    />
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, reactive } from "vue"
import {
  createEditor,
  createToolbar,
  IEditorConfig,
  IDomEditor
} from "@wangeditor/editor"
import "@wangeditor/editor/dist/css/style.css"
import { ElMessage } from "element-plus"
import { queryArticleCategoryAPI } from "@/api/modules/article"
import { ResultCodeEnum } from "@/typescript/shared/enum"
import ArticleTitle from "./components/ArticleTitle.vue"
import ReleaseContainer from "./components/ReleaseContainer.vue"
import { IArticleCategory } from "@/typescript/views/article/interface/article-config.interface"

interface IState {
  /** 编辑器的实例 */
  wangEditor: IDomEditor | null;
  /** 文章的标题 */
  articleTitle: string;
  /** 文章的内容 */
  articleContainer: string;
  /** 弹出框 */
  dialogVisible: boolean;
  /** 文章分类的数据 */
  categoryData: IArticleCategory[];
}

const state = reactive<IState>({
  wangEditor: null,
  articleTitle: "",
  articleContainer: "",
  dialogVisible: false,
  categoryData: []
})
/** 传递给 title 组件 发布按钮和预览按钮禁用取消 */

onMounted(() => {
  queryArticleCategory()
  initWangEditor()
})

/** 获取文章分类 */
const queryArticleCategory = async () => {
  const result = await queryArticleCategoryAPI({ level: 2 })
  if (result.code === ResultCodeEnum.SUCCESS) state.categoryData = result.data
  else ElMessage.error(result.msg)
}
/** 初始化 编辑器 */
const initWangEditor = () => {
  const getHeight: number = (
    document.querySelector(".article-created-box") as Element
  ).scrollHeight
  const getEditorDom = document.querySelector(
    "#editor-container"
  ) as HTMLElement
  getEditorDom.style.height = `${getHeight - 200}px`

  const editorConfig: Partial<IEditorConfig> = {
    scroll: false,
    MENU_CONF: {
      uploadImage: {
        base64LimitSize: 5000 * 1024 // 5kb
      }
    }
  }
  editorConfig.placeholder = "请输入内容"
  // editorConfig.onChange = (editor: IDomEditor) => {
  //   // 当编辑器选区、内容变化时，即触发
  //   console.log('content', editor.children)
  //   console.log('html', editor.getHtml())
  // }
  // 创建编辑器
  const editor = createEditor({
    selector: "#editor-container",
    config: editorConfig,
    mode: "default" // 或 'simple' 参考下文
  })
  // 创建工具栏
  createToolbar({
    editor,
    selector: "#toolbar-container",
    mode: "default" // 或 'simple' 参考下文
  })
  state.wangEditor = editor
}

/** 预览按钮点击事件 */
const releaseClick = (titleValue: string) => {
  state.articleTitle = titleValue
  if (state.wangEditor) {
    if (!state.wangEditor?.getText()) return ElMessage.warning("输入内容")
    state.articleContainer = state.wangEditor?.getHtml() as string
    state.dialogVisible = true
  }
}

onBeforeUnmount(() => {
  state.wangEditor?.destroy()
  state.wangEditor = null
})
</script>

<script lang="ts">
import { RouterName } from "@/router/RouteConst"
export default {
  name: RouterName.ARTICLE_CREATE
}
</script>

<style lang="scss" scoped>
.article-created-box {
  :deep(.el-col) {
    width: 100%;
  }
  .editor-box {
    border: 1px solid #ccc;
    #toolbar-container {
      border-bottom: 1px solid #ccc;
    }
    #editor-container {
      overflow-y: auto;
    }
  }
}
</style>
