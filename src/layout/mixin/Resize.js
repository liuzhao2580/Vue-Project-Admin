import store from "@/store"
const { body } = document
// 设置一个宽度的大小, 用来判断当前的侧边栏展开折叠
const WIDTH = 992

export default {
    beforeMount() {
        // 页面进来的时候监听 屏幕的变化  调用方法
        window.addEventListener('resize', this.$_ResizeScreen)
    },
    beforeDestroy() {
        // 页面销毁的时候移除监听 屏幕的变化  调用方法
        window.removeEventListener('resize', this.$_ResizeScreen)
    },
    created() {
        this.$_ResizeScreen()
    },
    methods: {
        $_isMobile() {
            const react = body.getBoundingClientRect()
            if(react.width < 768) store.dispatch('app/Act_setDevice','mobile')
            else store.dispatch('app/Act_setDevice','desktop')
            return react.width - 1 < WIDTH
        },
        $_ResizeScreen() {
            const side_flag = this.$_isMobile()
            if (side_flag) {
                store.dispatch("app/Act_flodSide")
            } else if (!side_flag){
                store.dispatch("app/ACT_unflodSide")
            }
        }
    },
}