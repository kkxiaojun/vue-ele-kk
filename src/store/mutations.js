import { setStore } from 'common/js/util'
import * as TYPE from './mutation_type'
export default {
  // 记录用户信息
  [TYPE.RECORD_USERINFO](state, info) {
    state.userInfo = info;
    state.login = true;
    setStore('user_id', info.user_id);
  },
  // 记录当前经度纬度
  [TYPE.RECORD_ADDRESS](state, {
		latitude,
    longitude
	}) {
    state.latitude = latitude;
    state.longitude = longitude;
  },
  // 记录用户信息
  [TYPE.SAVE_GEOHASH](state, geohash) {
    state.geohash = geohash;
  },
}
