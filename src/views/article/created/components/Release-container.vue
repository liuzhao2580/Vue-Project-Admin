<template>
  <el-dialog
    title="文章预览"
    v-model:visible="visibleFlag"
    width="80%"
    :close-on-click-modal="false"
    class="article-dialog-box"
    @close="$emit('update:visible', false)"
  >
    <!-- 文章标题 -->
    <div class="article-title">{{ title }}</div>
    <!-- 文章分类 -->
    <div class="article-category-box">
      <p class="article-title">文章分类</p>
      <div class="article-category">
        <el-radio-group v-model="categoryValue" @change="categoryChange">
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
    <!-- 文章内容 -->
    <div class="release-container" v-html="articleContainer"></div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('update:visible', false)">取 消</el-button>
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

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
@Component({
  name: 'ReleaseContainer'
})
export default class ReleaseContainer extends Vue {
  /** 弹出框的 visible */
  @Prop({ default: false, type: Boolean, required: true }) visible
  /** 文章标题 */
  @Prop({ default: '', type: String, required: true }) title
  /** 文章内容 */
  @Prop({ default: '', type: String, required: true }) articleContainer
  /** 分类的数据 */
  @Prop({ default: () => [], type: Array, required: true }) categoryData
  /** 文章分类 选中项 id */
  categoryValue = ''
  /** 弹框 */
  visibleFlag = false
  /** 发布按钮的禁用 */
  get releaseDisabled(): boolean {
    let flag = false
    if (!this.categoryValue) flag = true
    return flag
  }
  /** 选择分类的改变事件 */
  categoryChange(value: number) {
    const getFind = this.categoryData.find(item => item.id === value)
    console.log(getFind, 'getFind')
  }
  /** 发布按钮 */
  releaseArticle(): void {
    console.log(this.articleContainer)
    // this.dialogVisible = false
  }
  /** 监听 visible 变化 */
  @Watch('visible') change() {
    this.visibleFlag = this.visible
  }
}
</script>

<style lang="scss" scoped>
// 预览弹出框
.article-dialog-box {
  .article-title {
    margin-bottom: 10px;
  }
  .article-name {
    margin: 10px 0;
    font-size: 20px;
    font-weight: 900;
  }
  // 分类
  .article-category-box {
    .article-title {
      font-size: 18px;
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
