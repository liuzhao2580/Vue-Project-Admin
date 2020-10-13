<template>
    <div>
        <el-select
            v-model="theme"
            :style="{ backgroundColor: theme }"
            placeholder="请选择"
            class="change-color"
            @change="selectChange"
        >
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :style="{ backgroundColor: item.value }"
            >
            </el-option>
        </el-select>
        <p class="test-text">测试</p>
        <p class="box">测试2</p>
    </div>
</template>

<script>
import { setStorage, getStorage } from '@/utils/storage'
const version = require('element-ui/package.json').version
const ORIGINAL_THEME = '#409EFF'
export default {
    data() {
        return {
            theme: '#409EFF',
            options: [
                {
                    value: '#409EFF',
                    label: ''
                },
                {
                    value: '#14F7D1',
                    label: ''
                },
                {
                    value: '#E4F714',
                    label: ''
                },
                {
                    value: '#FFC0CD',
                    label: ''
                }
            ]
        }
    },
    beforeMount() {
        this.init()
    },
    methods: {
        // 主题色初始化
        init() {
            const theme = getStorage('theme') ? JSON.parse(getStorage('theme')) : this.theme
            const bodyDom = document.querySelector('#app')
            bodyDom.setAttribute('data-theme', theme)
        },
        selectChange(value) {
            const bodyDom = document.querySelector('#app')
            bodyDom.setAttribute('data-theme', '')
            bodyDom.setAttribute('data-theme', `${value}`)
            setStorage('theme', value)
            // const getTheme = getStorage('theme') ? JSON.parse(getStorage('theme')) : this.theme
            // this.changeElementColor(value, getTheme)
        },
        // 改变elementUI的主题色
        changeElementColor(val, oldVal) {
            if (typeof val !== 'string') return
            const themeCluster = this.getThemeCluster(val.replace('#', ''))
            const originalCluster = this.getThemeCluster(oldVal.replace('#', ''))
            const getHandler = (variable, id) => {
                return () => {
                    const originalCluster = this.getThemeCluster(ORIGINAL_THEME.replace('#', ''))
                    let newStyle = this.updateStyle(this[variable], originalCluster, themeCluster)
                    let styleTag = document.getElementById(id)
                    if (!styleTag) {
                        styleTag = document.createElement('style')
                        styleTag.setAttribute('id', id)
                        document.head.appendChild(styleTag)
                    }
                    styleTag.innerText = newStyle
                }
            }
            const chalkHandler = getHandler('chalk', 'chalk-style')
            const docsHandler = getHandler('docs', 'docs-style')
            if (!this.chalk) {
                const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
                this.getCSSString(url, chalkHandler, 'chalk')
            } else {
                chalkHandler()
            }
            if (!this.docs) {
                const links = [].filter.call(document.querySelectorAll('link'), (link) => {
                    return /docs\..+\.css/.test(link.href || '')
                })
                links[0] && this.getCSSString(links[0].href, docsHandler, 'docs')
            } else {
                docsHandler()
            }
            const styles = [].slice.call(document.querySelectorAll('style')).filter((style) => {
                const text = style.innerText
                return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text)
            })
            styles.forEach((style) => {
                const { innerText } = style
                if (typeof innerText !== 'string') return
                style.innerText = this.updateStyle(innerText, originalCluster, themeCluster)
            })
        },
        updateStyle(style, oldCluster, newCluster) {
            let newStyle = style
            oldCluster.forEach((color, index) => {
                newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
            })
            return newStyle
        },
        getCSSString(url, callback, variable) {
            const xhr = new XMLHttpRequest()
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '')
                    callback()
                }
            }
            xhr.open('GET', url)
            xhr.send()
        },
        getThemeCluster(theme) {
            const tintColor = (color, tint) => {
                let red = parseInt(color.slice(0, 2), 16)
                let green = parseInt(color.slice(2, 4), 16)
                let blue = parseInt(color.slice(4, 6), 16)
                if (tint === 0) {
                    // when primary color is in its rgb space
                    return [red, green, blue].join(',')
                } else {
                    red += Math.round(tint * (255 - red))
                    green += Math.round(tint * (255 - green))
                    blue += Math.round(tint * (255 - blue))
                    red = red.toString(16)
                    green = green.toString(16)
                    blue = blue.toString(16)
                    return `#${red}${green}${blue}`
                }
            }
            const shadeColor = (color, shade) => {
                let red = parseInt(color.slice(0, 2), 16)
                let green = parseInt(color.slice(2, 4), 16)
                let blue = parseInt(color.slice(4, 6), 16)
                red = Math.round((1 - shade) * red)
                green = Math.round((1 - shade) * green)
                blue = Math.round((1 - shade) * blue)
                red = red.toString(16)
                green = green.toString(16)
                blue = blue.toString(16)
                return `#${red}${green}${blue}`
            }
            const clusters = [theme]
            for (let i = 0; i <= 9; i++) {
                clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
            }
            clusters.push(shadeColor(theme, 0.1))
            return clusters
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/theme.scss';
.change-color {
    width: 120px;
    border-radius: 50%;
}
.box {
    background-color: $backgroundColor;
}
</style>
