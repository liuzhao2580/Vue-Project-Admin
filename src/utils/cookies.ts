import Cookies from 'js-cookie'

// 设置 cookies
export const setCookie = (name: string, value: string, days = 1) => {
  return Cookies.set(name, value, { expires: days })
}

// 获取cookies
export const getCookie = (name: string) => {
  return Cookies.get(name)
}

// 删除指定cookies
export const removeCookie = (name: string) => {
  return Cookies.remove(name)
}
