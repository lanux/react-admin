import React from 'react'
import { connect } from 'react-redux'
// import { QueueAnim, Table } from 'antd'
// import { Link } from 'react-router'


/*
 javascript 修饰符，es7的语法，可以被babel转换。
 类的修饰 see http://es6.ruanyifeng.com/#docs/decorator#%E7%B1%BB%E7%9A%84%E4%BF%AE%E9%A5%B0

 修饰器的行为就是下面这样:
 @decorator
 class A {}

 // 等同于
 class A {}
 A = decorator(A) || A;

 */
@connect(
    state => ({ ...state })
)
export default class HomeView extends React.Component {
  constructor () {
    super()
  }

  componentWillMount () {
  }

  render () {
    return (
      <div className="content">
          home page<br />
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
        <p>home</p>
      </div>
    )
  }
}
