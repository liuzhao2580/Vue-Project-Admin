import '../Echarts-theme'
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
            console.log(1243, '1243')
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