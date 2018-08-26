import Vue from 'vue'
import Vuex from 'vuex'
import action from './action'
import getters from './getters'
import mutations from './mutations'
Vue.use(Vuex)

const state = {
  userInfo: null // 用户信息
}

export default new Vuex.Store({
  state,
  getters,
  action,
  mutations
})