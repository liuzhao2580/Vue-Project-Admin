import axios from '../axiosConfig'
import { IArticleInsert } from '@/views/article/share/interface/article-config.interface'

/** 获取文章分类 */
export const queryArticleCategory_API = (params: { id?: string; level?: number }) => {
    return axios.post(`/article/category`, params)
}

/** 新增文章 */
export const insertArticle_API = (params: IArticleInsert) => {
    return axios.post('/article/insert', params)
}
