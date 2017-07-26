import { keyMirror } from '../utils'

const appTypes = keyMirror({
  CHANGE_THEME: null,
  TOGGLE_SIDER_FOLD: null,
  LOGOUT: null,
})

module.exports = { appTypes }
