import 'es6-promise'
import fetch from 'isomorphic-fetch'
import { sysUserType } from '../actions/actionTypes'

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
      dispatch({
        type: sysUserType.LOAD,
      })
      return fetch(url, { mode: 'cors', 'Content-Type': 'application/json' })
        .then((response) => {
          if (response.ok) {
            response.json().then(json => dispatch({
              type: sysUserType.LOAD_FINISHED,
              payload: { list: json.data },
            }))
          } else {
            console.log('status', response.status)
          }
        })
        .catch(error => console.log(error))
    },
  },
  reducers: {
    [sysUserType.LOAD_FINISHED]: (state, { payload }) => {
      return { ...state, ...payload, initLoaded: true }
    },
  },
}
