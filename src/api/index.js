const axios = require('axios')
/**
 * @param  {function} callback
 */
export function getCity (type, callback) {
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
export function getCheckCode (callback) {
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
export function login (data, callback) {
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
export function getCityById (id, callback) {
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
export function getPosByGeohash (geohash, callback) {
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
export function getFoodType () {
  return axios({
    method: 'get',
    url: 'api/v2/index_entry',
  })
}
export function searchByKeyword (data, callback) {
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
export function getShopList (data, callback) {
	let config = {
		latitude: data.latitude,
		longitude: data.longitude
	}
  axios({
    method: 'get',
    url: 'api/shopping/restaurants',
    params: config
  })
    .then(res => {
      callback(res)
    })
    .catch(err => {
      callback(err)
    })
}

export const shopList = (latitude, longitude, offset, restaurant_category_id = '', restaurant_category_ids = '', order_by = '', delivery_mode = '', support_ids = []) => {
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
		'delivery_mode[]': delivery_mode + supportStr
	};
	return fetch('/shopping/restaurants', data);
};