export default {
    data() {
        return {
            EchartsDom: null
        }
    },
    mounted() {
        // 监听屏幕变化
        window.addEventListener('resize',() => {
            this.EchartsDom.resize()
        })
    },
    beforeDestroy() {
        window.removeEventListener('resize',() => {
            this.EchartsDom.resize()
        })
        // 销毁Echarts
        this.EchartsDom.dispose()
    }
}