const setConfig = require('@/setting')
export default function(pageTitle: string) {
    if (pageTitle) {
        return `${pageTitle} - ${setConfig.defaultSetting.title}`
    }
    return setConfig.defaultSetting.title
}
