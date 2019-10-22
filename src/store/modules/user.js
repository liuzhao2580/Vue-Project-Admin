const state = {
    user_img: require("@/assets/images/welcom.gif"),
    user_name: "小火车况且况且"
}
const mutations = {

}
const actions = {

}
export default {
    namespaced: true, // 之后在不同页面中引入getter、actions、mutations时，需要加上所属的模块名
    state,
    mutations,
    actions
}