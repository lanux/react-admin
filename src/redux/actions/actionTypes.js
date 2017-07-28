import { keyMirror } from '../../utils/index'

const appTypes = keyMirror({
  CHANGE_THEME: null,
  TOGGLE_SIDER: null,
  LOGOUT: null,
  SHOW_LOADING: null,
  HIDE_LOADING: null,
  SWITCH_LOADING_STATUS: null,
})

const sysUserType = keyMirror({
  LOAD: null,
  LOAD_FINISHED: null,
})

module.exports = { appTypes, sysUserType }
