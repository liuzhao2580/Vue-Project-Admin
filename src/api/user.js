import axios from 'axios'

export const userInfoApi = () => {
    return axios.get("/user/info")
}