import { createReducer } from '../utils'
import InitState from '../models/app'

export default createReducer(InitState, {
  GET_SITE_INFO_SUCCESS: (state, data) => {
    return state.set('siteInfo', data)
  },

  GET_SITE_STATS_SUCCESS: (state, data) => {
    return state.set('siteStats', data)
  },

  GET_ALL_NODES_SUCCESS: (state, data) => {
    return state.set('nodes', data)
  },
})
