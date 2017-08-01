import 'es6-promise'
import fetch from 'isomorphic-fetch'
import { keyMirror } from '../../utils/index'
import { push } from 'react-router-redux'


const types = keyMirror({
  LOADING_SWITCH: null,
  LOAD_FINISHED: null,
})

const requestPosts = () => {
  return {
    type: types.LOADING_SWITCH,
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
    loading: false,
  },
  actions: {
    doLogin: ({ payload }) => (dispatch) => {
      let url = `http://127.0.0.1:3000/users?da=${JSON.stringify(payload)}`
      requestPosts()
      return fetch(url, { mode: 'cors', 'Content-Type': 'application/json' })
        .then((response) => {
          if (response.ok) {
            // response.json().then(json => dispatch(receivePosts({ payload: { list: json.data } })))
            localStorage.setItem('user-info', JSON.stringify(payload))
            dispatch(push('/home'))
          } else {
            console.log('status', response.status)
            requestPosts()
          }
        })
        .catch(error => console.log(error))
    },
  },
  reducers: {
    [types.LOAD_FINISHED]: (state, { payload }) => {
      return { ...state, ...payload, initLoaded: true }
    },
    [types.LOADING_SWITCH]: (state) => {
      return { ...state, loading: !state.loading }
    },
  },
}
