import { appTypes } from './actionTypes'

export default {
  changeTheme: () => ({ type: appTypes.CHANGE_THEME }),
  toggleSiderFold: () => ({ type: appTypes.TOGGLE_SIDER_FOLD }),
  logout: () => ({ type: appTypes.LOGOUT }),
}
