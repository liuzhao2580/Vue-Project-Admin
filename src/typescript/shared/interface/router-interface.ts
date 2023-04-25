import { UserRolesEnum } from "../enum/user-enum/user-roles.enum"

/** 路由的 meta 接口规定 */
export interface IMetaRouter {
  /** 该路由是否在侧边栏显示
   * 默认false 显示
   * true 不显示在侧边栏
   */
  hidden?: boolean

  /** 路由是否显示在面包屑中
   * 默认 true 显示
   * false 不显示
   */
  breadcrumb?: boolean

  /** 路由在 tags 中 初始化的时候就要显示，并且不能被删除
   * 默认 false 不显示 能被删除
   * true 初始化显示 不能被删除
   */
  affix?: boolean

  /** 用来存放路由的权限信息
   * 如果 roles 没有声明 说明所有用户都可以进入该页面
   */
  roles?: Array<UserRolesEnum>

  /** 路由是否需要保持缓存 */
  keepAlive?: boolean

  /** 路由的名称 */
  title: string

  /** 路由显示在侧边栏的 图标
   * 如果需要使用 iconfont 的图标, 格式为 "iconfont xxxx" 例如 "iconfont icon-home", 但是使用了 iconfont的字体图标,修改颜色就会失效
   */
  icon?: string

  /**
   * 是不是使用iframe 嵌套
   * 默认都是false
   */
  iframeFlag?: boolean

  /**
   * 如果是iframe 嵌套, 就必须要填写链接
   */
  iframeUrl?: string

  /**
   * 外链地址
   * 点击之后开启新窗口跳转
   */
  outsideUrl?: string
}
