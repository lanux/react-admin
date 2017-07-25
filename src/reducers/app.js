import { createReducer } from '../utils'
import InitState from '../models/app'
import { CHANGE_THEME } from '../actions/actionTypes'

const handlers = {
  CHANGE_THEME: (state, data) => {
    return state.set('siteInfo', data)
  },
}
export default createReducer(InitState, handlers)
