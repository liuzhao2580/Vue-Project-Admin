import { ResultCodeEnum, ResultTypeEnum } from '@/typescript/shared/enum'
import { IUserBaseInfo } from '@/typescript/shared/interface/user-interface'
import { IMockResponse } from '../shared'

// 用户的基本信息
const userInfo: IUserBaseInfo [] = [
  {
    id: 1,
    roleId: 1,
    roleName: '超级管理员',
    userName: 'liuzhao',
    password: '123456',
    nickName: '小火车况且况且',
    token: 'admin-token',
    avatar:
      'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-50f2e90e-f860-4396-bbc7-b912e93fa987/97babdaa-f2ef-4615-bb72-f2d0924d9457.jpg'
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
      'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-50f2e90e-f860-4396-bbc7-b912e93fa987/3fc59cec-c378-492e-a96e-8488c267c527.jpg'
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
      'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-pgfxdvln08wfa8a9f6/2fb96590-4cab-11eb-8a36-ebb87efcf8c0.png'
  }
]

const userModules: IMockResponse<any>[] = [
  {
    type: ResultTypeEnum.POST,
    url: '/user/login',
    response: (options: any) =>{
      const { userName, password } = JSON.parse(options.body)
      // 判断该用户是否存在
      const is_True = userInfo.find(item => {
        return item.userName === userName && item.password === password
      })
      return is_True
        ? {
          code: ResultCodeEnum.SUCCESS,
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
    type: ResultTypeEnum.GET,
    url: '/user/info/.*',
    response(options) {
      const { url } = options
      const splitArray = url.split('/')
      const id = +splitArray[splitArray.length - 1]
      // 判断该用户是否存在
      const is_True = userInfo.find(item => {
        return item.id === id
      })
      return is_True
        ? {
          code: ResultCodeEnum.SUCCESS,
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
