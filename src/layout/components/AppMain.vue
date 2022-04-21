<template>
  <div class="AppMain-box">
    <transition name="fade-transition" mode="out-in">
      <keep-alive :include="keepAliveRoutes">
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { RouteRecordRaw } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { useStore } from '@/store'

const store = useStore()

/** 设置缓存路由 */
const keepAliveRoutes = ref<string[]>([])

const sideBarList = computed((): RouteRecordRaw[] => {
  return store.state.user.sideBarList
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
  name: 'AppMain'
}
</script>

<style lang="scss" scoped>
.AppMain-box {
  > div {
    height: 100%;
  }
}
/* --------------------------------路由的过渡动画 --------------------------*/
.fade-transition-enter,
.fade-transition-leave {
  opacity: 0.2;
}
// 定义进入过渡的开始状态。在元素被插入时生效，在下一个帧移除。
.fade-transition-enter {
  opacity: 0;
  transform: translateX(30px);
}
// 定义离开过渡的开始状态。在离开过渡被触发时生效，在下一个帧移除。
.fade-transition-leave {
  opacity: 0;
  transform: translateX(-30px);
}
// 定义进入过渡的结束状态。在元素被插入时生效，在transition/animation完成之后移除。
// 定义离开过渡的结束状态。在离开过渡被触发时生效
.fade-transition-enter-active,
.fade-transition-leave-active {
  transition: 0.5s;
}
</style>
