<template>
  <div class="app-main-box">
    <router-view v-slot="{ Component }">
      <keep-alive :include="keepAliveRoutes">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { RouteRecordRaw } from "vue-router"
import { computed, onMounted, ref } from "vue"
import { useUserStore } from "@/store/user"

const store = useUserStore()

/** 设置缓存路由 */
const keepAliveRoutes = ref<string[]>([])

const sideBarList = computed((): RouteRecordRaw[] => {
  return store.state.sideBarList
})

onMounted(() => {
  init()
})

/** 获取 路由中的 数据 判断meta中 keepAlive 是否为true */
const init = () => {
  const getKeepAlive: string[] = []
  function loopRoutes(listArr: RouteRecordRaw[]) {
    listArr.forEach(item => {
      if (item.meta && item.meta.keepAlive) {
        getKeepAlive.push(item.name as string)
      } else if (item.children) {
        loopRoutes(item.children)
      }
    })
  }
  loopRoutes(sideBarList.value)
  keepAliveRoutes.value = getKeepAlive
}
</script>

<script lang="ts">
export default {
  name: "AppMain"
}
</script>

<style lang="scss" scoped>
.app-main-box {
  position: relative;
  width: 100%;
  > div {
    height: 100%;
  }
}
</style>
