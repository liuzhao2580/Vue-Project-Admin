import { ResultCodeEnum, ResultTypeEnum } from '@/typescript/shared/enum'
import { IUserBaseInfo } from '@/typescript/shared/interface/user-interface'
import { IMockResponse } from '../shared/interface'
// 用户的基本信息
const userInfo: IUserBaseInfo[] = [
  {
    id: 1,
    roleId: 1,
    roleName: '超级管理员',
    userName: 'liuzhao',
    password: '123456',
    nickName: '小火车况且况且',
    token: 'admin-token',
    avatar:
      'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-minions/ec902db0-3497-11eb-b997-9918a5dda011.jpg'
  },
  {
    id: 2,
    roleId: 2,
    roleName: '管理员',
    userName: 'admin',
    password: 'admin',
    nickName: '小飞机呼哧呼哧',
    token: 'admin-token',
    avatar:
      'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-minions/94e4c280-349a-11eb-8ff1-d5dcf8779628.png'
  },
  {
    id: 3,
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
const userModules: IMockResponse<IUserBaseInfo | {}>[] = [
  {
    type: ResultTypeEnum.GET,
    url: '/user/info.*',
    response(options) {
      const getUserInfo = JSON.parse(options.body)
      const userName = getUserInfo.userName
      const password = getUserInfo.password
      // 判断该用户是否存在
      const is_True = userInfo.find(item => {
        return item.userName === userName && item.password === password
      })
      return is_True
        ? {
          code: ResultCodeEnum.success,
          data: {
            id: is_True.id,
            userName: is_True.userName,
            roleId: is_True.roleId,
            nickName: is_True.nickName,
            token: is_True.token,
            avatar: is_True.avatar
          },
          msg: '成功'
        }
        : {
          code: 400,
          data: {},
          msg: '登录失败,请检查用户名和密码是否正确'
        }
    }
  },
  {
    type: ResultTypeEnum.POST,
    url: '/user/login',
    response(options) {
      const { url } = options
      const splitArray: string[] = url.split('/')
      const id = +splitArray[splitArray.length - 1]
      // 判断该用户是否存在
      const is_True = userInfo.find(item => {
        return item.id === id
      })
      return is_True
        ? {
          code: ResultCodeEnum.success,
          data: {
            id: is_True.id,
            userName: is_True.userName,
            roleId: is_True.roleId,
            nickName: is_True.nickName,
            token: is_True.token,
            avatar: is_True.avatar
          },
          msg: '成功'
        }
        : {
          code: 400,
          data: {},
          msg: '登录失败,请检查用户名和密码是否正确'
        }
    }
  }
]

export default userModules
