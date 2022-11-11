import { defineStore } from 'pinia'
import { StoreAppModel } from '@/typescript/store'
import { reactive } from 'vue'

export const useAppStore = defineStore('app', () => {
  const appState = reactive(new StoreAppModel())
  /**  侧边栏状态 展开 或者 折叠 */
  function changeSideStatus() {
    appState.side_status = !appState.side_status
  }
  /** 折叠侧边栏 */
  function flodSide() {
    appState.side_status = true
  }
  /** 展开侧边栏 */
  function unFlodSide() {
    appState.side_status = false
  }
  /** 设置 设备类型 */
  function setDevice(type: boolean) {
    appState.isMobile = type
  }

  return { appState, changeSideStatus, flodSide, unFlodSide, setDevice }
})
