import { StoreTagsViewModel } from '@/typescript/store'
import { TAGS_VIEW_MUTATIONS_TYPES } from './types'
const state = new StoreTagsViewModel()
const mutations = {
  [TAGS_VIEW_MUTATIONS_TYPES.MUT_INIT_TAGS](state: StoreTagsViewModel, tags: any) {
    state.tagsArray = tags
  },
  [TAGS_VIEW_MUTATIONS_TYPES.MUT_INSERT_TAGS](state: { tagsArray: any[] }, tags: any) {
    // 判断 当前的 tags 中是否已经存在当前的 路由名称
    const is_push = state.tagsArray.some((item: any) => {
      return item.meta.title === tags.meta.title
    })
    // 如果 is_push == true 说明存在, 不应该再次添加tags
    if (is_push) return false
    state.tagsArray.push(tags)
  }
}
export default {
  namespaced: true,
  state,
  mutations
}
