/*
 * @Author: Do.Xiong
 * @Date: 2022-09-09 21:24:36
 * @LastEditTime: 2022-09-09 22:45:34
 * @Description:
 */
import request from "@/utils/request";

export function userList(query) {
  return request({
    url: '/workflow/process/userList',
    method: 'get',
    params: query
  })
}

export function treeselect(query) {
  return request({
    url: '/workflow/process/treeselect',
    method: 'get',
    params: query
  })
}

export function deptList(query) {
  return request({
    url: '/workflow/process/deptList',
    method: 'get',
    params: query
  })
}
