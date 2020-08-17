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
        avatar:"https://avatars1.githubusercontent.com/u/45835364"
    },
    {
        id: 2580,
        roleId: 2,
        roleName: '管理员',
        username: "root",
        password: "root",
        nickname: "小飞机呼哧呼哧",
        token: "root-token",
        avatar:"https://avatars1.githubusercontent.com/u/45835364"
    },
    {
        id: 4396,
        roleId: 3,
        roleName: '普通用户',
        username: "admin",
        password: "admin",
        nickname: "小火车况且况且",
        token: "admin-token",
        avatar:"https://avatars1.githubusercontent.com/u/45835364"
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

export default {
    setUserInfo
}
