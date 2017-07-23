import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import { QueueAnim, Table } from 'antd'
// import { Link } from 'react-router'

@connect(
    state => ({ ...state }),
    dispatch => bindActionCreators(()=>{}, dispatch)
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
          home page
      </div>
    )
  }
}
