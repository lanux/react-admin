import 'es6-promise'
import fetch from 'isomorphic-fetch'
import { Observable } from 'rxjs/Rx'
import { ajax } from 'rxjs/observable/dom/ajax'

export function fetchUser () {
  const data = localStorage.getItem('user-info')
  return (!!data && data !== 'undefined') ? JSON.parse(data) : null
}
export function fetchMenus ({ id }) {
  return ajax({
    url: `http://127.0.0.1:3000/menus?id=${id}`,
    method: 'GET',
    responseType: 'json',
  })
  //   .map((res) => {
  //     return res.response
  //   })
  //   .map(querySuccess)
  // // 如果有错误的话，就交给相应的action来处理。在这里，这个action必须使用Observable.of方法转为一个observable
  // // .catch(error => Observable.of(actions.createError(error)))
}
