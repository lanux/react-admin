import React from 'react'
import { Router } from 'react-router'
import App from './view/frame'

// https://segmentfault.com/a/1190000007141049
const Routers = function ({ history }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], (require) => {
          cb(null, { component: require('./view/home') })
        }, 'home')
      },
      childRoutes: [{
        path: 'login',
        getComponent (nextState, cb) {
          require.ensure([], (require) => {
            cb(null, require('./view/login'))
          }, 'login')
        },
      },
      {
        path: '*',
        getComponent (nextState, cb) {
          require.ensure([], (require) => {
            cb(null, require('./view/error'))
          }, 'error')
        },
      },
      ],
    },
  ]
  return <Router history={history} routes={routes} />
}
Routers.propTypes = {
  history: React.PropTypes.object,
}
export default Routers
