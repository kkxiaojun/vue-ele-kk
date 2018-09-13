import Vue from 'vue'
Vue.filter('capitalize', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  })
Vue.filter('tofixed2', function (value) {
  if (!value) return ''
  if (typeof value == Number) {
    return value = value.tofixed(2)
  }
  return ''
})