import axios from "../axiosConfig"
import { ResultModel } from "@/typescript/shared/model/"
import {
  IArticleInsert,
  IArticleBasic
} from "@/typescript/views/article/interface/article-config.interface"
import { PageModel } from "@/typescript/shared/model/tableModel/page-config.model"

/** 获取文章分类 */
export const queryArticleCategoryAPI = (params: {
  id?: string;
  level?: number;
}): Promise<ResultModel<any>> => {
  return axios.post(`/article/category`, params)
}

/** 新增文章 */
export const insertArticle_API = (
  params: IArticleInsert
): Promise<ResultModel<any>> => {
  return axios.post("/article/insert", params)
}

/** 获取文章列表 */
export const queryArticleListAPI = (
  params: PageModel
): Promise<ResultModel<IArticleBasic[]>> => {
  return axios.post("/article/list", params)
}
