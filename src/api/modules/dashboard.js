import axios from '../axiosConfig'

export const dashboardApi = () => {
    return axios.get("/dashboard")
}