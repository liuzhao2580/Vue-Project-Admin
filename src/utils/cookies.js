import Cookies from "js-cookie"

export const setCookie = (name, value, days = 1) => {
    Cookies.set(name, value, { expires: days })
}
