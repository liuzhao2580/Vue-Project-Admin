<template>
  <div class="breadcrumb-box">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="hidden-xs-only">
      <el-breadcrumb-item :to="{ path: RouterPath.DASHBOARD }">{{
        breadcrumbTitle
      }}</el-breadcrumb-item>
      <!--面包屑的切换动画 -->
      <transition-group
        name="breadcrumb-transition"
        mode="out-in"
        v-if="getMatched.length !== 0"
      >
        <el-breadcrumb-item
          v-for="item in getMatched"
          :key="item.path"
          :to="handleClick(item)"
          >{{ item.meta.title }}</el-breadcrumb-item
        >
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { RouterConfig, RouterPath } from '@/router/RouteConst'
import { computed, ref, watchEffect } from 'vue'
import { RouteLocationMatched, RouteRecordRaw, useRoute } from 'vue-router'
import defaultConfig from '@/setting'

const route = useRoute()
const breadcrumbTitle = computed(() => {
  return defaultConfig.title
})
const getMatched = ref<RouteLocationMatched[]>()
const init = () => {
  const nowRoute = route.matched
  getMatched.value = nowRoute.filter(item => {
    // 说明存在多级路由
    if (item.meta && item.meta.title) {
      // 用于判断 当前页面是否在首页
      if (item.path === '/dashboard') return false
      // 用于判断当前的路由是否显示在面包屑中
      else if (item.meta.breadcrumb === false) return false
      return true
    }
  })
}
// 面包屑点击
const handleClick = (item : RouteRecordRaw) => {
  // 用于判断当前的面包屑是否可以点击跳转
  if (item.redirect !== RouterConfig.NoRedirect) {
    return {
      path: item.path
    }
  }
}

watchEffect(
  () => init()
)
</script>

<script lang="ts">
export default {
  name: 'BreadcrumbCom'
}
</script>

<style lang="scss" scoped>
/*---------------------------------面包屑的过度动画----------------------- */
.breadcrumb-transition-enter,
.breadcrumb-transition-leave {
  opacity: 0.2;
}
.breadcrumb-transition-enter {
  opacity: 0;
  transform: translateX(50px);
}
.breadcrumb-transition-leave {
  opacity: 0;
  transform: translateX(-50px);
}
.breadcrumb-transition-enter-active,
.breadcrumb-transition-leave-active {
  transition: 0.7s;
}
/*---------------------------------面包屑的过度动画----------------------- */
</style>
