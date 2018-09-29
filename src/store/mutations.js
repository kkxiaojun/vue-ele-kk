import { setStore, getStore } from 'common/js/util'
import * as TYPE from './mutation_type'
export default {
  // 记录用户信息
  [TYPE.RECORD_USERINFO](state, info) {
    state.userInfo = info;
    state.login = true;
    setStore('user_id', info.user_id);
  },
  //获取用户信息存入vuex
  [TYPE.GET_USERINFO](state, info) {
    if (state.userInfo && (state.userInfo.username !== info.username)) {
      return;
    };
    if (!state.login) {
      return
    }
    if (!info.message) {
      state.userInfo = { ...info };
    } else {
      state.userInfo = null;
    }
  },
  // 记录当前经度纬度
  [TYPE.RECORD_ADDRESS](state, {
      latitude,
    longitude
    }) {
    state.latitude = latitude;
    state.longitude = longitude;
  },
  // 记录geohase
  [TYPE.SAVE_GEOHASH](state, geohash) {
    state.geohash = geohash;
  },
  [TYPE.SAVE_ADDRESS](state, address) {
    state.removeAddress = address
  },
  //网页初始化时从本地缓存获取购物车数据
  [TYPE.INIT_BUYCART](state) {
    let initCart = getStore('buyCart');
    if (initCart) {
      state.cartList = JSON.parse(initCart);
    }
  },
  // 加入购物车
  [TYPE.ADD_CART](state, {
		shopid,
    category_id,
    item_id,
    food_id,
    name,
    price,
    specs,
    packing_fee,
    sku_id,
    stock
	}) {
    let cart = state.cartList;
    let shop = cart[shopid] = (cart[shopid] || {});
    let category = shop[category_id] = (shop[category_id] || {});
    let item = category[item_id] = (category[item_id] || {});
    if (item[food_id]) {
      item[food_id]['num']++;
    } else {
      item[food_id] = {
        "num": 1,
        "id": food_id,
        "name": name,
        "price": price,
        "specs": specs,
        "packing_fee": packing_fee,
        "sku_id": sku_id,
        "stock": stock
      };
    }
    state.cartList = { ...cart };
    //存入localStorage
    setStore('buyCart', state.cartList);
  },
  // 移出购物车
  [TYPE.REDUCE_CART](state, {
		shopid,
    category_id,
    item_id,
    food_id,
    name,
    price,
    specs,
	}) {
    let cart = state.cartList;
    let shop = (cart[shopid] || {});
    let category = (shop[category_id] || {});
    let item = (category[item_id] || {});
    if (item && item[food_id]) {
      if (item[food_id]['num'] > 0) {
        item[food_id]['num']--;
        state.cartList = { ...cart };
        //存入localStorage
        setStore('buyCart', state.cartList);
      } else {
        //商品数量为0，则清空当前商品的信息
        item[food_id] = null;
      }
    }
  },
  //清空当前商品的购物车信息
  [TYPE.CLEAR_CART](state, shopid) {
    state.cartList[shopid] = null;
    state.cartList = { ...state.cartList };
    setStore('buyCart', state.cartList);
  },
  // 保存shopId
  [TYPE.SAVE_SHOPID](state, shopid) {
    state.shopid = shopid
  },
  // 保存下单后的cartid和sig
  [TYPE.SAVE_CART_ID_SIG](state, { cartId, sig }) {
    state.cart_id = cartId
    state.sig = sig
  },
  // 保存选择后的下单地址和index索引
  [TYPE.CHOOSE_ADDRESS](state, {
    address,
    index
  }) {
		state.choosedAddress = address;
		state.addressIndex = index
  },
  // 记录商品详情信息
  [TYPE.RECORD_SHOP_DETAIL](state, shopDetail) {
    state.shopDetail = shopDetail
  },
	// 确认订单页添加的新的的地址
	[TYPE.RECORD_NEW_ADDRESS](state, newAddress) {
		state.newAddress.push(newAddress);
  },
  // 搜索并选择的地址
  [TYPE.CHOOSE_SEARCH_ADDRESS](state, searchAddress) {
    state.searchAddress = searchAddress
  },
  // 订单备注
  [TYPE.CONFIRM_REMARK](state, {
    remarkText,
    inputText
  }) {
    state.remarkText = remarkText
    state.inputText = inputText
  },
  // 保存下单时的数据，用户验证时使用
  [TYPE.SAVE_ORDER_INFO](state, orderInfo) {
    state.orderInfo = orderInfo
  },
  [TYPE.SAVE_ORDER_SUCCESS](state, orderSuccess) {
    state.cartPrice = null
    state.orderMessage = orderSuccess
  }
}
