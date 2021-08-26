# `vite`中的一些说明

1. CSS 预处理器 但 Vite 也同时提供了对 .scss, .sass, .less, .styl 和 .stylus 文件的内置支持。没有必要为它们安装特定的 Vite 插件，但必须安装相应的预处理器依赖：

```sh
# .scss and .sass
npm install -D sass

# .less
npm install -D less

# .styl and .stylus
npm install -D stylus
```

配置`eslint`
```sh
yarn add eslint eslint-plugin-vue @typescript-eslint/eslint-plugin @typescript-eslint/parser -D
```
