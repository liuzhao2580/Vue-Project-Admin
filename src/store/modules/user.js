const state = {
    user_img: require("@/assets/images/welcom.gif"),
    user_name: "小火车况且况且",
    user_token: ""
}
const mutations = {
    // 设置用户基本数据
    SET_USER_INFO(state, userInfo) {
        state.user_img = userInfo.user_img
        state.user_name = userInfo.user_name
        state.user_token = userInfo.user_token
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