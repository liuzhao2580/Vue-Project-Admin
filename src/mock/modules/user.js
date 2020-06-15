import qs from 'querystring'

import routerList from '../data/router'
// 用户的基本信息
const userInfo = [
    {
        id: 9527,
        username: "admin",
        password: "admin",
        nickname: "小火车况且况且",
        token: "admin-token",
        avatar:"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
    }
]
// 用户登陆的时候 保存用户的基本信息
const setUserInfo = (options) => {
    const getUserInfo = JSON.parse(options.body)

    const username = getUserInfo.username
    const password = getUserInfo.password
    // 判断该用户是否存在
    const is_True = userInfo.find(item => {
        return item.username == username && item.password == password
    })
    if (is_True) {
        return {
            "status": 200,
            "userInfo": {
                "id": is_True.id,
                "nickname": is_True.nickname,
                "token": is_True.token,
                "message": "登陆成功",
                "avatar": is_True.avatar
            },
            routerList
        }
    }
    else {
        return {
            "status": 400,
            "message": "登录失败,请检查用户名和密码是否正确"
        }
    }
}

// 获取用户信息, 路由信息
const getUserInfo = options => {
    const {url} = options
    const getParams = url.split('?')[1]
    const { userId } = qs.parse(getParams)
    // 判断该用户是否存在
    const is_True = userInfo.find(item => {
        return item.id == userId
    })
    if (is_True) {
        return {
            "status": 200,
            "userInfo": {
                "id": is_True.id,
                "nickname": is_True.nickname,
                "token": is_True.token,
                "message": "登陆成功",
                "avatar": is_True.avatar
            },
            routerList
        }
    }
    else {
        return {
            "status": 400,
            "message": "获取用户路由信息失败"
        }
    }
}

export default {
    setUserInfo,
    getUserInfo
}
