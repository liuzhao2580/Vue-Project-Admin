<template>
  <div ref="echartsBar" :style="{ height }"></div>
</template>

<script lang="ts" setup>
import { defineProps, nextTick, watch, withDefaults, ref, onMounted } from 'vue'
import Echarts, { LegendComponentOption } from 'echarts'
import EchartMixins from './mixins'

interface IProps {
  height?: string
  echartsBarData: LegendComponentOption[]
  echartsTitle?: string
}
const props = withDefaults(defineProps<IProps>(), {
  height: '400px',
  echartsTitle: '统计-柱形图'
})
const { EchartsDom } = EchartMixins()

const echartsBar = ref<HTMLDivElement>()

onMounted(()=> {
  nextTick(() => {
    init_Bar()
  })
})

const init_Bar = () => {
  EchartsDom.value = Echarts.init(echartsBar.value as HTMLDivElement, 'westeros')
  EchartsDom.value.setOption({
    title: {
      text: props.echartsTitle
    },
    legend: {
      data: props.echartsBarData.map(item => {
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
    series: props.echartsBarData.map(item => {
      return item
    })
  })
}

watch(props.echartsBarData, () => {
  EchartsDom.value?.clear()
  init_Bar()
})
</script>

<script>
export default {
  name: 'BarCom'
}
</script>

<style lang="scss" scoped></style>
