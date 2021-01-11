<template>
    <div class="AppMain-box">
        <transition name="fade-transition" mode="out-in">
            <keep-alive :include="keepAliveRoutes">
                <router-view />
            </keep-alive>
        </transition>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { RouteConfig } from 'vue-router'
import { namespace } from 'vuex-class'
const App_VUEX = namespace('user')
@Component({
    name: 'AppMain'
})
export default class AppMain extends Vue {
    @App_VUEX.Getter sideBarList: any

    /** 设置缓存路由 */
    keepAliveRoutes: Array<string | undefined> = []

    created() {
        this.init()
    }

    /** 获取 路由中的数据 判断meta中 keepAlive 是否为true */
    init() {
        const getKeepAlive: Array<string | undefined> = []
        function loopRoutes(listArr: RouteConfig[]) {
            listArr.forEach((item) => {
                if (item.meta && item.meta.keepAlive) {
                    getKeepAlive.push(item.name)
                } else if (item.children) {
                    loopRoutes(item.children)
                }
            })
        }
        loopRoutes(this.sideBarList)
        this.keepAliveRoutes = getKeepAlive
    }
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
