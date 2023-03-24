/** 深拷贝 */
export const deepClone = <T extends object>(obj: T): T => {
  const result: any =
    Object.prototype.toString.call(obj) === "[object Object]" ? {} : [];
  for (const key in obj) {
    if (validKeyFlag(key, obj)) {
      const element = obj[key];
      if (typeof element === "object") {
        result[key] = deepClone(element);
      } else {
        result[key] = obj[key];
      }
    }
  }
  return result;
};

/** 动态创建 script 标签 发送 get 请求 */
/*
  src 请求的地址
  responStr 返回的参数名称
  原理 动态创建script标签发送请求的时候，一般会传递一个字段过去类似于 www.baidu.com?responData 以问号的形式拼接，后台接收到请求之后，拿到问号后的字段，将返回的数据以 responData = { code: 200, data: {},...}的格式传递给前端，前端通过window.responData 的形式获取到返回的数据
*/
export const createScript = (src: string, responStr?: string) => {
  const scriptDom = document.createElement("script");
  scriptDom.type = "text/javascript";
  scriptDom.src = responStr ? `${src}?callback=${responStr}` : src;
  const getWindow = window as any;
  document.body.appendChild(scriptDom);
  return new Promise<void>((resolve, reject) => {
    scriptDom.onload = () => {
      if (responStr) {
        const result = getWindow[responStr]();
        resolve(result);
      } else resolve();
      setTimeout(() => {
        document.body.removeChild(scriptDom);
      });
    };
    scriptDom.onerror = () => reject();
  });
};

type keyType = string | number | undefined;
/** ts中的枚举字段 转换为枚举中文字段 */
export function EnumFieldToTransform<T extends object, S extends object>(
  enumField: T,
  enumTransform: S,
  field: keyType
) {
  function findKey(
    value: keyType,
    compare = (a: keyType, b: keyType) => a === b
  ) {
    return Object.keys(enumField).find(
      k => validKeyFlag(k, enumField) && compare(enumField[k], value)
    );
  }
  const getFindKey = findKey(field);
  if (getFindKey && validKeyFlag(getFindKey, enumTransform))
    return enumTransform[getFindKey];
  else console.warn("错误,未匹配到");
}

function validKeyFlag(
  key: keyType,
  object: object
): key is keyof typeof object {
  if (key) return key in object;
  else return false;
}

/** vite的特殊性, 需要处理图片 */
export const handleViteImages = (imgPath: string) => {
  try {
    const getSplit = imgPath.split("/");
    const getName = getSplit[getSplit.length - 1];
    return new URL(`../assets/images/${getName}`, import.meta.url).href;
  } catch (error) {
    console.warn(error);
  }
};
