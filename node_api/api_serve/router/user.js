const Router = require("koa-router")
const { token_secret,API_versions } = require("../utils/config")
const router = new Router()
const UserCtl = require("../controller/user")
const koa_jwt = require("koa-jwt")
const check_token = koa_jwt({secret:token_secret})
/**设置请求路径前缀
 * @param router.prefix() 地址 https://github.com/ZijianHe/koa-router#routerprefixprefix--router
 */
const userRouter = router.prefix(API_versions)

// 获取用户列表
userRouter.get("/user",check_token,UserCtl.get_listUser)
// 获取指定的用户信息
userRouter.get("/user/:id",check_token,UserCtl.get_findByIDUser)
// 用户注册
userRouter.post("/register",UserCtl.user_existed, UserCtl.post_register)
// 修改指定用户信息
userRouter.patch("/user/updata",UserCtl.patch_userUpdata)
// 用户登录
userRouter.post("/login", UserCtl.checkISexisted, UserCtl.post_login)
module.exports = router