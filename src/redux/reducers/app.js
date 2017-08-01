import { createReducer } from '../../utils/index'
import InitState from '../models/app'
import { appTypes } from '../actions/actionTypes'

const handlers = {
  [appTypes.CHANGE_THEME]: (state) => {
    const theme = state.theme === 'dark' ? 'light' : 'dark'
    localStorage.setItem('app_theme_name', theme)
    return { ...state, theme }
  },
  [appTypes.TOGGLE_SIDER]: (state, { payload }) => {
    let siderFold = !state.siderFold
    let siderVisible = state.siderVisible
    if (payload && payload.siderFold !== undefined) {
      siderFold = payload.siderFold
    }
    if (payload && payload.siderVisible !== undefined) {
      siderVisible = payload.siderVisible
    }
    localStorage.setItem('app_sider_visible', siderVisible ? '1' : '0')
    localStorage.setItem('app_sider_fold', siderFold ? '1' : '0')
    return { ...state, siderFold, siderVisible }
  },
  [appTypes.LOGOUT]: (state) => {
    return { ...state, user: {} }
  },
  [appTypes.SHOW_LOADING]: (state) => {
    return { ...state, loading: true }
  },
  [appTypes.HIDE_LOADING]: (state) => {
    return { ...state, loading: false }
  },
  [appTypes.SWITCH_LOADING_STATUS]: (state) => {
    return { ...state, loading: !state.loading }
  },
  [appTypes.LOAD_FINISHED]: (state, { payload }) => {
    return { ...state, ...payload }
  },
}
export default createReducer(InitState, handlers)
