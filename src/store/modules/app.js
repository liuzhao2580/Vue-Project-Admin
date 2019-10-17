const state = {
    side_status: false, // 侧边栏状态 展开 或者 折叠
}
const mutations = {
    // 侧边栏状态 展开 或者 折叠
    CHANGE_SIDESTATUS(state) {
        state.side_status = !state.side_status
    }
}
const actions = {
    // 侧边栏状态 展开 或者 折叠
    change_SideStatus({ commit }) {
        commit("CHANGE_SIDESTATUS")
    }
}
export default {
    namespaced: true, // 之后在不同页面中引入getter、actions、mutations时，需要加上所属的模块名
    state,
    mutations,
    actions
}