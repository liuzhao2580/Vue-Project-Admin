import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from './zh'
import en from './en'
import zhLangElement from 'element-ui/lib/locale/lang/zh-CN'
import enLangElement from 'element-ui/lib/locale/lang/en'
Vue.use(VueI18n)

const messages = {
    zh: {
        i18n:zh,
        ...zhLangElement
    },
    en: {
        i18n:en,
        ...enLangElement
    }
}
const i18n = new VueI18n({
    locale: 'zh',
    messages
})

export default i18n