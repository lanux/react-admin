import { createReducer } from '../../utils/index'
import InitState from '../models/sysUser'
import { sysUserType } from '../actions/actionTypes'

const handlers = {
  [sysUserType.LOAD_FINISHED]: (state, { payload }) => {
    return { ...state, ...payload, initLoaded: true }
  },
}
export default createReducer(InitState, handlers)
