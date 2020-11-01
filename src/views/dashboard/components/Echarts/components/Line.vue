<template>
    <div ref="echartsLine" :style="{ height }"></div>
</template>
<script>
import Echarts from 'echarts'
import mixins from './mixins'
export default {
    props: {
        height: {
            type: String,
            default: '400px',
        },
        // Ecahrts 数据
        EchartsLineData: {
            type: Array,
            default: () => [],
        },
        // Ecahrts 标题
        EchartsTitle: {
            type: String,
            default: '统计-折线图',
        },
    },
    mixins: [mixins],
    data() {
        return {}
    },
    created() {},
    mounted() {
        this.init_Line()
    },
    methods: {
        // 初始化
        init_Line() {
            this.EchartsDom = Echarts.init(this.$refs.echartsLine, 'westeros')
            this.EchartsDom.setOption({
                title: {
                    text: this.EchartsTitle,
                },
                legend: {
                    data: this.EchartsLineData.map((item) => {
                        return item.name
                    }),
                },
                tooltip: {
                    trigger: 'axis',
                },
                xAxis: {
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                },
                yAxis: {},
                series: this.EchartsLineData.map((item) => {
                    item.smooth = true
                    return item
                }),
            })
        },
    },
    watch: {
        EchartsLineData() {
            this.EchartsDom.clear()
            this.init_Line()
        },
    }
}
</script>

<style lang="scss" scoped>
</style>
