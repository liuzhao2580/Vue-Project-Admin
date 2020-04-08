const UserSchema = require("../model/user")
const { token_secret } = require("../utils/config")
const jwt = require("jsonwebtoken")
const path = require("path")
class UserCtl {
    // 判断用户名是否已经存在
    async user_existed(ctx,next) {
        ctx.verifyParams({
            name: {type: "string", required: true, format: /^[0-9a-zA-Z]{5,16}$/,message: "用户名只能是字母和数字,5-16个字符"}
        })
        const {body: getBody} = ctx.request
        const user = await UserSchema.findOne({"name": getBody.name})
        if(user) {
            ctx.body = ctx.setUnifyResFormat({},403,"用户名已经存在")
        } else {
            await next()
        }
    }
    // 判断该用户是否已经注册
    async checkISexisted(ctx,next) {
        ctx.verifyParams({
            name: {type: "string", required: true, format: /^[0-9a-zA-Z]{5,16}$/,message: "用户名只能是字母和数字,5-16个字符"}
        })
        const {body: getBody} = ctx.request
        const checkISexisted = await UserSchema.findOne({"name": getBody.name})
        if(!checkISexisted) {
            ctx.body = ctx.setUnifyResFormat({},404,"该用户名不存在")
        } else {
            await next()
        }
    }
    // 获取所有用户列表
    async get_listUser(ctx) {
        const userlist = await UserSchema.find()
        ctx.body = ctx.setUnifyResFormat(userlist,200,"数据获取成功")
    }
    // 获取指定的用户数据
    async get_findByIDUser(ctx) {
        const res = await UserSchema.findById(ctx.params.id)
        ctx.body = ctx.setUnifyResFormat(res,200,"数据获取成功")
    }
    // 用户注册
    async post_register(ctx) {
        ctx.verifyParams({
            name: {type: "string", required: true, format: /^[0-9a-zA-Z]{5,16}$/,message: "用户名只能是字母和数字,5-16个字符"},
            password: {type: "string", required: true, format: /^[0-9a-zA-Z_]{5,16}$/,message: "密码只能是字母、数字、下划线,5-16个字符"},
            nickname: {type: "string", required: true, format: /^[\u4e00-\u9fa5_a-zA-Z0-9]{5,18}$/,message: "昵称5-16个字符"},
            isAdmin: {type: "string",required:false}
        })
        const {body: getBody} = ctx.request
        const user = await UserSchema.create(getBody)
        ctx.body = ctx.setUnifyResFormat(user,200,"注册成功")
    }
    // 修改指定用户信息
    async patch_userUpdata(ctx) {
        ctx.verifyParams({
            id: {
                type: "string",required: true,format: /^[0-9a-zA-Z]{24}$/,message: "只能是24位"
            },
            name: {type: "string", required: false, format: /^[0-9a-zA-Z]{5,16}$/,message: "用户名只能是字母和数字,5-16个字符"},
            password: {type: "string", required: false, format: /^[0-9a-zA-Z_]{5,16}$/,message: "密码只能是字母、数字、下划线,5-16个字符"},
            nickName: {type: "string", required: false,},
            avatar_url: {type: "string", required: false,},
            isAdmin: {type: "string",required:false},
            gender: {type: "string",required:false},
            age: {type: "number",required:false}
        })
        let {body:getBody,files} = ctx.request
        let avatar_url = ""
        if(files) {
            const basename = path.basename(files.avatar_url.path)
            avatar_url = `${ctx.origin}/public/uploads/images/${basename}`
            getBody = {...getBody, avatar_url}
        }
        const res = await UserSchema.findByIdAndUpdate(getBody.id,getBody)
        ctx.body = ctx.setUnifyResFormat(res,200,"获取数据成功")
    }
    // 修改指定用户的路由信息
    async patch_userRouter(ctx) {
        ctx.verifyParams({
            id: {
                type: "string",required: true,format: /^[0-9a-zA-Z]{24}$/,message: "只能是24位"
            },
            routerList: {
                type: "array",required: true
            }
        })
        let {body: getBody} = ctx.request
        const {id: getID} = ctx.params
        const res = await UserSchema.findByIdAndUpdate(getID,getBody)
        ctx.body = ctx.setUnifyResFormat(res.routerList,200,"修改成功")
    }
    // 用户登录
    async post_login(ctx) {
        ctx.verifyParams({
            name: {type: "string", required: true, format: /^[0-9a-zA-Z]{5,16}$/,message: "用户名只能是字母和数字,5-16个字符"},
            password: {type: "string", required: true, format: /^[0-9a-zA-Z_]{5,16}$/,message: "密码只能是字母、数字、下划线,5-16个字符"}
        })
        const {body: getBody} = ctx.request
        const res = await UserSchema.findOne(getBody)
        if(!res) {
            ctx.body = {status: 403,message:"用户名或密码错误"}
        } else {
            // 添加token
            const token = "Bearer " + jwt.sign({name: res.name,id: res.id},token_secret,{expiresIn: "1D"})
            const get_UnifyResFormat = ctx.setUnifyResFormat({userInfo: res,token},200,"登录成功")
            ctx.body = get_UnifyResFormat
        }
    }
}

module.exports = new UserCtl()