module.exports = async (ctx, next) => {
    ctx.setUnifyResFormat = (data,code,message) => {
        let res = {}
        if(code === 200) {
            res = {
                data,
                status: code,
                message
            }
        } else {
            res = {
                status: code,
                message
            }
        }
        return res
    };
    await next()
}