import { createReducer } from '../utils'
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
}
export default createReducer(InitState, handlers)
