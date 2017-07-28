import 'es6-promise'
import fetch from 'isomorphic-fetch'
import { sysUserType } from '../actionTypes'

// 开始获取数据
export const requestPosts = (path) => {
  return {
    type: sysUserType.LOAD,
    path,
  }
}
export const receivePosts = ({ payload }) => {
  return {
    type: sysUserType.LOAD_FINISHED,
    payload,
  }
}
export const queryList = ({ payload }) => (dispatch) => {
  let url = `http://127.0.0.1:3000/users?da=${JSON.stringify(payload)}`
  dispatch(requestPosts())
  return fetch(url, { mode: 'cors', 'Content-Type': 'application/json' })
    .then((response) => {
      if (response.ok) {
        response.json().then(json => dispatch(receivePosts({ payload: { list: json.data } })))
      } else {
        console.log('status', response.status)
      }
    })
    .catch(error => console.log(error))
}

