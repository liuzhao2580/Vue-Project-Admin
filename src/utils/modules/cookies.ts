import Cookies from "js-cookie"

/** 常量 */
export const CONST_VARIABLE = {
  TOKEN: "token",
  USER_ID: "userId",
  ROLE_ID: "roleId"
}

/** 设置 cookies */
export const setCookie = (name: string, value: string, days = 1) => {
  return Cookies.set(name, value, { expires: days })
}

/** 获取cookies */
export const getCookie = (name: string) => {
  return Cookies.get(name)
}

/** 删除指定cookies */
export const removeCookie = (name: string) => {
  return Cookies.remove(name)
}

// /** 存储 token */
// export const userSetCookie = (token: string)=> {
//   setCookie(CONST_VARIABLE.TOKEN, token)
// }

// /** 获取 token */
// export const userGetCookie = ()=> {
//   getCookie(CONST_VARIABLE.TOKEN)
// }

// /** 删除 token */
// export const userRemoveCookie = ()=> {
//   removeCookie(CONST_VARIABLE.TOKEN)
// }
