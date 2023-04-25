<template v-if="!item.meta.hidden">
  <!-- 首先判断 当级路由下不存在多级路由 -->
  <el-menu-item
    v-if="checkMoreRouter(item)"
    :index="item.path"
  >
    <SvgIcon :icon="item.meta?.icon" />
    <template #title>
      <span class="menu-title">{{ item.meta?.title }}</span>
    </template>
  </el-menu-item>
  <!-- 当级路由下存在多级路由 -->
  <el-sub-menu
    v-else
    :index="item.path"
    :class="[{ MenuitemClass: side_status && !isMoreChild }]"
  >
    <template #title>
      <SvgIcon :icon="item.meta?.icon" />
      <span class="menu-title">{{ item.meta?.title }}</span>
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
import { useAppStore } from "@/store/app"
import { computed } from "vue"
import { RouteRecordRaw } from "vue-router"
// 引入 path 模块 用于拼接url地址

const appStore = useAppStore()
interface IProps {
  item: RouteRecordRaw
  isMoreChild?: boolean
}

withDefaults(defineProps<IProps>(), {
  isMoreChild: false
})

const side_status = computed(() => {
  return appStore.state.side_status
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
  name: "SidebarItem"
}
</script>

<style lang="scss">
.menu-title {
  margin-left: 10px;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 120px;
}
.icon-svg {
  svg {
    fill: var(--lz-text-color);
  }
}
</style>
