/*eslint-disable*/
const state = {
    // 存放 tags 的数组
    tagsArray: [],
    // 初始化
    init_Tags: []
}
const mutations = {
    SET_TAGS(state, tags) {
        state.tagsArray.push(tags)
    },
    SET_INIT_TAGS(state) {
        state.init_Tags = state.tagsArray
    }
}
const actions = {
    // 初始化 tags
    ACT_initTags({ commit }) {
        // console.log(state.init_Tags)
        
        commit("SET_INIT_TAGS")
    },
    // 新增 tags
    ACT_setTags({ commit }, tags) {
        // 判断 当前的 tags 中是否已经存在当前的 路由名称
        const is_push = state.tagsArray.some(item => {
            return item.meta.title == tags.meta.title
        })
        // 如果 is_push == true 说明存在, 不应该再次添加tags
        if (is_push) return false
        commit("SET_TAGS", tags)
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}