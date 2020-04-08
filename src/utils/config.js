// 深拷贝
export const deepClone = (obj) => {
    let result = typeof obj === 'object' ? {} : []
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