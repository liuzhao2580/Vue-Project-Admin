// setFullYear() MDN官方说明 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/setFullYear

/** 获取两个时间之间的 间隔时间
 * @param { Date | number | string } startTime 开始时间 字符串格式(6:00 06:00 18:00, 18:00:00) 必须是24小时格式
 * @param { Date | number | string } endTime 结束时间 字符串格式(6:00 06:00 18:00, 18:00:00) 必须是24小时格式
 */
export function getBetweenTime(startTime: string, endTime: string): Array<string> {
    // 校验时间格式
    if (typeof startTime === 'string' && typeof endTime === 'string') {
        const reg = /^(0?[1-9]|([1-2][0-4])):(([0-5][0-9])(:([0-9][0-9]))?)$/
        if (!reg.test(startTime)) throw `开始时间：${startTime} 时间格式错误`
        if (!reg.test(endTime)) throw `结束时间：${endTime} 时间格式错误`
    } else throw `${startTime} 或者 ${endTime} 时间格式错误`
    let start: number = +startTime.split(':')[0]
    let end: number = +endTime.split(':')[0]
    const resultTime: string[] = []
    // 当 开始时间小于结束时间的时候进入循环
    while (start <= end) {
        // 拼接时间格式 自动给 小于10的时间前面补0
        let setTime = start >= 10 ? `${start}:00` : `0${start}:00`

        resultTime.push(setTime)
        // 重新设置开始时间
        start += 1
    }
    return resultTime
}

/** 获取两个日期之间的间隔日期
 * @param { Date | number | string } startTime 开始时间 标准时间格式 时间戳格式 字符串格式(2008-08-08,2008-8-8,2008-08-8,2008-8-08)
 * @param { Date | number | string } endTime 结束时间 标准时间格式 时间戳格式 字符串格式(2008-08-08,2008-8-8,2008-08-8,2008-8-08)
 *  */
export function getBetweenDate(
    startTime: Date | number | string,
    endTime: Date | number | string
): Array<string> {
    // 校验时间格式
    if (typeof startTime === 'string') {
        const reg = /^\d{4}-(0?[1-9]|1[0-2])-((0?[1-9])|((1|2)[0-9])|30|31)$/g
        if (!reg.test(startTime)) throw `开始时间：${startTime}时间格式错误`
    }
    if (typeof endTime === 'string') {
        const reg = /^\d{4}-(0?[1-9]|1[0-2])-((0?[1-9])|((1|2)[0-9])|30|31)$/g
        if (!reg.test(endTime)) throw `结束时间：${endTime}时间格式错误`
    }
    let start: Date = new Date(startTime)
    let end: Date = new Date(endTime)
    const resultTime: string[] = []
    // 当 开始时间小于结束时间的时候进入循环
    while (start <= end) {
        let getDay = start.getDate()
        // 月份需要加 1
        let getMonth = start.getMonth() + 1
        let getYear = start.getFullYear()
        /**
         * 拼接时间格式
         * (getMonth >= 10 ? `${getMonth}` : `0${getMonth}`) 自动给 小于10的时间前面补0
         */
        let setTime =
            `${getYear}-` +
            (getMonth >= 10 ? `${getMonth}` : `0${getMonth}`) +
            '-' +
            (getDay >= 10 ? `${getDay}` : `0${getDay}`)

        resultTime.push(setTime)
        /**
         * 重新设置开始时间
         * 使用 setFullYear() 方法会自动将时间累加，返回的是时间戳格式
         * 使用 new Date() 将时间重新设置为标准时间
         * getMonth - 1 将月份时间重新还原
         */
        start = new Date(start.setFullYear(getYear, getMonth - 1, getDay + 1))
    }
    return resultTime
}

/**
 * 获取指定两个月份之间的 间隔月份
 * @param { Date | number | string } startTime 开始时间 标准时间格式 时间戳格式 字符串格式(2008-08,2008-8)
 * @param { Date | number | string } endTime 结束时间 标准时间格式 时间戳格式 字符串格式(2008-08,2008-8)
 */
export function getBetweenMonth(
    startTime: Date | number | string,
    endTime: Date | number | string
): Array<string> {
    // 校验时间格式
    if (typeof startTime === 'string') {
        const reg = /^\d{4}-(0?[1-9]|1[0-2])$/g
        if (!reg.test(startTime)) throw `开始时间：${startTime}时间格式错误`
    }
    if (typeof endTime === 'string') {
        const reg = /^\d{4}-(0?[1-9]|1[0-2])$/g
        if (!reg.test(endTime)) throw `结束时间：${endTime}时间格式错误`
    }
    let start: Date = new Date(startTime)
    let end: Date = new Date(endTime)
    const resultTime: string[] = []
    // 当 开始时间小于结束时间的时候进入循环
    while (start <= end) {
        // 月份需要加 1
        let getMonth = start.getMonth() + 1
        let getYear = start.getFullYear()
        /**
         * 拼接时间格式
         * (getMonth >= 10 ? `${getMonth}` : `0${getMonth}`) 自动给 小于10的时间前面补0
         */
        let setTime = `${getYear}-` + (getMonth >= 10 ? `${getMonth}` : `0${getMonth}`)

        resultTime.push(setTime)
        /**
         * 重新设置开始时间
         * 使用 setFullYear() 方法会自动将时间累加，返回的是时间戳格式
         * 使用 new Date() 将时间重新设置为标准时间
         */
        start = new Date(start.setFullYear(getYear, getMonth))
    }
    return resultTime
}

/** 获取两个年份时间点 之间的间隔年份
 * @param { Date | number | string } startTime 开始时间 标准时间格式 时间戳格式 字符串格式(2008)
 * @param { Date | number | string } endTime 结束时间 标准时间格式 时间戳格式 字符串格式(2008)
 */
export function getBetweenYear(
    startTime: Date | number | string,
    endTime: Date | number | string
): Array<string> {
    // 校验时间格式
    if (typeof startTime === 'string') {
        const reg = /^\d{4}$/g
        if (!reg.test(startTime)) throw `开始时间：${startTime}时间格式错误`
    }
    if (typeof endTime === 'string') {
        const reg = /^\d{4}$/g
        if (!reg.test(endTime)) throw `结束时间：${endTime}时间格式错误`
    }
    let start: Date = new Date(startTime)
    let end: Date = new Date(endTime)
    const resultTime: string[] = []
    // 当 开始时间小于结束时间的时候进入循环
    while (start <= end) {
        let getYear = start.getFullYear()
        // 拼接时间格式
        let setTime = `${getYear}`

        resultTime.push(setTime)
        /**
         * 重新设置开始时间
         * 使用 setFullYear() 方法会自动将时间累加，返回的是时间戳格式
         * 使用 new Date() 将时间重新设置为标准时间
         */
        start = new Date(start.setFullYear(getYear + 1))
    }
    return resultTime
}
