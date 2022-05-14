const { defineConfig } = require('@vue/cli-service')
const CompressionPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const { title, basePrefix } = require('./src/setting.ts')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
// 配置 externals
// const externalsConfig = {
//   vue: 'Vue',
//   'vue-router': 'VueRouter',
//   vuex: 'Vuex',
//   'element-ui': 'ELEMENT',
//   echarts: 'echarts',
//   quill: 'Quill',
//   wangeditor: 'wangEditor',
//   axios: 'axios',
//   mockjs: 'Mock',
//   'mavon-editor': 'MavonEditor',
//   '@antv/x6': 'X6'
// }
/** 配置生产的 plugin */
const productionPlugins = [
  // 开启 gzip
  new CompressionPlugin({
    test: /\.js$|\.ts$|\.html$|\.css/,
    threshold: 10240 // 只处理比这个值大的资源。按字节计算 设置的是 10kb
  })
]
/** 只要不是开发环境的配置 */
const minimizer = [
  new TerserPlugin({
    test: /\.js(\?.*)$/i,
    parallel: true,
    minify: TerserPlugin.uglifyJsMinify,
    terserOptions: {
      format: {
        comments: true // https://webpack.docschina.org/plugins/terser-webpack-plugin/#remove-comments 如果要在构建时去除注释，请使用以下配置
      },
      compress: {
        drop_console: true
      }
    },
    extractComments: false
  })
]
// 设置 项目名称
const name = title
// 设置项目的端口号
const port = 9527
// 设置公共的目录
let publicPath = '/'
// 说明是需要打包到 Pages 上进行预览
if (process.env.NODE_ENV === 'pages') {
  publicPath = basePrefix
}

/** 判断是否不是开发环境 */
const isNotDev = process.env.NODE_ENV !== 'development'
console.log(isNotDev, 'isNotDev')
module.exports = defineConfig({
  publicPath,
  outputDir: 'dist',
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
      [`${process.env.VUE_APP_BASE_API}`]: {
        target: process.env.VUE_APP_BASE_URL,
        changeOrigin: true, // 是否启动代理
        // 设置之后请求会默认加上  如果你的真实的api路径中没有 /api 这一个路径，把这句加上
        pathRewrite: {
          [`^${process.env.VUE_APP_BASE_API}`]: ''
        }
      }
    }
  },

  // webpack 简单配置 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
  configureWebpack: {
    // externals: process.env.NODE_ENV !== 'development' ? externalsConfig : {},
    name,
    resolve: {
      alias: {
        '@': resolve('src')
      },
      extensions: ['.tsx', '.ts', '.js', '.vue']
    },
    plugins: isNotDev ? productionPlugins : [],
    optimization: {
      minimizer: isNotDev ? minimizer : []
    },
    module: {
      rules: [
        // 开启多线程打包
        {
          test: /\.js$/,
          include: resolve('src'),
          use: [
            {
              loader: 'thread-loader',
              options: {
                // 产生的 worker 的数量，默认是 (cpu 核心数 - 1)，或者，
                // 在 require('os').cpus() 是 undefined 时回退至 1
                workers: 2
              }
            }
          ]
        },
        // 全局导入 scss
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'sass-resources-loader',
              options: {
                resources: ['./src/styles/variables.scss']
              }
            }
          ]
        }
      ]
    }
  },

  // webpack 高级配置
  chainWebpack(config) {
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
