<template>
  <div :style="{ height }" :id="echartsId"></div>
</template>

<script lang="ts" setup>
import { watch, withDefaults, ref, onMounted, nextTick } from 'vue'
import { init } from 'echarts'
import type { EChartsOption } from 'echarts'
import EchartMixins from './mixins'

interface IProps {
  height?: string
  echartsData: EChartsOption | object
  echartsTitle?: string
}
const props = withDefaults(defineProps<IProps>(), {
  height: '400px',
  echartsTitle: 'Echarts',
  echartsData: () => {
    return {}
  }
})
const { EchartsInstances } = EchartMixins()

const echartsId = `echarts-${
  new Date().getTime() + 10000 * Math.floor(Math.random())
}`

const EchartsDom = ref<HTMLElement>()

onMounted(() => {
  EchartsDom.value = document.querySelector(`#${echartsId}`) as HTMLElement
  nextTick(() => {
    initEcharts()
  })
})

/** 初始化 Echarts */
const initEcharts = () => {
  if (!EchartsInstances.value) {
    EchartsInstances.value = init(EchartsDom.value as HTMLElement)
  }

  EchartsInstances.value.setOption({
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  })
}

watch(props, () => {
  EchartsInstances.value?.clear()
  initEcharts()
  console.log(1234)
})
</script>

<script lang="ts">
export default {
  name: 'EchartsCom'
}
</script>

<style lang="scss" scoped></style>
