import defaultSetting from '@/setting'

export default function(pageTitle: string) {
    if (pageTitle) {
        return `${pageTitle} - ${defaultSetting.title}`
    }
    return defaultSetting.title
}
