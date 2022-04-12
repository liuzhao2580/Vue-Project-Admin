export const USER_MUTATIONS_TYPES = {
  /** 设置用户基本数据 */
  MUT_USER_INFO: 'MTU_userInfo',
  /** 设置用户动态路由 */
  MUT_SET_ROUTER_LIST: 'MTU_setRouterList',
  /** 设置 Need_refresh 用来更新 Need_refresh */
  MUT_NEED_REFRESH: 'MUT_needRefresh'
}

export const USER_ACTIONS_TYPES = {
  /** 用户登陆 获取用户信息 路由信息 */
  ACT_FETCH_USERINFO: 'ACT_fetchUserInfo',
  /** 页面刷新 重新获取用户信息, 路由信息 */
  ACT_FETCH_FIND_BY_USERID: 'ACT_findByIDUser'
}
