/* eslint-disable linebreak-style */
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { browserHistory } from 'react-router'
import { createLogger } from 'redux-logger'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import initState from '../models'
import reducers from '../reducers'


/*
 see http://www.8dou5che.com/2017/01/22/react-router-redux/
 React Router提供单一版本的历史记录（browserHistory和hashHistory），您可以从应用程序的任何位置导入和使用。
 import { browserHistory } from 'react-router'
 browserHistory.push('/some/path')
 如果我想通过Redux操作发出导航事件怎么办？
 push(location), replace(location), go(number), goBack(), goForward(),必须为这些action creator安装routerMiddleware
<pre>
   import { routerMiddleware, push } from 'react-router-redux'
   // Dispatch from anywhere like normal.
   store.dispatch(push('/foo'))
</pre>
*/
const routerReduxMiddleware = routerMiddleware(browserHistory)

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true,
})


/**
 * 添加redux中间件
 * 将所有中间件组成一个数组，依次执行，中间件的次序有讲究。
 *
 */
const createStoreWithMiddleware = applyMiddleware(
    // Action 是由store.dispatch方法发送的。而store.dispatch方法正常情况下，参数只能是对象，不能是函数。
    // 使用redux-thunk中间件，改造store.dispatch，使得后者可以接受函数作为参数。
    thunkMiddleware,
    // 日志中间件
    loggerMiddleware,
    routerReduxMiddleware,
)(createStore)

const rootReducer = combineReducers({
  ...reducers,
  routing: routerReducer, // 如果你使用 combineReducers,它应该被嵌套在 routing这个key下
})

export default createStoreWithMiddleware(rootReducer, initState)
