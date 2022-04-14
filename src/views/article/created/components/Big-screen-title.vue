<template>
  <div class="big-screen-title">
    <!-- 文章标题 -->
    <div class="title-input">
      <el-input
        placeholder="请输入文章标题"
        class="article-title"
        v-model="state.titleValue"
      ></el-input>
    </div>
    <!-- 预览按钮 -->
    <div class="button-box">
      <!-- <el-button type="primary" :disabled="disabled" @click="dialogVisible = true">预览</el-button> -->
      <el-button type="primary" @click="state.dialogVisible = true">预览</el-button>
    </div>
    <release-container
      :title="state.titleValue"
      :articleContainer="state.articleContainer"
      :categoryData="state.categoryData"
      v-model:visible="state.dialogVisible"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { queryArticleCategory_API } from '@/api/modules/article'
import { ResultCodeEnum } from '@/typescript/shared/enum'
import { IArticleCategory } from '@/typescript/views/article/interface/article-config.interface'
import ReleaseContainer from './Release-container.vue'
/** 大屏幕 下的 标题 */
interface IState {
  /** 按钮是否禁用 */
  btnDisabled: boolean
  /** 文章标题 */
  titleValue: string
  /** 文章分类的数据 */
  categoryData: IArticleCategory[]
  /** 文章内容 */
  articleContainer: string
  /** 预览内容弹出框 */
  dialogVisible: boolean
}
const state = reactive<IState>({
  /** 按钮是否禁用 */
  btnDisabled: true,
  /** 文章标题 */
  titleValue: '',
  /** 文章分类的数据 */
  categoryData: [],
  /** 文章内容 */
  articleContainer: '',
  /** 预览内容弹出框 */
  dialogVisible: false
})

/** 预览按钮禁用 */
const disabled = computed(() => {
  let flag = false
  if (state.btnDisabled || !state.titleValue) flag = true
  return flag
})
console.log(disabled)

onMounted(() => {
  queryArticleCategory()
})
/** 使用事件总线获取 当前的内容和 设置按钮的样式 */
// init_EventBus() {
//   EventBus.$on('btnDisabled', (flag: boolean) => {
//     this.btnDisabled = flag
//   })
//   EventBus.$on('getContent', (html: HTMLDocument) => {
//     this.articleContainer = html
//   })
// }
/** 获取文章分类 */
const queryArticleCategory = async () => {
  const result = await queryArticleCategory_API({ level: 2 })
  if (result.code === ResultCodeEnum.success) state.categoryData = result.data
  else ElMessage.error(result.msg)
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
