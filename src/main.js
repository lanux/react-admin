import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import 'babel-polyfill'
import { store, history } from './redux'
import Routers from './router'
// import { actions } from './redux/domain/app'


render((<Provider store={store}>
  {/*
   常用的 history 有三种形式， 但是你也可以使用 React Router 实现自定义的 history。
   browserHistory  : 使用 React Router 的应用推荐的 history
   hashHistory
   createMemoryHistory
   */}
  <Routers history={history} />
</Provider>), document.querySelector('#root'))
