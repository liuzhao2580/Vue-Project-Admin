import axios from '../axiosConfig'

/** 获取文章分类 */
export const queryArticleCategory_API = (params: { id?: string; level?: number }) => {
    return axios.post(`/article/category`, params)
}
