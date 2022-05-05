/** 1. 用户基本信息的接口 */
export interface IUserBaseInfo {
  /** 用户 id */
  id?: string | number
  /** 用户的权限 */
  roleId?: number
  /** 当前权限的中文说明 */
  roleName?: string
  /** 用户名 */
  userName: string
  /** 密码 */
  password?: string
  /** 昵称 */
  nickName?: string
  /** token */
  token?: string
  /** 头像 */
  avatar?: string
}
