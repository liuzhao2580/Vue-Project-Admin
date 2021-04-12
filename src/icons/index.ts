import Vue from "vue"
import SvgIcon from "@/components/SvgIcon/index.vue"
// 注册全局组件
Vue.component("svg-icon", SvgIcon)

/**
 * 固定语法 , webpack 上下文模块API 上下文模块导出一个带一个参数的（require）函数：
 * 请求。导出的功能有3个属性：resolve，keys，id。
 * resolve 是一个函数，返回已解析请求的模块ID。
 * keys 是一个函数，它返回上下文模块可以处理的所有可能请求的数组
 * */
const importAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext.keys().map(requireContext)

/** 
 * require.context("./svg", false, /\.svg&/) 会去找 ./svg 文件夹下面的以 .svg结尾的所有文件
 *  需要结合 importAll 使用
 * 
 * require.context(directory, useSubdirectories, regExp)有三个参数：
 * directory ：说明需要检索的目录
    useSubdirectories ：是否检索子目录
    regExp : 匹配文件的正则表达式
*/
const req = require.context("./svg", false, /\.svg$/)
importAll(req)
