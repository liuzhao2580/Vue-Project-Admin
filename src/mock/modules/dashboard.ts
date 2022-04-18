
// import { IMockResponse } from '../shared/interface'
export const EchartsData = (Mock: any) => {
  return {
    code: 0,
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
    })
  }
}
