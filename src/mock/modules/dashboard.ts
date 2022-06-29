import { ResultCodeEnum, ResultTypeEnum } from '@/typescript/shared/enum'
import { IMockResponse } from '../shared'
import Mock from 'mockjs'

const dashboardModules: IMockResponse<any>[] = [
  {
    url: '/dashboard/echarts',
    type: ResultTypeEnum.GET,
    response: () => {
      return {
        code: ResultCodeEnum.SUCCESS,
        data: Mock.mock({
          line: [
            {
              name: 'Vue',
              type: 'line',
              'data|7': [{ 'value|100-1000': 1000 }]
            },
            {
              name: 'React',
              type: 'line',
              'data|7': [{ 'value|100-1000': 1000 }]
            },
            {
              name: 'Angular',
              type: 'line',
              'data|7': [{ 'value|100-1000': 1000 }]
            }
          ],
          bar: [
            {
              name: 'Vue',
              type: 'bar',
              'data|7': [{ 'value|100-1000': 1000 }]
            },
            {
              name: 'React',
              type: 'bar',
              'data|7': [{ 'value|100-1000': 1000 }]
            },
            {
              name: 'Angular',
              type: 'bar',
              'data|7': [{ 'value|100-1000': 1000 }]
            }
          ],
          pie: [
            { 'value|100-1000': 1000, name: 'Vue' },
            { 'value|100-1000': 1000, name: 'React' },
            { 'value|100-1000': 1000, name: 'Angular' }
          ]
        }),
        msg: ''
      }
    }
  }
]

export default dashboardModules
