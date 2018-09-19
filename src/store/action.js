import { getUser, getAddressList } from 'api/index'
import { GET_USERINFO, SAVE_ADDRESS } from './mutation_type'

export default {
  getUserInfo({ state, commit }) {
    if (getUser()) {
      getUser().then(res => {
        commit(GET_USERINFO, res.data)
      })
    }
  },
  saveAddress({ state, commit }) {
    if (state.removeAddress.length > 0) return
    getAddressList(state.userInfo.user_id).then(res => {
      commit(SAVE_ADDRESS, res.data);
    })
  }
}