import Vue from 'vue'
import Vuex from 'vuex'
import actions from './action'
import getters from './getters'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)

const state = {
  login: true, //是否登录
  latitude: '', // 当前位置纬度
	longitude: '', // 当前位置经度
  geohash: '31.22299,121.36025', //地址geohash值
  userInfo: null, // 用户信息
  shopid: null, //商铺id
  cartList: {}, // 加入购物车的商品列表
  choosedAddress: null, // 订单的下单地址
  addressIndex: null, // 订单的下单地址索引
  cartId: null, // 购物车id
  sig: null, // 购物车sig
  shopDetail: null, // 商铺详情
  newAddress: null, // 确认订单页新的地址
  searchAddress: null, // 搜索并选择的地址
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : []
})