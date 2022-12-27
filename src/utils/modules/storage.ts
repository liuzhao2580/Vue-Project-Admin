// 封装 localStorage

/**
 * 设置 localStorage
 * @param {string} storageName 存储的名称
 * @param {any} storageData 存储的数据
 * @param {any} storageExpire 过期时间 不传递默认为不删除 支持传递的格式 正整数 单位毫秒 string 1h(H) 1d(D) 其他均不支持
 * 过期时间是根据当前的时间戳 + 传递的过期时间，在获取 localStorage 的时候判断当前的时间和过期时间
 */
export const setStorage = (
  storageName: string,
  storageData: any,
  storageExpire: any = null
) => {
  const local = window.localStorage;
  local.setItem(storageName, JSON.stringify(storageData));
  // 说明要设置过期时间
  if (storageExpire) {
    let setExpire;
    // 获取当前的时间戳
    const time = new Date().getTime();
    // 说明传递的是数值型
    const numReg = /^[1-9]\d*$/;
    const strReg = /^\d(\.\d)?[(h|H)|(d|D)]$/;
    if (numReg.test(storageExpire)) {
      setExpire = time + storageExpire;
      local.setItem(`${storageName}_expire`, JSON.stringify(setExpire));
    }
    // 说明是其他类型
    else if (strReg.test(storageExpire)) {
      // 得到单位
      const timeUnit = storageExpire.substr(-1);
      // 得到数据
      const timeData = +storageExpire.substr(0, storageExpire.length - 1);
      // 说明传递的是 小时
      if (timeUnit === "h" || timeUnit === "H")
        setExpire = time + timeData * 60 * 60 * 1000;
      // 说明传递的是 天数
      else if (timeUnit === "d" || timeUnit === "D")
        setExpire = time + timeData * 24 * 60 * 60 * 1000;
      local.setItem(`${storageName}_expire`, JSON.stringify(setExpire));
    }
    // 如果都没有匹配到说明数据格式错误
    else return console.error("格式错误");
  }
};

/**
 * 获取 localStorage
 * @param {string} storageName 指定需要获取的数据名称
 * @returns {any} storageData 存储的数据 存在并且没有过期，返回存储的数据；不存在或者过期了，就返回null
 */
export const getStorage = (storageName: string): any => {
  const local = window.localStorage;
  // 获取数据
  let storageData = local.getItem(storageName);
  // 判断是否存在 过期时间
  const isExpire = local.getItem(`${storageName}_expire`);
  // 获取当前的时间戳
  const time = new Date().getTime();
  // 说明存在过期时间，需要判断当前的时间和设置的时间  说明当前数据已经过期，就删除数据和过期时间
  if (isExpire && time >= JSON.parse(isExpire)) {
    storageData = null;
    local.removeItem(storageName);
    local.removeItem(`${storageName}_expire`);
  }
  return storageData;
};

/**
 * 删除 localStorage
 * @param {string} storageName 指定需要删除的数据名称
 */
export const removeStorage = (storageName: string) => {
  const local = window.localStorage;
  // 删除
  local.removeItem(storageName);
  // 判断是否存在 过期时间
  const isExpire = local.getItem(`${storageName}_expire`);
  // 说明存在过期时间，清除过期时间
  if (isExpire) local.removeItem(`${storageName}_expire`);
};

/**
 * 删除所有的 localStorage
 */
export const clearStorage = () => {
  window.localStorage.clear();
};
