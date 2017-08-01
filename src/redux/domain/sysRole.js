import 'es6-promise'
import { keyMirror } from '../../utils/index'
// import { push } from 'react-router-redux'


const types = keyMirror({
  FETCH_REQUEST: null,
  FETCH_RECEIVE: null,
})

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
    fetchReceive: (res) => {
      console.log(res)
      return {
        type: types.FETCH_RECEIVE,
        res,
      }
    },
  },
  reducers: {
    [types.FETCH_RECEIVE]: (state, { payload }) => {
      return { ...state, ...payload, loading: false }
    },
    [types.FETCH_REQUEST]: (state) => {
      return { ...state, loading: !state.loading }
    },
  },
}
