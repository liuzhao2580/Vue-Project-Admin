// 深拷贝
export const deepClone = (obj:any) => {
  let result:any = Object.prototype.toString.call(obj) === "[object Object]" ? {} : []
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const element = obj[key];
      if(typeof element === 'object') {
        result[key] = deepClone(element)
      } else {
        result[key] = obj[key]
      }
    }
  }
  return result
}