/**
 * check the response
 * @param {Number} status 
 */
export const checkCode = status => {
  if(status=== 200) {
    return true
  } else {
    return false
  }
}
/**
 * set the localStorage
 * @param {*} name 
 * @param {*} content 
 */
export const setStore = (name, content) => {
  if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}