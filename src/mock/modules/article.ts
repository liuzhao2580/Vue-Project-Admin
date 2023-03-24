import { ResultCodeEnum, ResultTypeEnum } from "@/typescript/shared/enum"
import { IMockResponse } from "../shared"
import articleCategoryData from "../data/article_category.json"
import articleListData from "../data/article_list.json"
import { PageModel } from "@/typescript/shared/model/tableModel/page-config.model"
import { IArticleBasic } from "@/typescript/views/article/interface/article-config.interface"
import { ResultModel } from "@/typescript/shared/model"
const articleModules: IMockResponse<any>[] = [
  {
    url: "/article/category",
    type: ResultTypeEnum.POST,
    response: (options: any): ResultModel<any> => {
      const { level, id } = JSON.parse(options.body)
      return {
        code: ResultCodeEnum.SUCCESS,
        data: articleCategoryData.article_category.filter(
          item => item.level === level || item.id === id
        ),
        msg: "成功"
      }
    }
  },
  {
    url: "/article/list",
    type: ResultTypeEnum.POST,
    response: (options: any): ResultModel<any> => {
      const { pageNum, pageSize } = JSON.parse(options.body) as PageModel
      const startLength = (pageNum - 1) * pageSize
      const endLength = pageNum * pageSize
      const data: IArticleBasic[] = articleListData.article_list.slice(
        startLength,
        endLength
      )
      const totalCount = articleListData.article_list.length
      return {
        code: ResultCodeEnum.SUCCESS,
        data,
        totalCount,
        msg: "成功"
      }
    }
  }
]

export default articleModules
