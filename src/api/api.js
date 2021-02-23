import axios from 'axios'
// console.log(axios)
// 封装获取用户验证码接口
export function getUserCode ({ phone, code }) {
  return axios.post('/sendsms', {
    phone: phone,
    code: code
  })
}
// 封装注册用户接口
export function registerUser (obj) {
  return axios.post('/register', obj)
}
