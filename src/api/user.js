import axios from '@/assets/js/axiosConfig'

export const userInfoApi = () => {
    return axios.get("/api/user/info")
}