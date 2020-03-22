const mongoose = require("mongoose")
const { mongoDB_USER_STR } = require("./utils/config")
module.exports = () =>{
    const MongoDB = mongoose.connection
    MongoDB.on("error",console.error)
    mongoose.connect(mongoDB_USER_STR,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    },() => console.log("连接 MongoDB 成功"))
}