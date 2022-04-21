export const USER_MUTATIONS_TYPES = {
  /** 设置用户基本数据 */
  MUT_USER_INFO: 'user/MTU_userInfo',
  /** 设置用户动态路由 */
  MUT_SET_ROUTER_LIST: 'user/MTU_setRouterList',
  /** 设置 Need_refresh 用来更新 Need_refresh */
  MUT_NEED_REFRESH: 'user/MUT_needRefresh'
}

export const USER_ACTIONS_TYPES = {
  /** 用户登陆 获取用户信息 路由信息 */
  ACT_FETCH_USERINFO: 'user/ACT_fetchUserInfo',
  /** 页面刷新 重新获取用户信息, 路由信息 */
  ACT_FETCH_FIND_BY_USERID: 'user/ACT_findByIDUser'
}
