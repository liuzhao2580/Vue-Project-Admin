const state = {
    side_status: false, // 侧边栏状态 展开 false 或者 折叠 true
    isMobile: false, // 当前的 设备 默认 false desktop 桌面  true mobile 移动端
}
const mutations = {
    // 侧边栏状态 展开 或者 折叠
    CHANGE_SIDESTATUS(state: { side_status: boolean }) {
        // let status = localStorage.getItem('side_status') ? localStorage.getItem('side_status') : false
        // status === 'false' ? status = false : status = true
        // console.log(status)
        state.side_status = !state.side_status
        // localStorage.setItem('side_status', state.side_status)
    },
    // 折叠侧边栏
    FLOD_SIDE(state: { side_status: boolean }) {
        state.side_status = true
    },
    // 展开侧边栏
    UNFLOD_SIDE(state: { side_status: boolean }) {
        state.side_status = false
    },
    // 设置 设备类型
    Mut_setDevice(state: { isMobile: any }, type: any) {
        state.isMobile = type
    },
}
const actions = {
    // 侧边栏状态 展开 或者 折叠
    change_SideStatus({ commit }: any) {
        commit("CHANGE_SIDESTATUS")
    },
    // 折叠侧边栏
    Act_flodSide({ commit }: any) {
        commit("FLOD_SIDE")
    },
    // 展开侧边栏
    ACT_unflodSide({ commit }: any) {
        commit("UNFLOD_SIDE")
    },
    // 设置 设备类型
    Act_setDevice({ commit }: any, type: any) {
        commit("Mut_setDevice", type)
    },
}

const getters = {
    side_status: (state: { side_status: any }) => state.side_status,
    isMobile: (state: { isMobile: any }) => state.isMobile,
}
export default {
    namespaced: true, // 之后在不同页面中引入getter、actions、mutations时，需要加上所属的模块名
    state,
    mutations,
    actions,
    getters,
}
