const { title: defatulConfig } = require('./src/setting')
const path = require('path')

function resolve(dir) {
	return path.join(__dirname, dir)
}
// 配置 externals
const externalsConfig = () => {
	return {
		vue: 'Vue',
		'vue-router': 'VueRouter',
		vuex: 'Vuex',
		'element-ui': 'ELEMENT',
		AMap: 'AMap',
		AMapUI: 'AMapUI',
		mavonEditor: 'mavonEditor'
	}
}
// 设置 项目名称
const name = defatulConfig
// 设置项目的端口号
const port = 9527
module.exports = {
	publicPath: './',
	outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'test',
	assetsDir: '',
	indexPath: 'index.html',
	filenameHashing: true,
	lintOnSave: process.env.NODE_ENV === 'development',
	//   lintOnSave: false,
	runtimeCompiler: false,
	transpileDependencies: [],
	productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
	integrity: false,
	// webpack 简单配置 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
	configureWebpack: {
		externals: process.env.NODE_ENV === 'production' ? externalsConfig : {},
		name: name,
		resolve: {
			alias: {
				'@': resolve('src'),
				'@api': resolve('src/api/modules')
			}
		}
	},
	devServer: {
		port: port,
		open: true,
		https: false,
		overlay: {
			warnings: true,
			errors: true
		},
		// // 配置跨域
		// proxy: {
		// 	// 定义代理的名称
		// 	// [`/api/v1`]: {
		// 	// 	target: process.env.VUE_APP_BASE_URL,
		// 	// 	changeOrigin: true, // 是否启动代理
		// 	// 	// 设置之后请求会默认加上  如果你的真实的api路径中没有 /api 这一个路径，把这句加上
		// 	// 	pathRewrite: {
		// 	// 		[`^/api/v1`]: `/api/v1`
		// 	// 	}
		// 	// }
		// 	// [process.env.VUE_APP_BASE_API]: {
		// 	// 	target: process.env.VUE_APP_BASE_URL,
		// 	// 	changeOrigin: true, // 是否启动代理
		// 	// 	// 设置之后请求会默认加上  如果你的真实的api路径中没有 /api 这一个路径，把这句加上
		// 	// 	pathRewrite: {
		// 	// 		[process.env.VUE_APP_BASE_API]: ''
		// 	// 	}
		// 	// }
		// }
	},
	// webpack 高级配置
	chainWebpack(config) {
		// set svg-sprite-loader
		// 设置 svg 导入
		config.module
			.rule('svg')
			.exclude.add(resolve('src/icons'))
			.end()
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
}
