import translations from "./zh"
export default function customTranslate(template:any, replacements:any) {
  replacements = replacements || {}

  // Translate
  // @ts-ignore
  template = translations[template] || template

  // Replace
  return template.replace(/{([^}]+)}/g, function(_: any, key: string) {
    return replacements[key] || "{" + key + "}"
  })
}
