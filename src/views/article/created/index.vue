<template>
  <el-row :gutter="20" class="article-created-box">
    <!-- 当页面的宽度 为 768 px的时候隐藏 -->
    <el-col :sm="24">
      <big-screen-title></big-screen-title>
    </el-col>
    <el-col :xs="24" :sm="24">
      <content-editor></content-editor>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import ContentEditor from './components/Content-editor.vue'
import BigScreenTitle from './components/Big-screen-title.vue'
import { RouterName } from '@/router/RouteConst'
</script>

<script>
export default {
  name: RouterName.ARTICLE_CREATE
}
</script>

<style lang="scss" scoped></style>
