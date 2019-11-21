import axios from '@/assets/js/axiosConfig'

export const dashboardApi = () => {
    return axios.get("/dashboard")
}