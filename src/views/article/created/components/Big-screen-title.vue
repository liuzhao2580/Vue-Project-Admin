<template>
  <div class="big-screen-title">
    <!-- 文章标题 -->
    <div class="title-input">
      <el-input placeholder="请输入文章标题" class="article-title" v-model="titleValue"></el-input>
    </div>
    <!-- 预览按钮 -->
    <div class="button-box">
      <!-- <el-button type="primary" :disabled="disabled" @click="dialogVisible = true">预览</el-button> -->
      <el-button type="primary" @click="dialogVisible = true">预览</el-button>
    </div>
    <release-container
      :title="titleValue"
      :articleContainer="articleContainer"
      :categoryData="categoryData"
      v-model:visible="dialogVisible"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { EventBus } from '../../shared/utils/EventBus'
import { queryArticleCategory_API } from '@/api/modules/article'
import { ResultCodeEnum } from '@/typescript/shared/enum'
import { IArticleCategory } from '@/typescript/views/article/interface/article-config.interface'
import ReleaseContainer from './Release-container.vue'
@Component({
  components: {
    ReleaseContainer
  }
})
/** 大屏幕 下的 标题 */
export default class BigScreenTitle extends Vue {
  /** 按钮是否禁用 */
  btnDisabled = true
  /** 文章标题 */
  titleValue = ''
  /** 文章分类的数据 */
  categoryData: IArticleCategory[] = []
  /** 文章内容 */
  articleContainer: any = ''
  /** 预览内容弹出框 */
  dialogVisible = false

  /** 预览按钮禁用 */
  get disabled(): boolean {
    let flag = false
    if (this.btnDisabled || !this.titleValue) flag = true
    return flag
  }

  mounted() {
    this.init_EventBus()
    this.queryArticleCategory()
  }
  /** 使用事件总线获取 当前的内容和 设置按钮的样式 */
  init_EventBus() {
    EventBus.$on('btnDisabled', (flag: boolean) => {
      this.btnDisabled = flag
    })
    EventBus.$on('getContent', (html: HTMLDocument) => {
      this.articleContainer = html
    })
  }
  /** 获取文章分类 */
  async queryArticleCategory() {
    const result = await queryArticleCategory_API({ level: 2 })
    if (result.code === ResultCodeEnum.success) this.categoryData = result.data
    else this.$message.error(result.msg)
  }
}
</script>

<style lang="scss" scoped>
.big-screen-title {
  border-radius: 5px;
  display: flex;
  .title-input {
    margin-bottom: 10px;
    width: 90%;
    margin-right: 10px;
  }
  // 预览按钮
  .button-box {
    flex: 1;
    .el-button {
      width: 100%;
    }
  }
}
.article-title {
  font-size: 24px;
  font-weight: 900;
}
</style>
