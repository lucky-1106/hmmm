// 设置token值
function setToken (value) {
  window.localStorage.setItem('token', value)
}
// 获取token值
function getToken () {
  return window.localStorage.getItem('token')
}
// 移出token值
function removeToken () {
  window.localStorage.removeItem('token')
}

export { setToken, getToken, removeToken }
