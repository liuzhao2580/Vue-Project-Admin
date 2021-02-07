### 前端的`VUE`页面借鉴 [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

-   运行前端代码 `npm run serve`

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
import { Button, Select, Message } from 'element-ui'
Vue.use(Button).use(Select)
Vue.$prototype.$message = Message
```

#### 使用`echarts`导入自定义主题的时候，需要在自定义主题中修改

```js
// 引入 echarts
import echarts from 'echarts'
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'echarts'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('echarts'));
    } else {
        // Browser globals
        // 修改factory({}, root.echarts);
        factory({}, echarts);
    }
}
```

### `tslint`

-   禁用`tslint`检查 双斜杠必须要
    -   只对`.ts`结尾的文件有效 忽略该行以下所有代码出现的错误提示，可以在文件首行添加达到忽略整个文件的格式提示 `// tslint:disable`
    -   只对`.ts`结尾的文件有效 当前 ts 文件重新启用 tslint `// tslint:enable`
    -   只对`.ts`结尾的文件有效 忽略当前行代码出现的错误提示 `// tslint:disable-line`
    -   只对`.ts`结尾的文件有效 忽略下一行代码出现的错误提示 `// tslint:disable-next-line`
    -   对`.vue`文件有效忽略下一行的代码错误 `// @ts-ignore`

##### 常见报错

-   `has no initializer and is not definitely assigned in the constructor` 没有初始值设定项，也没有在构造函数中明确赋值
    解决方法:可以直接在定义的属性后面添加`!`或者`?`
    ```ts
    topologyContent!: HTMLDivElement
    ```
    也可以在`tsconfig.json`中设置
    ```json
    "compilerOptions": {
        "strictPropertyInitialization": false
    }
    ```
