/**
 * 保留小数点后 n 位有效数字
 * 直接使用 Number.prototype.toFixed() 会四舍五入
 */
export function toFixed (num, keep) {
  if (typeof num == 'number' || typeof num === 'string') {
    num = Number(num)
  }

  return Number.parseFloat(num.toFixed(keep + 1).slice(0, -1))
}

/**
 * 根据 页码、每页总数，
 * 从数组中获取第几页的数据
 * @param  {number} pageNum  页码
 * @param  {number} pageSize 每页总数
 * @param  {Array}  arr      要获取数据的数组
 * @return {Array}
 */
export function getPage (pageNum, pageSize, arr) {
  let offset = (pageNum - 1) * pageSize

  return (offset + pageSize >= arr.length)
    ? arr.slice(offset, arr.length)
    : arr.slice(offset, offset + pageSize)
}

/**
 * 时间戳转日期
 * @param  {number} timestamp  时间戳
 * @return {string} format     格式
 *
 * 如：
 * timestampToDate(21312313, 'yyyy-MM-dd HH:mm:ss')
 * 年、月、日、时、分、秒 必须是 yyyy、MM、dd、HH、mm、ss 其它随意
 */
export function timestampToDate (timestamp, format) {
  const date = new Date(timestamp)
  const temp = {
    'y+': date.getFullYear(),
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  // 修正一位数的情况
  const padLeftZero = str => {
    if (typeof str !== 'string') {
      str = str.toString()
    }
  
    return ('00' + str).substr(str.length)
  }

  for (let k in temp) {
    const reg = new RegExp(k, 'g')
    format = format.replace(reg, (match) => {
      // 匹配存在
      if (match) {
        // 为年时，不变；非年时，检查是否为两位数
        return k === 'y+' ? temp[k] : padLeftZero(temp[k])
      }
    })
  }

  return format
}
