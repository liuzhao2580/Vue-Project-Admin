const state = {
    avatar: require("@/assets/images/welcom.gif"),
    nickname: "小火车况且况且",
    token: ""
}
const mutations = {
    // 设置用户基本数据
    SET_USER_INFO(state, userInfo) {
        state.avatar = userInfo.avatar
        state.nickname = userInfo.nickname
        state.token = userInfo.token
    }
}
const actions = {
    ACT_userInfo({ commit }, userInfo) {
        commit("SET_USER_INFO", userInfo)
    }
}
export default {
    namespaced: true, // 之后在不同页面中引入getter、actions、mutations时，需要加上所属的模块名
    state,
    mutations,
    actions
}