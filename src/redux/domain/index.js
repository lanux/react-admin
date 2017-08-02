import { combineEpics } from 'redux-observable'
import sysUser from './sysUser'
import login from './login'
import sysRole from './sysRole'
import app from './app'
import { createReducer } from '../../utils/index'

const domains = {
  app,
  sysUser,
  login,
  sysRole,
}

const subscriptionHolder = []
const reducersHolder = {}
const initState = {}
const epicsArray = []
for (const key in domains) {
  if (Object.prototype.hasOwnProperty.call(domains, key)) {
    const { state, reducers, actions, subscriptions, epics } = domains[key]
    reducers && (reducersHolder[key] = createReducer(state || {}, reducers))
    initState[key] = state || {}
    subscriptions && subscriptionHolder.push({ subscriptions, actions })
    epics && Object.keys(epics).forEach(epicsName => epicsArray.push(epics[epicsName]))
  }
}

export default {
  subscriptionHolder,
  reducersHolder,
  initState,
  epics: combineEpics(...epicsArray),
}
