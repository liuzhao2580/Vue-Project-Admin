import { StoreAppModel } from '@/typescript/store'
import { APP_MUTATIONS_TYPES } from './types'
const state = new StoreAppModel()
const mutations = {
  // 侧边栏状态 展开 或者 折叠
  [APP_MUTATIONS_TYPES.MUT_CHANGE_SIDESTATUS](state: StoreAppModel) {
    state.side_status = !state.side_status
  },
  // 折叠侧边栏
  [APP_MUTATIONS_TYPES.MUT_FLOD_SIDE](state: StoreAppModel) {
    state.side_status = true
  },
  // 展开侧边栏
  [APP_MUTATIONS_TYPES.MUT_UNFLOD_SIDE](state: StoreAppModel) {
    state.side_status = false
  },
  // 设置 设备类型
  [APP_MUTATIONS_TYPES.MUT_SET_DEVICE](state: StoreAppModel, type: boolean) {
    state.isMobile = type
  }
}
export default {
  state,
  mutations
}
