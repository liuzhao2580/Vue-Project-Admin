<template>
	<div class="AppMain-box">
        <transition name="fade-transition" mode="out-in">
            <keep-alive>
                <router-view/>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
export default {
	name: "AppMain",
	components: {},
	props: {},
	data() {
		return {};
	},
	created() {},
	mounted() {},
	methods: {},
	watch: {}
};
</script>

<style lang="scss" scoped>
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
