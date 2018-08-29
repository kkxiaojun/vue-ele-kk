import Vue from 'vue'
import Vuex from 'vuex'
import action from './action'
import getters from './getters'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)

const state = {
  userInfo: null // 用户信息
}

export default new Vuex.Store({
  state,
  getters,
  action,
  mutations,
  plugins:  process.env.NODE_ENV !== 'production' ? [createLogger()] : []
})