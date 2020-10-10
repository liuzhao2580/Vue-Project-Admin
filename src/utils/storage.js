// 封装 localStorage

/**
 * 设置 localStorage
 * @param {string} storageName 存储的名称
 * @param {any} storageData 存储的数据
 * @param {time} storageExpire 过期时间 不传递默认为不删除
 */
const setStorage = (storageName, storageData, storageExpire = null) =>{
    const local = window.localStorage
    local.setItem(storageName, storageData)
    // 说明要设置过期时间
    if(storageExpire) {
        local.setItem(`${storageName}_expire`, storageExpire)
    }
}