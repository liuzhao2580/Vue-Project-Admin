import axios from '../axiosConfig'
import { ResultModel } from '@/typescript/shared/model/'

/** 获取 Echarts 的请求 */
export const dashboardEcharts_Api = (): Promise<ResultModel<any>> => {
  return axios.get('/dashboard/echarts')
}
