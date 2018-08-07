const axios = require('axios')
/**
 * @param  {function} callback
 */
export function getCity (callback) {
  axios({
    method: 'get',
    url: 'api/v1/cities?type=guess'
  })
    .then(res => {
      callback(res)
    })
    .catch(err => {
      callback(err)
    })
}
