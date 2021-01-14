import axios from '../axiosConfig'

/** 获取 Echarts 的请求 */
export const dashboardEcharts_Api = () => {
    return axios.get("/dashboard/echarts")
}