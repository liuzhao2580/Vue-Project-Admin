<template>
  <div class="Navbar-box">
    <div class="Navbar-Breadcrumb">
      <div class="side-btn hidden-xs-only" @click="sideBtn">
        <el-icon><Operation /></el-icon>
      </div>
      <Breadcrumb />
      <Personal />
    </div>
    <TagsView />
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/store'
import Breadcrumb from '../Breadcrumb/index.vue'
import TagsView from '../TagsView/index.vue'
import Personal from '../Personal/index.vue'
import { APP_MUTATIONS_TYPES } from '@/store/modules/app/types'
import { Operation } from '@element-plus/icons-vue'

const store = useStore()
// 侧边栏按钮点击事件
const sideBtn = () => {
  store.commit(APP_MUTATIONS_TYPES.MUT_CHANGE_SIDESTATUS)
}
</script>

<script lang="ts">
export default {
  name: 'NavBar'
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
