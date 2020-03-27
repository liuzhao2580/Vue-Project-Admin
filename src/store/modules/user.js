import {userInfoApi} from "@/api/user"
import { setCookie,getCookie } from "@/utils/cookies"
const state = {
    avatar: "",
    nickname: "",
    Need_refresh: true // 判断是否刷新页面 false 否 true 是
}
const mutations = {
    // 设置用户基本数据
    SET_USER_INFO(state, userInfo) {
        state.avatar = userInfo.avatar_url
        state.nickname = userInfo.nickname
        state.Need_refresh = false 
    }
}
const actions = {
    ACT_userInfo({ commit }, {data}) {
        return new Promise((resolve) => {
            // 存入 token
            setCookie("token", data.token)
            setCookie("user_id", data.userInfo._id)
            commit("SET_USER_INFO", data.userInfo)
            resolve()
        })
    },
    // 获取指定的用户信息
    ACT_findByIDUser({commit}) {
        const user_id = getCookie("user_id")
        const params = {
            user_id
        }
        userInfoApi(params).then(({data})=> {
            commit("SET_USER_INFO", data.data)
        }).catch(err => {
            console.log(err)
        })
    }
}
export default {
    namespaced: true, // 之后在不同页面中引入getter、actions、mutations时，需要加上所属的模块名
    state,
    mutations,
    actions
}