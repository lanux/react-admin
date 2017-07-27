import { createReducer } from '../../utils/index'
import InitState from '../models/app'
import { appTypes } from '../actions/actionTypes'

const handlers = {
  [appTypes.CHANGE_THEME]: (state, data) => {
    return { ...state, theme: state.theme === 'dark' ? 'light' : 'dark' }
  },
  [appTypes.TOGGLE_SIDER_FOLD]: (state, data) => {
    return { ...state, siderFold: !state.siderFold }
  },
  [appTypes.LOGOUT]: (state, data) => {
    return { ...state, user: {} }
  },
  [appTypes.SHOW_LOADING]: (state, data) => {
    return { ...state, loading: true }
  },
  [appTypes.HIDE_LOADING]: (state, data) => {
    return { ...state, loading: false }
  },
  [appTypes.SWITCH_LOADING_STATUS]: (state, data) => {
    return { ...state, loading: !state.loading }
  },
}
export default createReducer(InitState, handlers)
