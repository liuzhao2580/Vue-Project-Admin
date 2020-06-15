const state = {
    side_status: false, // 侧边栏状态 展开 false 或者 折叠 true 
}
const mutations = {
    // 侧边栏状态 展开 或者 折叠
    CHANGE_SIDESTATUS(state) {
        // let status = localStorage.getItem('side_status') ? localStorage.getItem('side_status') : false
        // status === 'false' ? status = false : status = true
        // console.log(status)
        state.side_status = !state.side_status
        // localStorage.setItem('side_status', state.side_status)
    },
    // 折叠侧边栏
    FLOD_SIDE(state) {
        state.side_status = true
    },
    // 展开侧边栏
    UNFLOD_SIDE(state) {
        state.side_status = false
    }
}
const actions = {
    // 侧边栏状态 展开 或者 折叠
    change_SideStatus({ commit }) {
        commit("CHANGE_SIDESTATUS")
    },
    // 折叠侧边栏
    Act_flodSide({ commit }) {
        commit("FLOD_SIDE")
    },
    // 展开侧边栏
    ACT_unflodSide({ commit }) {
        commit("UNFLOD_SIDE")
    }
}
export default {
    namespaced: true, // 之后在不同页面中引入getter、actions、mutations时，需要加上所属的模块名
    state,
    mutations,
    actions
}