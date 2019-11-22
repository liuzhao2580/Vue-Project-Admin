import Cookies from "js-cookie"

// 设置 cookies
export const setCookie = (name, value, days = 1) => {
    Cookies.set(name, value, { expires: days })
}

// 获取cookies
export const getCookie = (name) => {
    return Cookies.get(name)
}

// 删除cookies
export const removeCookie = (name) => {
    Cookies.remove(name)
}