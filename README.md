### 前端的`VUE`页面借鉴 [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) 
- 运行前端代码 `npm run serve`

### 项目使用 [MOCK](http://mockjs.com/) 模拟数据 

### `sass node-sass`安装失败可以直接在命令行输入以下命令，相当于从淘宝源下载
```
npm config set sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
npm config set phantomjs_cdnurl=https://npm.taobao.org/mirrors/phantomjs/
npm config set electron_mirror=https://npm.taobao.org/mirrors/electron/
npm config set registry=https://registry.npm.taobao.org
```

`ElementUI`按需导入的方式
1、在`babel.config.js`文件中
```js
module.exports = {
    presets: ['@vue/app'],
    plugins: [
        // element官方教程
        [
            'component',
            {
                libraryName: 'element-ui',
                styleLibraryName: 'theme-chalk'
            }
        ]
    ]
}
```
2、使用`Vue.use()`，如果使用`Message`，则不需要使用`Vue.use(Message)`，否则报错，直接使用`Vue.$prototype.$message = Message`，绑定到全局，通过`this.$message`直接调用
```js
import Vue from 'vue'
import {Button,Select,Message} from 'element-ui'
Vue.use(Button).use(Select)
Vue.$prototype.$message = Message
```