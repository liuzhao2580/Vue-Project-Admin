<template>
  <el-dialog
    title="文章预览"
    v-model="state.visibleFlag"
    width="80%"
    :close-on-click-modal="false"
    custom-class="article-dialog-box"
    @close="closeDialog"
    draggable
  >
    <!-- 文章标题 -->
    <div class="article-title">{{ title }}</div>
    <!-- 文章内容 -->
    <div class="release-container-box">
      <div class="release-container" v-html="articleContainer"></div>
    </div>
    <!-- 文章分类 -->
    <div class="article-category-box">
      <p class="article-category-title">文章分类</p>
      <div class="article-category">
        <el-radio-group v-model="state.categoryValue" @change="categoryChange">
          <el-radio
            :label="categoryItem.id"
            v-for="categoryItem in categoryData"
            :key="categoryItem.id"
            class="category-item"
            >{{ categoryItem.category_name }}</el-radio
          >
        </el-radio-group>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button
          type="primary"
          :disabled="releaseDisabled"
          @click="releaseArticle"
          >发 布</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { IArticleCategory } from "@/typescript/views/article/interface/article-config.interface"
import { ElMessage } from "element-plus"
import { computed, reactive, watch } from "vue"

interface IProps {
  /** 弹出框的 visible */
  visible: boolean;
  /** 文章标题 */
  title: string;
  /** 文章内容 */
  articleContainer: string;
  /** 分类的数据 */
  categoryData: IArticleCategory[];
}

const props = defineProps<IProps>()

const emit = defineEmits<{
  (e: "update:visible", value: boolean): void;
}>()
/** 关闭 弹出框 */
const closeDialog = () => emit("update:visible", false)

interface IState {
  /** 文章分类 选中项 id */
  categoryValue: string;
  /** 弹框 */
  visibleFlag: boolean;
}

const state = reactive<IState>({
  categoryValue: "",
  visibleFlag: false
})

/** 发布按钮的禁用 */
const releaseDisabled = computed(() => {
  let flag = false
  if (!state.categoryValue) flag = true
  return flag
})

/** 选择分类的改变事件 */
const categoryChange = (value: string | number | boolean) => {
  const getFind = props.categoryData.find(item => item.id === value)
  console.log(getFind, "getFind")
}
/** 发布按钮 */
const releaseArticle = (): void => {
  ElMessage.success("只做测试哟~~~~~")
  closeDialog()
}
/** 监听 visible 变化 */
watch(
  () => props.visible,
  () => {
    state.visibleFlag = props.visible
  }
)
</script>

<script lang="ts">
export default {
  name: "ReleaseContainer"
}
</script>

<style lang="scss" scoped>
// 预览弹出框
.article-dialog-box {
  .article-title {
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 700;
  }
  .release-container-box {
    max-height: 800px;
    overflow: auto;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 3px;
    margin: 10px 0;
    .release-container {
      min-height: 500px;
    }
  }
  // 分类
  .article-category-box {
    .article-category-title {
      font-size: 18px;
      margin-bottom: 10px;
    }
    .article-category {
      min-height: 100px;
      max-height: 150px;
      overflow-y: auto;
      border: 1px solid #f0f0f0;
      border-radius: 5px;
      padding: 16px;
      .category-item {
        margin: 5px 20px 5px 0;
      }
    }
  }
}
</style>
