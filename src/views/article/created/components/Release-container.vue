<template>
  <el-dialog
    title="文章预览"
    :visible.sync="dialogVisible"
    width="80%"
    :close-on-click-modal="false"
    class="article-dialog-box"
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
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" :disabled="releaseDisabled" @click="releaseArticle"
        >发 布</el-button
      >
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
@Component({
  name: "ReleaseContainer",
})
export default class ReleaseContainer extends Vue {
  /** 文章标题 */
  @Prop({ default: "", type: String, required: true }) title
  /** 文章内容 */
  @Prop({ default: "", type: String, required: true }) articleContainer
  /** 分类的数据 */
  @Prop({ default: "", type: String, required: true }) categoryData
  /** 文章分类 选中项 id */
  categoryValue: string = ""
  /** 发布按钮的禁用 */
  get releaseDisabled(): boolean {
    let flag: boolean = false
    if (!this.categoryValue) flag = true
    return flag
  }
  created() {}
}
</script>

<style lang="scss" scoped></style>
