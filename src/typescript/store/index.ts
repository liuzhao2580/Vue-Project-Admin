import { RouteRecordRaw } from "vue-router"
import { UserRolesEnum } from "../shared/enum/user-enum/user-roles.enum"
import { ITagsView } from "../shared/interface"

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
  /** 用户头像 */
  avatar = ""
  /** 昵称 */
  nickName = ""
  /** token */
  token = ""
  /** 判断是否刷新页面 false 否 true 是 */
  Need_refresh = true
  /** 用户 id */
  id?: string | number
  /** 用户的权限 */
  roleId?: UserRolesEnum
  /** 当前权限的中文说明 */
  roleName?: string
  /** 用户名 */
  userName: string
}

/** tagsView */
export class StoreTagsViewModel {
  /** 存放 tags 的数组 */
  tagsArray: ITagsView[] = []
}
