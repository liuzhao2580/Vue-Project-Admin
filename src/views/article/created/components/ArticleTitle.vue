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
      <el-button type="primary" :disabled="disabled" @click="releaseClick"
        >预览</el-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue'
/** 大屏幕 下的 标题 */
interface IState {
  /** 文章标题 */
  titleValue: string
}
const state = reactive<IState>({
  titleValue: ''
})

const emit = defineEmits<{
  (e: 'releaseClick', title: string): void
}>()

/** 预览按钮禁用 */
const disabled = computed(() => {
  let flag = false
  if (!state.titleValue) flag = true
  return flag
})

/** 预览按钮 */
const releaseClick = ()=> {
  emit('releaseClick', state.titleValue)
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
      font-size: 20px;
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
