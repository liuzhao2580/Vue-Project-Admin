/** 深拷贝 */
export const deepClone = (obj: any) => {
  let result: any =
    Object.prototype.toString.call(obj) === "[object Object]" ? {} : []
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const element = obj[key]
      if (typeof element === "object") {
        result[key] = deepClone(element)
      } else {
        result[key] = obj[key]
      }
    }
  }
  return result
}

/** 动态创建 script 发送get请求 */
/*
  src 请求的地址
  responStr 返回的参数名称
  原理 动态创建script标签发送请求的时候，一般会传递一个字段过去类似于 www.baidu.com?responData 以问号的形式拼接，后台接收到请求之后，拿到问号后的字段，将返回的数据以 responData = { code: 200, data: {},...}的格式传递给前端，前端通过window.responData 的形式获取到返回的数据
*/
export const createScript = (src: string, responStr?: string) => {
  const scriptDom = document.createElement("script")
  scriptDom.type = "text/javascript"
  scriptDom.src = `${src}${responStr ? "?" + responStr : ""}`
  document.body.appendChild(scriptDom)
  return new Promise<void>((resolve, reject) => {
    scriptDom.onload = () => {
      resolve()
      setTimeout(() => {
        document.body.removeChild(scriptDom)
      })
    }
    scriptDom.onerror = () => reject()
  })
}
