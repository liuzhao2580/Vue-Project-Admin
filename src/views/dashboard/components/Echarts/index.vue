<template>
    <el-row>
        <el-col :span="24">
            <Echarts-line :EchartsLineData='EchartsData.line'/>
        </el-col>
        <el-col :lg="12" :sm="24">
            <Echarts-bar :EchartsBarData='EchartsData.bar'/>
        </el-col>
        <el-col :lg="12" :sm="24">
            <Echarts-pie :EchartsPieData='EchartsData.pie'/>
        </el-col>
    </el-row>
</template>

<script>
import EchartsLine from './components/Line'
import EchartsBar from './components/Bar'
import EchartsPie from './components/Pie'
export default {
  props: {
    EchartsData: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    EchartsLine,
    EchartsBar,
    EchartsPie,
  },
  data() {
    return {}
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style lang="scss" scoped>
</style>