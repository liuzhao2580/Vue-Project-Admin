import { defineStore } from "pinia"
import { reactive } from "vue"
import { StoreTagsViewModel } from "@/typescript/store"
import { ITagsView } from "@/typescript/shared/interface"

export const useTagsViewStore = defineStore("tagsView", () => {
  const state = reactive(new StoreTagsViewModel())

  /** 初始化 tags */
  function initTags(tags: ITagsView[]) {
    state.tagsArray = tags
  }

  /** 新增 tags */
  function insertTags(tags: ITagsView) {
    // 判断 当前的 tags 中是否已经存在当前的 路由名称
    const is_push = state.tagsArray.some((item: ITagsView) => {
      return item.meta?.title === tags.meta?.title
    })
    // 如果 is_push == true 说明存在, 不应该再次添加tags
    if (is_push) return false
    state.tagsArray.push(tags)
  }

  return {
    state,
    initTags,
    insertTags
  }
})
