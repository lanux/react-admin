import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import 'babel-polyfill'
import redux from './redux'
import Routers from './router'
import appActions from './redux/actions/app'


const resize = ({ dispatch }) => {
  const siderFold = document.body.clientWidth < 992
  const siderVisible = document.body.clientWidth > 768
  dispatch(appActions.toggleSider({ payload: { siderFold, siderVisible } }))
}

const { store, history } = redux

document.body.clientWidth < 769 && resize(store)

let tid
window.onresize = () => {
  clearTimeout(tid)
  tid = setTimeout(resize(store), 300)
}


render((<Provider store={store}>
  {/*
   常用的 history 有三种形式， 但是你也可以使用 React Router 实现自定义的 history。
   browserHistory  : 使用 React Router 的应用推荐的 history
   hashHistory
   createMemoryHistory
   */}
  <Routers history={history} />
</Provider>), document.querySelector('#root'))
