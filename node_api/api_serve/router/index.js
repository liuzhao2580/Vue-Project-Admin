const fs = require("fs")

module.exports = (app) => {
    const routerDir = fs.readdirSync(__dirname)
    routerDir.forEach(file => {
        if(file === "index.js") return
        const router = require(`./${file}`)
        app.use(router.routes()).use(router.allowedMethods())
    })
}