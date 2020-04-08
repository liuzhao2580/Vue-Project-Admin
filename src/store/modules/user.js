import {userInfoApi} from "@/api/user"
import { setCookie,getCookie } from "@/utils/cookies"
import { deepClone } from "@/utils/config"
import {constantRoutes, asyncRoutes,resetRouter} from "@/router"
// import Router from "@/router"
// 将后台传递的路由格式和本地的路由对比
const getRouter = (asyncRoutes, dataRouter) => {
    let arr = []
    dataRouter.forEach(dataItem => {
        asyncRoutes.forEach(asyncItem => {
            // 说明存在子路由
            if(dataItem.hasOwnProperty("children")) {
                if(dataItem.path === asyncItem.path) {
                    let getArr = getRouter(asyncItem.children, dataItem.children)
                    let deepRouter = deepClone(asyncItem)
                    deepRouter.children = getArr
                    arr.push(deepRouter)
                }
            }
            // 说明不存在子路由 
            else {
                if(asyncItem.path === dataItem.path){
                    arr.push(asyncItem)
                }
            }
        })
    })
    return arr
}
// 整理成为新的路由
const creatRouter = (asyncRoutes, routerList) => {
    const getAsyncRouter = getRouter(asyncRoutes, routerList)
    const RouterArr = [...constantRoutes, ...getAsyncRouter]
    resetRouter()
    return RouterArr
}
const state = {
    RouList: [], // 路由
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
    },
    // 设置用户动态路由
    SET_ROUTER_LIST(state,list) {
        state.RouList = list
    }
}
const actions = {
    ACT_userInfo({ commit }, {data}) {
        return new Promise((resolve) => {
            // 存入 token
            setCookie("token", data.token)
            setCookie("user_id", data.userInfo._id)
            commit("SET_USER_INFO", data.userInfo)
            const getList = creatRouter(asyncRoutes, data.userInfo.routerList)
            commit("SET_ROUTER_LIST",getList)
            resolve()
        })
    },
    // 获取用户信息, 路由信息
    async ACT_findByIDUser({commit}) {
        const user_id = getCookie("user_id")
        const params = {
            user_id
        }
        const {data} = await userInfoApi(params)
        commit("SET_USER_INFO", data.data)
        const getList = creatRouter(asyncRoutes, data.data.routerList)
        commit("SET_ROUTER_LIST",getList)
    }
}
export default {
    namespaced: true, // 之后在不同页面中引入getter、actions、mutations时，需要加上所属的模块名
    state,
    mutations,
    actions
}