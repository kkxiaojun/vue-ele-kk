import { getStore } from 'common/js/util'
const axios = require('axios')
/**
 * 获取城市列表
 * @param  {func} callback
 */
export function getCity(type, callback) {
  axios({
    method: 'get',
    url: 'api/v1/cities',
    params: {
      type: type
    }
  })
    .then(res => {
      callback(res)
    })
    .catch(err => {
      callback(err)
    })
}
/**
 * 获取验证码
 * @param {func} callback 
 */
export function getCheckCode(callback) {
  axios({
    method: 'post',
    url: 'api/v1/captchas',
  })
    .then(res => {
      callback(res)
    })
    .catch(err => {
      callback(err)
    })
}
/**
 * login
 * @param {json} data 
 * @param {*} callback 
 */
export function login(data, callback) {
  axios({
    method: 'post',
    url: 'api/v2/login',
    data: data
  })
    .then(res => {
      callback(res)
    })
    .catch(err => {
      callback(err)
    })
}
/**
 * 获取用户信息
 */
export function getUser() {
  let userId = getStore('user_id')
  if (!userId) return
  return axios({
    method: 'get',
    url: 'api/v1/user?user_id=' + userId
  })
}
/**
 * 个人中心编辑地址列表
 * @param {String} userId
 */
export function getAddressList(userId) {
  return axios({
    method: 'get',
    url: 'api/v1/users/' + userId + '/addresses'
  })
}
/**
 * 个人中心搜索地址
 * @param {*} keyword 
 * @param {*} callback 
 */
export function getSearchAddress(keyword, callback) {
  axios({
    method: 'get',
    url: 'api/v1/pos',
    params:{
      keyword: keyword,
      type: 'nearby'
    }
  })
}
/**
 * 删除地址
 * @param {*} userid 
 * @param {*} addrsid 
 * @param {*} callback 
 */
export function deleteAddress(userid, addrsid, callback) {
  axios({
    method: 'delete',
    url: '/v1/users/' + userid + '/addresses/' + addressid
  })
    .then(res => {
      callback(res)
    })
    .catch(err => {
      callback(err)
    })
}
/**
 * 获取城市信息
 * @param {String} id 
 * @param {func} callback 
 */
export function getCityById(id, callback) {
  axios({
    method: 'get',
    url: 'api/v1/cities/' + id,
  })
    .then(res => {
      callback(res)
    })
    .catch(err => {
      callback(err)
    })
}
/**
 * 根据经纬度获取位置信息
 * @param {String} geohash 
 * @param {func} callback 
 */
export function getPosByGeohash(geohash, callback) {
  axios({
    method: 'get',
    url: 'api/v2/pois/' + geohash,
  })
    .then(res => {
      callback(res)
    })
    .catch(err => {
      callback(err)
    })
}
/**
 * 获取食品类型
 */
export function getFoodType() {
  return axios({
    method: 'get',
    url: 'api/v2/index_entry',
  })
}
/**
 * 搜索
 * @param {json} data 
 * @param {func} callback 
 */
export function searchByKeyword(data, callback) {
  axios({
    method: 'get',
    url: 'api/v1/pois',
    params: data
  })
    .then(res => {
      callback(res)
    })
    .catch(err => {
      callback(err)
    })
}
/**
 * 获取商铺列表
 * @param  {json} data
 * @param  {func} callback
 */
export function getShopList(latitude, longitude, offset, restaurant_category_id = '', restaurant_category_ids = '', order_by = '', delivery_mode = '', support_ids = []) {
  let supportStr = '';
  support_ids.forEach(item => {
    if (item.status) {
      supportStr += '&support_ids[]=' + item.id;
    }
  });
  let data = {
    latitude,
    longitude,
    offset,
    limit: '20',
    'extras[]': 'activities',
    keyword: '',
    restaurant_category_id,
    'restaurant_category_ids[]': restaurant_category_ids,
    order_by,
    'delivery_mode[]': delivery_mode
  };
  return axios({
    method: 'get',
    url: 'api/shopping/restaurants?' + supportStr,
    params: data
  })
}
/**
 * 获取food页的分类选择
 * @param {Json} data 
 * @param {func} callback 
 */
export function getFoodCategory(data, callback) {
  let config = {
    latitude: data.latitude,
    longitude: data.longitude
  }
  axios({
    method: 'get',
    url: 'api/shopping/v2/restaurant/category',
    params: config
  })
    .then(res => {
      callback(res)
    })
    .catch(err => {
      callback(err)
    })
}
/**
 * 获取food页的配送方式
 * @param {String} latitude 
 * @param {String} longitude 
 * @param {func} callback 
 */
export function getFoodDelivery(latitude, longitude, callback) {
  axios({
    method: 'get',
    url: 'api/shopping/v1/restaurants/delivery_modes',
    params: {
      latitude: latitude,
      longitude: longitude,
      kw: ''
    }
  })
    .then(res => {
      callback(res)
    })
    .catch(err => {
      callback(err)
    })
}
/**
 * 获取food页的活动列表
 * @param {String} latitude 
 * @param {String} longitude 
 * @param {func} callback 
 */
export function getFoodActivity(latitude, longitude, callback) {
  axios({
    method: 'get',
    url: 'api/shopping/v1/restaurants/activity_attributes',
    params: {
      latitude: latitude,
      longitude: longitude,
      kw: ''
    }
  })
    .then(res => {
      callback(res)
    })
    .catch(err => {
      callback(err)
    })
}
/**
 * 获取商铺详情
 * @param {Number} shopId 
 * @param {String} latitude 
 * @param {String} longitude 
 * @param {func} callback 
 */
