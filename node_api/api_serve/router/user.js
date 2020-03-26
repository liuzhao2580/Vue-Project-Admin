const Router = require("koa-router")
const { token_secret } = require("../utils/config")
const router = new Router()
const UserCtl = require("../controller/user")
const koa_jwt = require("koa-jwt")
const check_token = koa_jwt({secret:token_secret})
// 获取用户列表
router.get("/user",check_token,UserCtl.get_listUser)
// 获取指定的用户信息
router.get("/user/:id",check_token,UserCtl.get_findByIDUser)
// 用户注册
router.post("/register",UserCtl.user_existed, UserCtl.post_register)
// 修改指定用户信息
router.patch("/user/updata",UserCtl.patch_userUpdata)
// 用户登录
router.post("/login", UserCtl.checkISexisted, UserCtl.post_login)
module.exports = router