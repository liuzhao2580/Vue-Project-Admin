<template>
    <div ref="echartsPie" :style="{ height }"></div>
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
        EchartsPieData: {
            type: Array,
            default: () => [],
        },
        // Ecahrts 标题
        EchartsTitle: {
            type: String,
            default: '统计-饼图',
        },
    },
    mixins: [mixins],
    data() {
        return {
            EchartsDom: null
        }
    },
    created() {},
    mounted() {
        this.init_Pie()
    },
    methods: {
        // 初始化
        init_Pie() {
            this.EchartsDom = Echarts.init(this.$refs.echartsPie)
            this.EchartsDom.setOption({
                title: {
                    text: this.EchartsTitle,
                },
                legend: {
                    data: this.EchartsPieData.map((item) => {
                        return item.name
                    }),
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)',
                },
                series: {
                    name: this.EchartsTitle,
                    type: 'pie',
                    data: this.EchartsPieData,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                        },
                    },
                },
            })
        },
    },
    watch: {
        EchartsPieData() {
            this.EchartsDom.clear()
            this.init_Pie()
        },
    },
}
</script>

<style lang="scss" scoped>
</style>
