/* eslint-disable @typescript-eslint/no-explicit-any */
import { ElMessage } from 'element-plus'
import { StoreUserModel } from '@/typescript/store'
import { USER_MUTATIONS_TYPES, USER_ACTIONS_TYPES } from './types'
import { userInfoApi } from '@/api/modules/user'
import { setCookie, getCookie, removeCookie } from '@/utils/cookies'
import { deepClone } from '@/utils/config'
import { asyncRoutes, resetRouter } from '@/router'
import { IUserBaseInfo } from '@/typescript/shared/interface/user-interface'
import { ResultCodeEnum } from '@/typescript/shared/enum'
// 定义一个接受的参数，避免 在请求拦截的时候出现 Message undefined 报错问题
const _Message = ElMessage
/**
 * 将后台传递的路由格式和本地的路由对比
 * @param {asyncRoutes} asyncRoutes  本地路由需要权限的数据
 * @param {dataRouter} dataRouter  从后台获取的路由数据
 */
// 判断当前的路由是否存在权限 如该用户可以访问该页面就返回true 否则返回false
const hasPrimission = (
  route: { meta: { roles: string | any[] } },
  roleId: any
) => {
  return route.meta.roles.includes(roleId)
}
// 根据roleId 整理成为新的路由
const creatRouter = (routes: any, roleId: any) => {
  const routesArr: any[] = []
  routes.children.forEach((item: { meta: { roles: any }; children: any }) => {
    // 说明需要根据权限展示页面
    if (item.meta.roles) {
      // 1. 首先判断该用户是否可以访问该页面
      if (hasPrimission(item, roleId)) {
        // 2. 再判断 该页面是否存在子路由
        // 2.1 该用户有子路由，使用递归判断子路由是否可以访问
        if (item.children) {
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
const state = new StoreUserModel()
const mutations = {
  // 设置用户基本数据
  [USER_MUTATIONS_TYPES.MUT_USER_INFO](
    state: StoreUserModel,
    userInfo: IUserBaseInfo
  ) {
    state.avatar = userInfo.avatar as string
    state.nickname = userInfo.nickName as string
    state.token = userInfo.token as string
  },
  // 设置用户动态路由
  [USER_MUTATIONS_TYPES.MUT_SET_ROUTER_LIST](state: StoreUserModel, list: any) {
    state.sideBarList = list
  },
  // 设置 Need_refresh 用来更新 Need_refresh
  [USER_MUTATIONS_TYPES.MUT_NEED_REFRESH](state: StoreUserModel, flag: any) {
    state.Need_refresh = flag
  }
}
const actions = {
  // 用户登陆 获取用户信息 路由信息
  [USER_ACTIONS_TYPES.ACT_FETCH_USERINFO](
    { commit }: any,
    data: IUserBaseInfo
  ) {
    return new Promise<void>((resolve, reject) => {
      // 存入 token
      setCookie('token', data.token as string)
      setCookie('userId', data.id as string)
      data.roleId && setCookie('roleId', data.roleId.toString())
      commit(USER_MUTATIONS_TYPES.MUT_USER_INFO, data)
      try {
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  },
  // 页面刷新 重新获取用户信息, 路由信息
  [USER_ACTIONS_TYPES.ACT_FETCH_FIND_BY_USERID]({ commit }: any) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async resolve => {
      const userId = getCookie('userId')
      // 获取用户的基本信息
      const result = await userInfoApi(userId)
      if (result.code === ResultCodeEnum.invalidToken) {
        _Message.error({
          message: 'token 无效'
        })
        removeCookie('token')
        removeCookie('user_id')
        // 重置 路由
        resetRouter()
        return
      } else if (result.code === ResultCodeEnum.success) {
        commit(USER_MUTATIONS_TYPES.MUT_USER_INFO, result.data)
        // 通过递归获取用户的路由权限，侧边栏数据
        const getList = creatRouter(asyncRoutes[0], result.data?.roleId)
        // 深拷贝用户的侧边栏数据
        const newRoutesList = deepClone(asyncRoutes[0])
        newRoutesList.children = getList
        // 存储数据
        commit(USER_MUTATIONS_TYPES.MUT_SET_ROUTER_LIST, newRoutesList.children)
        commit(USER_MUTATIONS_TYPES.MUT_NEED_REFRESH, false)
        return resolve([newRoutesList])
      } else {
        return _Message.error({
          message: result.msg
        })
      }
    })
  }
}
const getters = {
  avatar: (state: StoreUserModel) => state.avatar,
  nickname: (state: StoreUserModel) => state.nickname,
  token: (state: StoreUserModel) => state.token,
  sideBarList: (state: StoreUserModel) => state.sideBarList
}
export default {
  namespaced: true, // 之后在不同页面中引入getter、actions、mutations时，需要加上所属的模块名
  state,
  mutations,
  actions,
  getters
}
