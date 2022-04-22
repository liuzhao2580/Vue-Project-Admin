<template v-if="!item.meta.hidden">
  <!-- 首先判断 当级路由下不存在多级路由 -->
  <el-menu-item v-if="checkMoreRouter(item)" :index="item.path">
    <SvgIcon :iconClass="item.meta.icon" />
    <span class="menu-title">{{ item.meta.title }}</span>
  </el-menu-item>
  <!-- 当级路由下存在多级路由 -->
  <el-sub-menu
    v-else
    :index="item.path"
    :class="{ MenuitemClass: side_status && !isMoreChild }"
  >
    <template #title>
      <SvgIcon :iconClass="item.meta.icon" />
      <span class="menu-title">{{ item.meta.title }}</span>
    </template>
    <template v-if="item.children">
      <SidebarItem
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :isMoreChild="true"
      />
    </template>
  </el-sub-menu>
</template>

<script lang="ts" setup>
import { useStore } from '@/store'
import { computed } from 'vue'
import { RouteRecordRaw } from 'vue-router'
// 引入 path 模块 用于拼接url地址

const store = useStore()

interface IProps {
  item: RouteRecordRaw
  isMoreChild?: boolean
}

withDefaults(defineProps<IProps>(), {
  isMoreChild: false
})

const side_status = computed(() => {
  return store.state.app.side_status
})

/** 判断多级路由 */
const checkMoreRouter = (route: RouteRecordRaw) => {
  // 判断 是否含有多级路由
  // 当 children 存在时, 说明还存在子路由
  if (route.children) return false
  // 说明当前路由不存在子路由
  else return true
}
</script>

<script lang="ts">
export default {
  name: 'SidebarItem'
}
</script>

<style lang="scss" scoped>
.menu-title {
  margin-left: 10px;
}
</style>
