/* eslint-disable */
import {userInfoApi} from "@api/user"
import { setCookie,getCookie } from "@/utils/cookies"
import { deepClone } from "@/utils/config"
import router, {constantRoutes, asyncRoutes, resetRouter} from "@/router"
import { reject } from "core-js/fn/promise"
/**
 * 将后台传递的路由格式和本地的路由对比
 * @param {asyncRoutes} asyncRoutes  本地路由需要权限的数据
 * @param {dataRouter} dataRouter  从后台获取的路由数据
 */
// 判断当前的路由是否存在权限 如该用户可以访问该页面就返回true 否则返回false
const hasPrimission = (route, roleId) => {
    return route.meta.roles.includes(roleId)
}
// 根据roleId 整理成为新的路由
const creatRouter = (routes, roleId) => {
    let routesArr = []
    routes.children.forEach(item => {
        // 说明需要根据权限展示页面
        if(item.meta.roles) {
            // 1. 首先判断该用户是否可以访问该页面
            if(hasPrimission(item, roleId)) {
                // 2. 再判断 该页面是否存在子路由
                // 2.1 该用户有子路由，使用递归判断子路由是否可以访问
                if(item.children) {
                    const getChildrenRouter = creatRouter(item, roleId)
                    routesArr.push({
                        ...item,
                        children: getChildrenRouter 
                    })
                }
                // 2.2 说明该页面没有子路由
                else routesArr.push(item)
            }
        }
        // 说明不需要权限即可展示页面
        else routesArr.push(item)
    })
    return routesArr
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
            // setCookie("token", data.userInfo.token)
            setCookie("user_id", data.userInfo.id)
            setCookie("roleId", data.userInfo.roleId)
            commit("SET_USER_INFO", data.userInfo)
            // const getList = creatRouter(asyncRoutes[0], data.userInfo.roleId)
            try {
                const getList = creatRouter(asyncRoutes[0], 3)
                commit("SET_ROUTER_LIST",getList)
                resolve(getList)
            } catch (error) {
                reject(error)
            }
            
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
            const getList = creatRouter(asyncRoutes[0], data.routerList)
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