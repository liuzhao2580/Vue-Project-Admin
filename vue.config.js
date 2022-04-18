const { defineConfig } = require('@vue/cli-service')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const { title } = require('./src/setting.ts')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
// 配置 externals
const externalsConfig = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  'element-ui': 'ELEMENT',
  echarts: 'echarts',
  quill: 'Quill',
  wangeditor: 'wangEditor',
  axios: 'axios',
  mockjs: 'Mock',
  'mavon-editor': 'MavonEditor',
  '@antv/x6': 'X6'
}
// 配置生产的 plugin
const productionPlugins = [
  // 删除生产环境的 console
  new UglifyJSPlugin({
    uglifyOptions: {
      compress: {
        drop_console: true
      }
    }
  }),
  // 开启 gzip
  new CompressionPlugin({
    test: /\.js$|\.ts$|\.html$|\.css/,
    threshold: 10240 // 只处理比这个值大的资源。按字节计算 设置的是 10kb
  })
]
// 设置 项目名称
const name = title
// 设置项目的端口号
const port = 9527
module.exports = defineConfig({
  outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'test',
  // lintOnSave: false,
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  productionSourceMap: false,

  devServer: {
    port,
    host: '0.0.0.0',
    open: false,
    https: false,
    // 配置跨域
    proxy: {
      // 定义代理的名称
      // [`${process.env.VUE_APP_BASE_API}`]: {
      //   target: process.env.VUE_APP_BASE_URL,
      //   changeOrigin: true, // 是否启动代理
      //   // 设置之后请求会默认加上  如果你的真实的api路径中没有 /api 这一个路径，把这句加上
      //   pathRewrite: {
      //     [`^${process.env.VUE_APP_BASE_API}`]: ''
      //   }
      // }
    }
  },

  // webpack 简单配置 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
  configureWebpack: {
    externals: process.env.NODE_ENV === 'production' ? externalsConfig : {},
    name,
    resolve: {
      alias: {
        '@': resolve('src'),
        '@api': resolve('src/api/modules')
      },
      extensions: ['.tsx', '.ts', '.js', '.vue']
    },
    plugins: process.env.NODE_ENV === 'production' ? productionPlugins : [],
    module: {
      rules: [
        // 全局导入 scss
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'style-resources-loader',
              options: {
                patterns: ['./src/styles/variables.scss']
              }
            }
          ]
        }
      ]
    }
  },

  // webpack 高级配置
  chainWebpack(config) {
    config.resolve.alias.set('vue', '@vue/compat')
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        return {
          ...options,
          compilerOptions: {
            compatConfig: {
              MODE: 2
            }
          }
        }
      })
    // 设置 images 转化为 base64位
    // config.module
    //   .rule("images")
    //   .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
    //   .use("url-loader")
    //   .loader("url-loader")
    //   .tap(options => Object.assign(options, { limit: 20000 }))
    //   .end()
    // set svg-sprite-loader
    // 设置 svg 导入
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
})
