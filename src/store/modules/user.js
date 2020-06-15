/* eslint-disable */
import {userInfoApi} from "@api/user"
import { setCookie,getCookie } from "@/utils/cookies"
import { deepClone } from "@/utils/config"
import {constantRoutes, asyncRoutes, resetRouter} from "@/router"
/**
 * 将后台传递的路由格式和本地的路由对比
 * @param {asyncRoutes} asyncRoutes  本地路由需要权限的数据
 * @param {dataRouter} dataRouter  从后台获取的路由数据
 */
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
    const getRouterList = deepClone(constantRoutes)
    // 1. 首先获取 404 页面, 从当前的路由中剔除
    const get404_Page = getRouterList.splice(getRouterList.length - 1, 1)
    // 2. 最后拼接 404 页面
    const RouterArr = [...getRouterList, ...getAsyncRouter, ...get404_Page]
    resetRouter(RouterArr)
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
        state.avatar = userInfo.avatar
        state.nickname = userInfo.nickname
        state.Need_refresh = false 
    },
    // 设置用户动态路由
    SET_ROUTER_LIST(state,list) {
        state.RouList = list
    }
}
const actions = {
    // 用户登陆 获取用户信息 路由信息
    ACT_userInfo({ commit }, data) {
        return new Promise((resolve) => {
            // 存入 token
            setCookie("token", data.userInfo.token)
            setCookie("user_id", data.userInfo.id)
            commit("SET_USER_INFO", data.userInfo)
            const getList = creatRouter(asyncRoutes, data.routerList)
            commit("SET_ROUTER_LIST",getList)
            resolve(getList)
        })
    },
    // 页面刷新 重新获取用户信息, 路由信息
    ACT_findByIDUser({commit}) {
        return new Promise(async (resolve) => {
            const userId = getCookie("user_id")
            const params = {
                userId
            }
            const { data } = await userInfoApi(params)
            commit("SET_USER_INFO", data.userInfo)
            const getList = creatRouter(asyncRoutes, data.routerList)
            commit("SET_ROUTER_LIST",getList)
            resolve(getList)
        })
    }
}
export default {
    namespaced: true, // 之后在不同页面中引入getter、actions、mutations时，需要加上所属的模块名
    state,
    mutations,
    actions
}