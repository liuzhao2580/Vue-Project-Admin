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