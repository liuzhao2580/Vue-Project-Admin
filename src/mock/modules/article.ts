import { ResultCodeEnum, ResultTypeEnum } from '@/typescript/shared/enum'
import { IMockResponse } from '../shared'
import articleCategoryData from '../data/article_category.json'
import articleListData from '../data/article_list.json'
import { IArticleBasic } from '@/typescript/views/article/interface/article-config.interface'
const articleModules: IMockResponse[] = [
  {
    url: '/article/category',
    type: ResultTypeEnum.POST,
    response: (options: any) => {
      const { level, id } = JSON.parse(options.body)
      return {
        code: ResultCodeEnum.success,
        data: articleCategoryData.article_category.filter(
          item => item.level === level || item.id === id
        )
      }
    }
  },
  {
    url: '/article/list',
    type: ResultTypeEnum.GET,
    response: (options: any) => {
      const filterCondition = JSON.parse(options.body) as IArticleBasic
      console.log(filterCondition, 'filterCondition')
      return {
        code: ResultCodeEnum.success,
        data: articleListData.article_list
      }
    }
  }
]

export default articleModules
