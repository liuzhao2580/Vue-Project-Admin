import { StoreAppModel } from '@/typescript/store'
import { APP_MUTATIONS_TYPES } from './types'
const state = new StoreAppModel()
const mutations = {
  // 侧边栏状态 展开 或者 折叠
  [APP_MUTATIONS_TYPES.MUT_CHANGE_SIDESTATUS](state: { side_status: boolean }) {
    state.side_status = !state.side_status
  },
  // 折叠侧边栏
  [APP_MUTATIONS_TYPES.MUT_FLOD_SIDE](state: { side_status: boolean }) {
    state.side_status = true
  },
  // 展开侧边栏
  [APP_MUTATIONS_TYPES.MUT_UNFLOD_SIDE](state: { side_status: boolean }) {
    state.side_status = false
  },
  // 设置 设备类型
  [APP_MUTATIONS_TYPES.MUT_SET_DEVICE](state: { isMobile: any }, type: any) {
    state.isMobile = type
  }
}
export default {
  namespaced: true, // 之后在不同页面中引入getter、actions、mutations时，需要加上所属的模块名
  state,
  mutations
}
