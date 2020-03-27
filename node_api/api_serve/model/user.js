const Mongoose = require("mongoose")
const { Schema,model } = Mongoose

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    // 用户头像
    avatar_url: {
        type: String,
        default: "https://fanyi.baidu.com/favicon.ico"
    },
    // 用户名昵称
    nickname: {
        type: String,
        required: true
    },
    // 设置是否是管理员，"1"代表是 "0"代表不是
    isAdmin: {
        type: String,
        default: "0"
    },
    // "0" 代表男性 "1" 代表女性 
    gender: {
        type: String,
        default: "0"
    },
    age: {
        type: Number
    },
    // 创建时间
    creatd_data: {
        type: Date,
        default: Date.now()
    },
    // 用户的显示的路由
    routerList: {
        type: {
            name: {type: String},
            path: {type: String},
            children: {type: Array}
        },
        default:[]
    }
})

module.exports = model("UserSchema", UserSchema)