import axios from '@/assets/js/axiosConfig'

export const userInfoApi = () => {
    return axios.get("/user/info")
}

export const userLogin = (params) => {
    return axios.post("/user/login", params)
}