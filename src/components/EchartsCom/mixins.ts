import { onActivated, onDeactivated, onMounted, onUnmounted, ref } from 'vue'
import type { ECharts } from 'echarts'
import './Echarts-theme'

export default () => {
  const EchartsDom = ref<ECharts>()

  onMounted(() => {
    $_init_resize()
  })
  const handleResize = () => {
    if (EchartsDom.value) EchartsDom.value.resize()
  }
  // 监听屏幕变化
  const $_init_resize = () => {
    window.addEventListener('resize', handleResize)
  }
  // 移除屏幕变化
  const $_destroy_resize = () => {
    window.removeEventListener('resize', handleResize)
  }
  onActivated(() => {
    handleResize()
    $_init_resize()
  })

  onDeactivated(() => {
    $_destroy_resize()
  })

  onUnmounted(() => {
    $_destroy_resize()
    // 销毁Echarts
    EchartsDom.value?.dispose()
  })

  return {
    EchartsDom
  }
}
