import { push } from 'react-router-redux'
import { appTypes } from './actionTypes'

const doLogout = () => ({ type: appTypes.LOGOUT })
export default {
  changeTheme: () => ({ type: appTypes.CHANGE_THEME }),
  toggleSider: ({ payload }) => ({ type: appTypes.TOGGLE_SIDER, payload }),
  switchLoading: ({ payload }) => {
    if (payload && payload.status != null) {
      return { type: payload.status ? appTypes.SHOW_LOADING : appTypes.HIDE_LOADING }
    }
    return { type: appTypes.SWITCH_LOADING_STATUS }
  },
  loadUser: () => (dispatch) => {
    const data = localStorage.getItem('user-info')
    const user = (!!data && data !== 'undefined') ? JSON.parse(data) : null
    if (user) {
      return { type: appTypes.LOAD_FINISHED, payload: { user } }
    }
    return dispatch(push('/login'))
  },
  logout: () => (dispatch) => {
    localStorage.removeItem('user-info')
    doLogout()
    return dispatch(push('/login'))
  },
}
