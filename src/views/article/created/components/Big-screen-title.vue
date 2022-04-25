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
      <el-button type="primary" :disabled="disabled" @click="state.dialogVisible = true"
        >预览</el-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { queryArticleCategory_API } from '@/api/modules/article'
import { ResultCodeEnum } from '@/typescript/shared/enum'
/** 大屏幕 下的 标题 */
interface IState {
  /** 文章标题 */
  titleValue: string
  /** 文章内容 */
  articleContainer: string
  /** 预览内容弹出框 */
  dialogVisible: boolean
}
const state = reactive<IState>({
  titleValue: '',
  articleContainer: '',
  dialogVisible: false
})

/** 预览按钮禁用 */
const disabled = computed(() => {
  let flag = false
  if (!state.titleValue) flag = true
  return flag
})
onMounted(() => {
  queryArticleCategory()
})
/** 获取文章分类 */
const queryArticleCategory = async () => {
  const result = await queryArticleCategory_API({ level: 2 })
  if (result.code === ResultCodeEnum.success) state.categoryData = result.data
  else ElMessage.error(result.msg)
}
</script>

<style lang="scss" scoped>
$headerHeight: 40px;
.big-screen-title {
  border-radius: 5px;
  display: flex;
  height: $headerHeight;
  margin-bottom: 20px;
  .title-input {
    margin-bottom: 10px;
    width: 90%;
    margin-right: 10px;
    height: $headerHeight;
    .article-title {
      font-size: 24px;
      font-weight: 900;
      height: $headerHeight;
    }
  }
  // 预览按钮
  .button-box {
    flex: 1;
    .el-button {
      width: 100%;
      height: $headerHeight;
    }
  }
}
</style>