export function getShop(shopId, latitude, longitude, callback) {
  axios({
    method: 'get',
    url: 'api/shopping/restaurant/' + shopId,
    params: {
      latitude: latitude,
      longitude: longitude + '&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics'
    }
  })
    .then(res => {
      callback(res)
    })
    .catch(err => {
      callback(err)
    })
}
/**
 * 获取shopmenu
 * @param {Number} shopId 
 * @param {func} callback 
 */
export function getShopMenu(shopId, callback) {
  axios({
    method: 'get',
    url: 'api/shopping/v2/menu',
    params: {
      restaurant_id: shopId
    }
  })
    .then(res => {
      callback(res)
    })
    .catch(err => {
      callback(err)
    })
}
/**
 * 获取评分分数
 * @param {Number} shopId 
 * @param {func} callback 
 */
export function getShopScore(shopId, callback) {
  axios({
    method: 'get',
    url: 'api/ugc/v2/restaurants/' + shopId + '/ratings/scores'
  })
    .then(res => {
      callback(res)
    })
    .catch(err => {
      callback(err)
    })
}
/**
 * 获取评论的tag标签
 * @param {Number} shopId 
 * @param {func} callback 
 */
export function getRatingTag(shopId, callback) {
  axios({
    method: 'get',
    url: 'api/ugc/v2/restaurants/' + shopId + '/ratings/tags'
  })
    .then(res => {
      callback(res)
    })
    .catch(err => {
      callback(err)
    })
}
/**
 * 获取评分列表
 * @param {*} shopId 
 * @param {*} offset 
 * @param {*} tag_name 
 * @param {*} callback 
 */
export function getRatingList(shopId, offset, tag_name = '', callback) {
  let params = {
    has_content: true,
    offset,
    limit: 10,
    tag_name
  }
  axios({
    method: 'get',
    url: 'api/ugc/v2/restaurants/' + shopId + '/ratings',
    data: params
  })
    .then(res => {
      callback(res)
    })
    .catch(err => {
      callback(err)
    })
}
/**
 * 确认订单
 * @param {*} geohash 
 * @param {*} entities 
 * @param {*} shopid 
 * @param {*} callback 
 */
export function checkout(geohash, entities, shopid, callback) {
  let params = {
    come_from: 'web',
    geohash,
    entities,
    restaurant_id: shopid
  }
  axios({
    method: 'post',
    url: 'api/v1/carts/checkout',
    data: params
  })
    .then(res => {
      callback(res)
    })
    .catch(err => {
      callback(err)
    })
}
/**
 * 添加新地址
 * @param {*} userId 
 * @param {*} address 
 * @param {*} address_detail 
 * @param {*} geohash 
 * @param {*} name 
 * @param {*} phone 
 * @param {*} phone_bk 
 * @param {*} poi_type 
 * @param {*} sex 
 * @param {*} tag 
 * @param {*} tag_type 
 */
export function addNewAddress(userId, address, address_detail, geohash, name, phone, phone_bk, poi_type, sex, tag, tag_type) {
  let params = {
    address,
    address_detail,
    geohash,
    name,
    phone,
    phone_bk,
    poi_type,
    sex,
    tag,
    tag_type
  }
  return axios({
    method: 'post',
    url: 'api/v1/users/' + userId + '/addresses',
    data:params
  })
}
/**
 * 搜索附近地址
 * @param {*} keyword 
 * @param {*} callback 
 */
export function searchNearby(keyword, callback) {
  let data = {
    type: 'nearby',
    keyword
  }
  axios({
    method: 'get',
    url: 'api/v1/pois',
    params: data
  })
    .then(res => {
      callback(res)
    })
    .catch(res => {
      callback(err)
    })
}
/**
 * 获取快速备注列表
 * @param {*} id 
 * @param {*} sig 
 */
export function getRemark(id, sig, callback) {
  axios({
    method: 'get',
    url: 'api/v1/carts/' + id + '/remarks',
    params:{sig:sig}
  })
    .then(res => {
      callback(res)
    })
    .catch(err => {
      callback(err)
    })
}
/**
 * 确认下订单
 * @param {*} user_id 
 * @param {*} cart_id 
 * @param {*} address_id 
 * @param {*} description 
 * @param {*} entities 
 * @param {*} geohash 
 * @param {*} sig 
 */
export function placeOrders(user_id, cart_id, address_id, description, entities, geohash, sig) {
  let params = {
    address_id,
    come_from: "mobile_web",
    deliver_time: "",
    description,
    entities,
    geohash,
    paymethod_id: 1,
    sig,
  }
  return axios({
    method: 'post',
    url: 'api/v1/users/' + user_id + '/carts/' + cart_id + '/orders',
    data: params
  })
}
/**
 * 重新发送订单验证码
 * @param {*} merchantOrderNo 
 * @param {*} userId 
 */
export function payRequest(merchantOrderNo, userId){
  return axios({
    method: 'get',
    url: 'api/payapi/payment/queryOrder',
    params:{
      merchantId: 5,
      merchantOrderNo,
      source: 'MOBILE_WAP',
      userId,
      version: '1.0.0',
    }
  })
}