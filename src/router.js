import React from 'react'
import { Router } from 'react-router'
import App from './views/layout/frame'

/*
Router就是React的一个组件，它并不会被渲染，只是一个创建内部路由规则的配置对象，根据匹配的路由地址展现相应的组件。
Route则对路由地址和组件进行绑定，Route具有嵌套功能，表示路由地址的包涵关系，这和组件之间的嵌套并没有直接联系。
Route可以向绑定的组件传递7个属性：children，history，location，params，route，routeParams，routes，
每个属性都包涵路由的相关的信息。
比较常用的有
children（以路由的包涵关系为区分的组件），
location（包括地址，参数，地址切换方式，key值，hash值）。
react-router提供Link标签，这只是对a标签的封装，值得注意的是，点击链接进行的跳转并不是默认的方式，
react-router阻止了a标签的默认行为并用pushState进行hash值的转变。
切换页面的过程是在点击Link标签或者后退前进按钮时，会先发生url地址的转变，Router监听到地址的改变根据Route的path属性匹配到对应的组件，
将state值改成对应的组件并调用setState触发render函数重新渲染dom。
*/
// https://segmentfault.com/a/1190000007141049
const Routers = ({ history }) => {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (location, cb) {
        require.ensure([], (require) => {
          cb(null, { component: require('./views/home') })
        }, 'home')
      },
      childRoutes: [{
        path: 'home',
        getComponent (location, cb) {
          require.ensure([], (require) => {
            cb(null, require('./views/home'))
          }, 'login')
        },
      }, {
        path: 'login',
        getComponent (location, cb) {
          require.ensure([], (require) => {
            cb(null, require('./views/login'))
          }, 'login')
        },
      },
      {
        path: 'sys',
        childRoutes: [{
          path: 'user',
          getComponent (location, cb) {
            require.ensure([], (require) => {
              cb(null, require('./views/sys/users'))
            }, 'sys_user')
          },
        }],
      },
      {
        path: '*',
        getComponent (location, cb) {
          require.ensure([], (require) => {
            cb(null, require('./views/error'))
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
