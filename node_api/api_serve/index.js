const Koa = require("koa")
const path = require("path")
const app = new Koa()
const koa_parameter = require("koa-parameter")
const koa_body = require("koa-body")
const page_error = require("koa-json-error")
// const cors = require("koa-cors")
const koa_static = require("koa-static")
const { node_port } = require("./utils/config")
const All_router = require("./router")

// 连接数据库
const MongoDB_Conn = require("./db")
MongoDB_Conn()
const options = {
    postformat: (e,{stack,...rest})=> process.env.NODE_ENV === 'production'? rest : {stack,...rest}
}
app
.use(page_error(options))
.use(koa_body({
    multipart: true,
    formidable: {
        uploadDir: path.join(__dirname,"public/uploads/images"),
        keepExtensions: true
    }
}))
.use(koa_parameter(app))
// .use(cors())

All_router(app)
app.use(koa_static(__dirname,"public"))
app.listen(({
    port: node_port
}),() => console.log(`node_api启动 localhost:${node_port}`))