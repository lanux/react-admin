import 'es6-promise'
import fetch from 'isomorphic-fetch'
import { keyMirror } from '../../utils/index'

const types = keyMirror({
  LOAD: null,
  LOAD_FINISHED: null,
})

// 开始获取数据
const requestPosts = (path) => {
  return {
    type: types.LOAD,
    path,
  }
}
const receivePosts = ({ payload }) => {
  return {
    type: types.LOAD_FINISHED,
    payload,
  }
}

export default {
  state: {
    list: [],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共${total}条`,
      current: 1,
      total: 0,
    },
    initLoaded: false,
    loading: false,
  },
  subscriptions: {
    setup ({ dispatch, history }, { queryList }) {
      return history.listen((location) => {
        if (location.pathname === '/sys/user') {
          dispatch(queryList({}))
        }
      })
    },
  },
  actions: {
    queryList: ({ payload }) => (dispatch) => {
      let url = `http://127.0.0.1:3000/users?da=${JSON.stringify(payload)}`
      requestPosts(url)
      return fetch(url, { mode: 'cors', 'Content-Type': 'application/json' })
        .then((response) => {
          if (response.ok) {
            response.json().then(json => dispatch(receivePosts({ payload: { list: json.data } })))
          } else {
            console.log('status', response.status)
          }
        })
        .catch(error => console.log(error))
    },
  },
  reducers: {
    [types.LOAD_FINISHED]: (state, { payload }) => {
      return { ...state, ...payload, initLoaded: true }
    },
  },
}
