import { ResultCodeEnum, ResultTypeEnum } from "@/typescript/shared/enum"
import { UserRolesEnum } from "@/typescript/shared/enum/user-enum/user-roles.enum"
import { IUserBaseInfo } from "@/typescript/shared/interface/user-interface"
import { IMockResponse } from "../shared"

// 用户的基本信息
const userInfo: IUserBaseInfo[] = [
  {
    id: 1,
    roleId: UserRolesEnum.superAdmin,
    roleName: "超级管理员",
    userName: "liuzhao",
    password: "123456",
    nickName: "小火车况且况且",
    token: "admin-token",
    avatar:
      "https://mp-59459393-e8b3-4748-81f4-a9150958c7dc.cdn.bspapp.com/cloudstorage/eafa8a43-f2b0-48c7-85b6-b536ae060e96.png"
  },
  {
    id: 2,
    roleId: UserRolesEnum.admin,
    roleName: "管理员",
    userName: "admin",
    password: "admin",
    nickName: "小飞机呼哧呼哧",
    token: "admin-token",
    avatar:
      "https://mp-59459393-e8b3-4748-81f4-a9150958c7dc.cdn.bspapp.com/cloudstorage/eafa8a43-f2b0-48c7-85b6-b536ae060e96.png"
  },
  {
    id: 3,
    roleId: UserRolesEnum.user,
    roleName: "普通用户",
    userName: "user",
    password: "user",
    nickName: "小话痨吧啦吧啦",
    token: "user-token",
    avatar:
      "https://mp-59459393-e8b3-4748-81f4-a9150958c7dc.cdn.bspapp.com/cloudstorage/eafa8a43-f2b0-48c7-85b6-b536ae060e96.png"
  }
]

const userModules: IMockResponse<any>[] = [
  {
    // 用户登录
    type: ResultTypeEnum.POST,
    url: "/user/login",
    response: (options: any) => {
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
          msg: "成功"
        }
        : {
          code: 400,
          data: {},
          msg: "登录失败,请检查用户名和密码是否正确"
        }
    }
  },
  {
    // 获取单个用户信息
    type: ResultTypeEnum.GET,
    url: "/user/info/.*",
    response(options) {
      const { url } = options
      const splitArray = url.split("/")
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
          msg: "成功"
        }
        : {
          code: 400,
          data: {},
          msg: "登录失败,请检查用户名和密码是否正确"
        }
    }
  },
  {
    // 获取用户列表
    type: ResultTypeEnum.GET,
    url: "/user/list",
    response() {
      return {
        code: ResultCodeEnum.SUCCESS,
        data: userInfo,
        msg: "成功"
      }
    }
  }
]

export default userModules
