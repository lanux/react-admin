import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { browserHistory } from 'react-router'
import { syncHistory } from 'redux-simple-router'
import createLogger from 'redux-logger'
import initState from './initState'
import rootReducer from './reducers'

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true,
})

/**
 * 创建store中间件
 *
 */
const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
    syncHistory(browserHistory)
)(createStore)

const store = createStoreWithMiddleware(rootReducer, initState)

export default store
