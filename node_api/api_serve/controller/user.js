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
        if(user) ctx.throw(403,"用户名已经存在")
        await next()
    }
    // 判断该用户是否已经注册
    async checkISexisted(ctx,next) {
        ctx.verifyParams({
            name: {type: "string", required: true, format: /^[0-9a-zA-Z]{5,16}$/,message: "用户名只能是字母和数字,5-16个字符"}
        })
        const {body: getBody} = ctx.request
        const checkISexisted = await UserSchema.findOne({"name": getBody.name})
        if(!checkISexisted) {
            ctx.body = {status: 404, message: "该用户名不存在"}
        } else {
            await next()
        }
    }
    // 获取所有用户列表
    async get_listUser(ctx) {
        const userlist = await UserSchema.find()
        ctx.body = userlist
    }
    // 获取指定的用户数据
    async get_findByIDUser(ctx) {
        const res = await UserSchema.findById(ctx.params.id)
        ctx.body = res
    }
    // 用户注册
    async post_register(ctx) {
        ctx.verifyParams({
            name: {type: "string", required: true, format: /^[0-9a-zA-Z]{5,16}$/,message: "用户名只能是字母和数字,5-16个字符"},
            password: {type: "string", required: true, format: /^[0-9a-zA-Z_]{5,16}$/,message: "密码只能是字母、数字、下划线,5-16个字符"},
            nickName: {type: "string", required: true, format: /^\w{5,16}$/,message: "昵称5-16个字符"},
            isAdmin: {type: "string",required:false}
        })
        const {body: getBody} = ctx.request
        const user = await UserSchema.create(getBody)
        ctx.body = user
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
        ctx.body = res
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
            const token = jwt.sign({name: res.name,id: res.id},token_secret,{expiresIn: "1D"})
            ctx.body = { status: 200, token,userInfo: res}
        }
    }
}

module.exports = new UserCtl()