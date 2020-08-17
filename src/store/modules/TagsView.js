const state = {
    // 存放 tags 的数组
    tagsArray: []
}
const mutations = {
    SET_INIT_TAGS(state, tags) {
        state.tagsArray = tags
    },
    SET_TAGS(state, tags) {
        state.tagsArray.push(tags)
    }
}
const actions = {
    // 初始化 tags 
    ACT_init_Tags({ commit }, tags) {
        commit("SET_INIT_TAGS", tags)
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

const getters = {
    tags_data: state => state.tagsArray
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}