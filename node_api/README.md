### 技术栈
1. 基于`NodeJS`的`Web`框架`Koa` 
2. 数据库使用的是`MongoDB`,使用的第三方模块`mongoose`
### 使用到的Koa中间件
1. `koa-router` 管理路由
2. `koa-json-error` 出错路由的提示页面
3. `jsonwebtoken` 用于生成`token`
4. `koa-jwt` 用于解析`token`, 解析的数据保存在`ctx.state`
5. `koa-paramter` 用于校验传递的参数
6. `koa-body` 用于解析`post`请求传递的数据 还可以解析传递的图片
7. `koa-static` 用于将指定的目录托管
8. `koa-cors` 用于解决跨域问题

## 请求API
1. 说明：请求的地址是`localhost:7777/api/v1`
### 登录