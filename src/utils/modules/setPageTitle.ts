import setConfig from "@/setting"
export default function (pageTitle: string) {
  if (pageTitle) {
    return `${pageTitle} - ${setConfig.title}`
  }
  return setConfig.title
}
