import 'es6-promise'
import { ajax } from 'rxjs/observable/dom/ajax'
import { keyMirror } from '../../utils/index'


const types = keyMirror({
  FETCH_REQUEST: null,
  FETCH_RECEIVE: null,
})

const fetchReceive = (res) => {
  return {
    type: types.FETCH_RECEIVE,
    res,
  }
}

export default {
  types,
  state: {
    loading: false,
  },
  actions: {
    fetchRequest: () => {
      return {
        type: types.FETCH_REQUEST,
      }
    },
    fetchReceive,
  },
  reducers: {
    [types.FETCH_RECEIVE]: (state, { payload }) => {
      return { ...state, ...payload, loading: false }
    },
    [types.FETCH_REQUEST]: (state) => {
      return { ...state, loading: !state.loading }
    },
  },
  epics: {
    fetch: (action$) => {
      // 使用ofType方法匹配相应的action
      return action$.ofType(types.FETCH_REQUEST)
      // switchMap将返回新的Observable对象，后续的方法将取消对action$的订阅，而订阅新返回的http对象
        .switchMap((action) => {
          console.log(action)
          // ajax将从一个ajax请求中创建一个Observable，并且返回请求的结果
          return ajax({
            url: 'http://127.0.0.1:3000/users',
            method: 'GET',
            responseType: 'json',
          })
          // map/filter方法和数组的相应方法类似，可以用来对返回结果进行处理
          //   .map(res => res.response || res)
            .map((res) => {
              return res.response
              // if (res.error) {
              //   throw new Error(res.error)
              // } else if (res.results) {
              //   return res.results
              // } else {
              //   throw new Error('invalid response')
              // }
            })
            // 当结果处理完成后，就可以将其作为参数交给下一个action：fetchReceive进行dispatch。
            .map(fetchReceive)
          // 如果有错误的话，就交给相应的action来处理。在这里，这个action必须使用Observable.of方法转为一个observable
          // .catch(error => Observable.of(actions.createError(error)))
        })
    },
  },
}
