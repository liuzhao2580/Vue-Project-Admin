/** 文章通用类的接口 */

/** 文章分类 */
export interface IArticleCategory {
  /** 分类id */
  id: number
  /** 分类名称 */
  category_name: string
  /** 父级节点的 id */
  parent_id: number
}

/** 文章新增 */
export interface IArticleInsert {
  /** 用户id */
  creator_id: string
  /** 文章标题 */
  article_title: string
  /** 文章内容 */
  article_content: string
  /** 文章类别 id */
  article_categoryId: number
  /** 父级节点的 id */
  category_parentId: number
}

/** 文章的基本结构 */
export interface IArticleBasic {
  /** 文章 id */
  id?: string
  /** 文章 名称 */
  title: string
  /** 内容 */
  content: string
  /** 创建时间 */
  create_time: Date | string
  /** 更新时间 */
  update_time: Date | string
  /** 创建者 id */
  user_id: string
  /** 创建者 用户名 */
  /** 创建者 头像 */
  /** 文章分类 id */
  category_id: number | string
  /** 分类名称 */
  category_name: string
  /** 父级分类的id */
  category_parent_id: number | string
  /** 父级分类的名称 */
  category_parent_name: string
}
