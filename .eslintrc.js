module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/standard"],
  rules: {
    // allow async-await
    "generator-star-spacing": "off",
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    indent: [2, 4], //缩进风格 首行缩进 4个 字符
    eqeqeq: [2, "allow-null"], // 使用 === 替代 ==
    "arrow-spacing": 0, // =>的前/后括号,
      quotes: [1, "double"], // 引号类型  使用双引号
    "eol-last": off, // 文件末尾强制换行 关闭
    "space-before-function-paren": [0, "always"] //函数定义时括号前面要不要有空格
  },
  parserOptions: {
    // 解析器
    parser: "babel-eslint"
  }
}
