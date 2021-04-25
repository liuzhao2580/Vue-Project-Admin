class CopyRight {
  constructor() {}
  apply(compiler) {
    compiler.hooks.emit.tapAsync("CopyRight", (compliation, cb) => {
      compliation.assets["copyRight.txt"] = {
        source: () => {
          return "copyright by q"
        },
        size: () => {
          return 15
        },
      }
      cb()
    })
    compiler.hooks.compile.tap("CopyRight", compliation => {
      console.log(compliation, 1111)
    })
  }
}

module.exports = CopyRight
