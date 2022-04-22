import { onActivated, onDeactivated, onMounted, onUnmounted, shallowRef } from 'vue'
import type { ECharts } from 'echarts'

export default () => {
  /** Echarts 的实例 */
  const EchartsInstances = shallowRef<ECharts>()

  onMounted(() => {
    $_init_resize()
  })
  const handleResize = () => {
    if (EchartsInstances.value) EchartsInstances.value.resize()
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
    $_init_resize()
  })

  onDeactivated(() => {
    $_destroy_resize()
  })

  onUnmounted(() => {
    $_destroy_resize()
    // 销毁Echarts
    EchartsInstances.value?.dispose()
  })

  return {
    EchartsInstances
  }
}
