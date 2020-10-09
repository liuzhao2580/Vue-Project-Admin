import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from './zh'
import en from './en'
import langzh from 'element-ui/lib/locale/lang/zh-CN'
import langen from 'element-ui/lib/locale/lang/en'
Vue.use(VueI18n)

const messages = {
    'zh': {
        zh,
        ...langzh
    },
    'en': {
        en,
        ...langen
    }
}
const i18n = new VueI18n({
    locale: 'zh',
    messages
})

export default i18n