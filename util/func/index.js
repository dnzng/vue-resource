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
 * 保留小数点后 n 位有效数字
 * 直接使用 Number.prototype.toFixed() 会四舍五入
 */
export function toFixed (num, keep) {
  if (typeof num !== 'number') {
    num = Number(num)
  }

  return Number.parseFloat(num.toFixed(keep + 1).slice(0, -1))
}
