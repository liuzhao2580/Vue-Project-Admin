import { ResultCodeEnum, ResultTypeEnum } from '@/typescript/shared/enum'
import { IMockResponse } from '../shared'
import articleCategoryData from '../data/article_category.json'
const articleModules: IMockResponse[] = [
  {
    url: '/article/category',
    type: ResultTypeEnum.POST,
    response: (options:any) => {
      const { level, id } = JSON.parse(options.body)
      return {
        code: ResultCodeEnum.success,
        data: articleCategoryData.article_category.filter(item => item.level === level || item.id === id)
      }
    }
  }
]

export default articleModules
