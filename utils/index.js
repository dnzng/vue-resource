export default {
  /**
   * 时间戳转日期
   * @param  {Number} timestamp  时间戳
   * @return {String} format     格式
   *
   * 如：
   * timestampToDate(21312313, 'yyyy-MM-dd HH:mm:ss')
   * 年、月、日、时、分、秒 必须是 yyyy、MM、dd、HH、mm、ss 其它随意
   */
  timestampToDate: (function () {
    // 修正一位数的情况
    function padLeftZero (str) {
      if (typeof str !== 'string') {
        str = str.toString()
      }

      return ('00' + str).substr(str.length)
    }

    return function (timestamp, format) {
      let date = new Date(timestamp)
      let temp = {
        'y+': date.getFullYear(),
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      }

      for (let k in temp) {
        let reg = new RegExp(k, 'g')
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
  })()
}
