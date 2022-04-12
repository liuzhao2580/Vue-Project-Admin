import { RouteRecordRaw } from 'vue-router'

/** 系统 app 的 store */
export class StoreAppModel {
  /** 侧边栏状态 展开 false 或者 折叠 true */
  side_status = false
  /** 当前的 设备 默认 false desktop 桌面  true mobile 移动端 */
  isMobile = false
}

/** 用户的store */
export class StoreUserModel {
  /** 动态路由侧边栏的数据 */
  sideBarList: RouteRecordRaw[] = []
  /** 动态路由侧边栏的数据 */
  avatar = ''
  /** 动态路由侧边栏的数据 */
  nickname = ''
  /** 动态路由侧边栏的数据 */
  token = ''
  /** 判断是否刷新页面 false 否 true 是 */
  Need_refresh = true
}

/** tagsView */
export class StoreTagsViewModel {
  /** 存放 tags 的数组 */
  tagsArray: Array<string> = []
}
