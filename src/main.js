import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
// import { Router, useRouterHistory } from 'react-router'
// import 'animate.css/animate.min.css'
// import 'antd/lib/style/index.less'
import store from './store'
import Routers from './router'

const Root = () => {
  return (
    <Provider store={store}>
      <Routers />
    </Provider>
  )
}

ReactDom.render(<Root />, document.getElementById('root'))

// https://github.com/fireyy/react-antd-admin
