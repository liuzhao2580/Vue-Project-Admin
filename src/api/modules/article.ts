import { AxiosResponse } from "axios"
import axios from "../axiosConfig"
import { ResultModel } from "@/typescript/model"
import {
    IArticleInsert,
    IArticleBasic,
} from "@/views/article/share/interface/article-config.interface"

/** 获取文章分类 */
export const queryArticleCategory_API = (params: {
    id?: string
    level?: number
}): Promise<ResultModel<any>> => {
    return axios.post(`/article/category`, params)
}

/** 新增文章 */
export const insertArticle_API = (params: IArticleInsert): Promise<ResultModel<any>> => {
    return axios.post("/article/insert", params)
}

/** 获取文章列表 */
export const queryArticleList_API = (): Promise<ResultModel<IArticleBasic[]>> => {
    return axios.get("article/list")
}
