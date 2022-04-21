<template>
  <div v-if="!item.meta.hidden" class="SidebarItem-box">
    <!-- 首先判断 当级路由下不存在多级路由 -->
    <template v-if="checkMoreRouter(item)">
      <el-menu-item :index="resolvePath(onlyOneChild.path)">
        <MenuItem
          :icon="onlyOneChild.meta.icon"
          :title="onlyOneChild.meta.title"
        />
      </el-menu-item>
    </template>
    <!-- 当级路由下存在多级路由 -->
    <el-submenu
      v-else
      :index="resolvePath(item.path)"
      popper-append-to-body
      :class="{ MenuitemClass: side_status && !isMoreChild }"
    >
      <template #title>
        <MenuItem
          :icon="onlyOneChild.meta.icon"
          :title="onlyOneChild.meta.title"
        />
      </template>
      <template v-if="item.children">
        <SidebarItem
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :isMoreChild="true"
          :base-path="resolvePath(child.path)"
          class="More-Sildbar"
        />
      </template>
    </el-submenu>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/store'
import { computed, ref } from 'vue'
import { RouteRecordRaw } from 'vue-router'
// 引入 path 模块 用于拼接url地址
import MenuItem from './Item.vue'

const store = useStore()

interface IProps {
  item: RouteRecordRaw
  basePath: string
  isMoreChild: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  basePath: '',
  isMoreChild: false
})

const side_status = computed(() => {
  return store.state.app.side_status
})

const onlyOneChild = ref()
// 用于拼接 url 地址
const resolvePath = (routePath: string) => {
  return routePath
}
/** 判断多级路由 */
const checkMoreRouter = (route: RouteRecordRaw) => {
  // 判断 是否含有多级路由
  // 当 children 存在时, 说明还存在子路由
  if (route.children) {
    onlyOneChild.value = route
    return false
  }
  // 说明当前路由不存在子路由
  else {
    // 如果 isMoreChild 存在 说明当前的路由是通过递归传递的数据
    if (props.isMoreChild) {
      // 重新定义 path
      onlyOneChild.value = { ...route, path: '' }
    }
    // 说明 当前的路由是一级路由
    else {
      onlyOneChild.value = route
    }
    return true
  }
}
</script>

<script lang="ts">
export default {
  name: 'SidebarItem'
}
</script>

<style lang="scss" scoped></style>
