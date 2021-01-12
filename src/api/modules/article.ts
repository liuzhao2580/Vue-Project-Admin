import axios from '../axiosConfig'

const baseURL = 'https://50f2e90e-f860-4396-bbc7-b912e93fa987.bspapp.com/http'
/** 获取文章分类 */
export const queryArticleCategory_API = () => {
    return axios.get(`${baseURL}/tabbar`)
}