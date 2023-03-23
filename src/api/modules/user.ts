import axios from "../axiosConfig";
import { ResultModel } from "@/typescript/shared/model";
import { IUserBaseInfo } from "@/typescript/shared/interface/user-interface";

/** 用户登录 */
export const userLogin = (params: any): Promise<ResultModel<IUserBaseInfo>> => {
  return axios.post(`/user/login`, params);
};

/** 获取指定的用户信息 */
export const userInfoApi = (
  userId: string | number | undefined
): Promise<ResultModel<IUserBaseInfo>> => {
  return axios.get(`/user/info/${userId}`);
};

/** 获取所有用户信息 */
export const userInfoListAPI = (): Promise<ResultModel<IUserBaseInfo[]>> => {
  return axios.get(`/user/list`);
};
