import { appTypes } from './actionTypes'

export default {
  changeTheme: () => ({ type: appTypes.CHANGE_THEME }),
  toggleSiderFold: () => ({ type: appTypes.TOGGLE_SIDER_FOLD }),
  logout: () => ({ type: appTypes.LOGOUT }),
  switchLoading: ({ payload }) => {
    if (payload && payload.status != null) {
      return { type: payload.status ? appTypes.SHOW_LOADING : appTypes.HIDE_LOADING }
    }
    return { type: appTypes.SWITCH_LOADING_STATUS }
  },
}
