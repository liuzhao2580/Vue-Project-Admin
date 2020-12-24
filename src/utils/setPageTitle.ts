import defaultSetting from "@/setting"

export default function (pageTitle) {
    if (pageTitle) {
        return `${pageTitle} - ${defaultSetting.title}`
    }
    return defaultSetting.title
}