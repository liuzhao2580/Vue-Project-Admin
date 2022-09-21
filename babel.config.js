const plugins = []

// 不是开发环境, 需要删除console
if(import.meta.env.VITE_ENV !== 'development') {
  plugins.push('transform-remove-console')
}

module.exports = {
  presets: ['@vue/app'],
  plugins
}