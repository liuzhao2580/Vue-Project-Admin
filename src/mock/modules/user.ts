import { ResultCodeEnum } from '@/typescript/enum'
import { IUserBaseInfo } from '@/typescript/interface/user-interface'
import { IMockResponseData } from '../share/interface/mock.interface'

// 用户的基本信息
const userInfo: IUserBaseInfo[] = [
    {
        userId: 9527,
        roleId: 1,
        roleName: '超级管理员',
        userName: 'admin',
        password: 'admin',
        nickName: '小火车况且况且',
        token: 'admin-token',
        avatar:
            'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-minions/ec902db0-3497-11eb-b997-9918a5dda011.jpg'
    },
    {
        userId: 2580,
        roleId: 2,
        roleName: '管理员',
        userName: 'root',
        password: 'root',
        nickName: '小飞机呼哧呼哧',
        token: 'root-token',
        avatar:
            'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-minions/94e4c280-349a-11eb-8ff1-d5dcf8779628.png'
    },
    {
        userId: 4396,
        roleId: 3,
        roleName: '普通用户',
        userName: 'user',
        password: 'user',
        nickName: '小话痨吧啦吧啦',
        token: 'user-token',
        avatar:
            'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-minions/326b7250-34a6-11eb-97b7-0dc4655d6e68.png'
    }
]
// 用户登陆的时候 保存用户的基本信息
const setUserInfo = (options: { body: string }): IMockResponseData<IUserBaseInfo> => {
    const getUserInfo = JSON.parse(options.body)

    const userName = getUserInfo.userName
    const password = getUserInfo.password
    // 判断该用户是否存在
    const is_True = userInfo.find((item) => {
        return item.userName == userName && item.password == password
    })
    if (is_True) {
        return {
            code: ResultCodeEnum.success,
            data: {
                userId: is_True.userId,
                userName: is_True.userName,
                roleId: is_True.roleId,
                nickName: is_True.nickName,
                token: is_True.token,
                avatar: is_True.avatar
            }
        }
    } else {
        return {
            code: 400,
            msg: '登录失败,请检查用户名和密码是否正确'
        }
    }
}
// 用户刷新的时候获取用户基本信息
const getUserInfo = (options: { url: any }): IMockResponseData<IUserBaseInfo> => {
    const { url } = options
    const userId = url.split('?')[1].split('=')[1]
    console.log(options, 'userId')
    // 判断该用户是否存在
    const is_True = userInfo.find((item) => {
        return item.userId == userId
    })
    if (is_True) {
        return {
            code: ResultCodeEnum.success,
            data: {
                userId: is_True.userId,
                userName: is_True.userName,
                roleId: is_True.roleId,
                nickName: is_True.nickName,
                token: is_True.token,
                avatar: is_True.avatar
            }
        }
    } else {
        return {
            code: 400,
            msg: '获取用户路由信息失败'
        }
    }
}
export default {
    setUserInfo,
    getUserInfo
}
