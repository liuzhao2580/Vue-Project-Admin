import '../Echarts-theme'
export default {
    data() {
        return {
            EchartsDom: null
        }
    },
    mounted() {
        this.$_init_resize()
    },
    methods: {
        handleResize() {
            if(this.EchartsDom) this.EchartsDom.resize()
        },
        // 监听屏幕变化
        $_init_resize() {
            window.addEventListener('resize',this.handleResize)
        },
        // 移除屏幕变化
        $_destroy_resize() {
            window.removeEventListener('resize',this.handleResize)
        }
    },
    activated() {
        this.handleResize()
        this.$_init_resize()
    },
    deactivated() {
        this.$_destroy_resize()
    },
    beforeDestroy() {
        this.$_destroy_resize()
        // 销毁Echarts
        this.EchartsDom.dispose()
    }
}