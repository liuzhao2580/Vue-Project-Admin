<template>
    <div ref="echartsBar" :style="{ height }"></div>
</template>

<script>
import Echarts from 'echarts'
import mixins from './mixins'
export default {
  props: {
    height: {
      type: String,
      default: '400px'
    },
    // Ecahrts 数据
    EchartsBarData: {
      type: Array,
      default: () => []
    },
    // Ecahrts 标题
    EchartsTitle: {
      type: String,
      default: '统计-柱形图'
    }
  },
  mixins: [mixins],
  data() {
    return {}
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.init_Bar()
    })
  },
  methods: {
    init_Bar() {
      this.EchartsDom = Echarts.init(this.$refs.echartsBar, 'westeros')
      this.EchartsDom.setOption({
        title: {
          text: this.EchartsTitle
        },
        legend: {
          data: this.EchartsBarData.map((item) => {
            return item.name
          })
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center'
        },
        xAxis: {
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {},
        series: this.EchartsBarData.map((item) => {
          item.smooth = true
          return item
        })
      })
    }
  },
  watch: {
    EchartsBarData() {
      this.EchartsDom.clear()
      this.init_Bar()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
