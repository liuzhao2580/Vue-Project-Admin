// 用户的基本信息
const userInfo = [
    {
        id: 9527,
        roleId: 1,
        roleName: '超级管理员',
        username: "admin",
        password: "admin",
        nickname: "小火车况且况且",
        token: "admin-token",
        avatar:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-minions/ec902db0-3497-11eb-b997-9918a5dda011.jpg"
    },
    {
        id: 2580,
        roleId: 2,
        roleName: '管理员',
        username: "root",
        password: "root",
        nickname: "小飞机呼哧呼哧",
        token: "root-token",
        avatar:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-minions/94e4c280-349a-11eb-8ff1-d5dcf8779628.png"
    },
    {
        id: 4396,
        roleId: 3,
        roleName: '普通用户',
        username: "user",
        password: "user",
        nickname: "小话痨吧啦吧啦",
        token: "user-token",
        avatar:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-minions/326b7250-34a6-11eb-97b7-0dc4655d6e68.png"
    }
]
// 用户登陆的时候 保存用户的基本信息
const setUserInfo = (options: { body: string }) => {
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
                "roleId": is_True.roleId,
                "nickname": is_True.nickname,
                "token": is_True.token,
                "message": "登陆成功",
                "avatar": is_True.avatar
            }
        }
    }
    else {
        return {
            "status": 400,
            "message": "登录失败,请检查用户名和密码是否正确"
        }
    }
}
// 用户刷新的时候获取用户基本信息
const getUserInfo = (options: { url: any }) => {
    const {url} = options
    const id = url.split('?')[1].split('=')[1]
    // 判断该用户是否存在
    const is_True = userInfo.find(item => {
        return item.id == id
    })
    if (is_True) {
        return {
            "status": 200,
            "userInfo": {
                "id": is_True.id,
                "roleId": is_True.roleId,
                "nickname": is_True.nickname,
                "token": is_True.token,
                "message": "登陆成功",
                "avatar": is_True.avatar
            },
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
