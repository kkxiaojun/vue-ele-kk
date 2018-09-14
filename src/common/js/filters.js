import Vue from 'vue'
/**
 * 把 Number 四舍五入为n位小数 toFixed
 */
Vue.filter('tofixed', function (value, len) {
    if (!value) return
    if (typeof value !== 'number') return
    return value.toFixed(len)
  })
/**
 * 把 Number 转换为 百分数%
 */
Vue.filter('topercent', function (value, len) {
  if (!value) return
  if (typeof value !== 'number') return
  return value * 100
})