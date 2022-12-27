import { defineStore } from "pinia";
import { reactive } from "vue";
import { ElMessage } from "element-plus";
import { StoreUserModel } from "@/typescript/store";
import {
  CONST_VARIABLE,
  getCookie,
  removeCookie,
  setCookie
} from "@/utils/modules/cookies";
import { IUserBaseInfo } from "@/typescript/shared/interface/user-interface";
import { userInfoApi } from "@/api/modules/user";
import { ResultCodeEnum } from "@/typescript/shared/enum";
import { asyncRoutes, insertRouter, resetRouter } from "@/router";
import { RouteRecordRaw } from "vue-router";
import { UserRolesEnum } from "@/typescript/shared/enum/user-enum/user-roles.enum";
import { deepClone } from "@/utils";

// 定义一个接受的参数，避免 在请求拦截的时候出现 Message undefined 报错问题
const _Message = ElMessage;

/**
 * 将后台传递的路由格式和本地的路由对比
 * @param {asyncRoutes} asyncRoutes  本地路由需要权限的数据
 * @param {dataRouter} dataRouter  从后台获取的路由数据
 */
// 判断当前的路由是否存在权限 如该用户可以访问该页面就返回true 否则返回false
const hasPrimission = (route: RouteRecordRaw, roleId: UserRolesEnum) =>
  route.meta?.roles?.includes(roleId);
// 根据roleId 整理成为新的路由
const creatRouter = (route: RouteRecordRaw, roleId: UserRolesEnum) => {
  const routesArr: RouteRecordRaw[] = [];
  route.children?.forEach(item => {
    // 说明需要根据权限展示页面
    if (item.meta?.roles) {
      // 1. 首先判断该用户是否可以访问该页面
      if (hasPrimission(item, roleId)) {
        // 2. 再判断 该页面是否存在子路由
        // 2.1 该用户有子路由，使用递归判断子路由是否可以访问
        if (item.children) {
          const getChildrenRouter = creatRouter(item, roleId);
          routesArr.push({
            ...item,
            children: getChildrenRouter
          });
        }
        // 2.2 说明该页面没有子路由
        else routesArr.push(item);
      }
    }
    // 说明不需要权限即可展示页面
    else routesArr.push(item);
  });
  return routesArr;
};

export const useUserStore = defineStore("user", () => {
  const state = reactive(new StoreUserModel());

  /** 设置用户基本数据 */
  function setUserInfo(userInfo: IUserBaseInfo) {
    state.avatar = userInfo.avatar as string;
    state.nickname = userInfo.nickName as string;
    state.token = userInfo.token as string;
  }

  /** 用户登陆 获取用户信息 路由信息 */
  function saveUserInfo(data: IUserBaseInfo) {
    return new Promise<void>((resolve, reject) => {
      // 存入 token
      setCookie(CONST_VARIABLE.TOKEN, data.token!);
      setCookie(CONST_VARIABLE.USER_ID, data.id as string);
      data.roleId && setCookie(CONST_VARIABLE.ROLE_ID, data.roleId.toString());
      setUserInfo(data);
      try {
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  /** 页面刷新 重新获取用户信息, 路由信息 */
  function findUserInfoByID() {
    return new Promise(async resolve => {
      const userId = getCookie(CONST_VARIABLE.USER_ID);
      // 获取用户的基本信息
      const result = await userInfoApi(userId);
      if (result.code === ResultCodeEnum.invalidToken) {
        _Message.error({
          message: "token 无效"
        });
        removeCookie(CONST_VARIABLE.TOKEN);
        removeCookie(CONST_VARIABLE.USER_ID);
        // 重置 路由
        resetRouter();
        return;
      } else if (result.code === ResultCodeEnum.SUCCESS && result.data) {
        setUserInfo(result.data);
        // 通过递归获取用户的路由权限，侧边栏数据
        const getList = creatRouter(asyncRoutes[0], result.data.roleId!);
        // 深拷贝用户的侧边栏数据
        const newRoutesList = deepClone<RouteRecordRaw>(asyncRoutes[0]);
        newRoutesList.children = getList;
        insertRouter(newRoutesList);
        // 存储数据
        state.sideBarList = newRoutesList.children;
        state.Need_refresh = false;
        return resolve([newRoutesList]);
      } else {
        return _Message.error({
          message: result.msg
        });
      }
    });
  }

  return {
    state,
    saveUserInfo,
    findUserInfoByID
  };
});
