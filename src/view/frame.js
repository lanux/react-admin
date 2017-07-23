import React from 'react'
import { connect } from 'react-redux'

@connect(
    state => ({ ...state }),
)
export default class MainLayout extends React.Component {
  static propTypes = {
    children: React.PropTypes.element,
  };

  constructor () {
    super()
  }

  componentWillMount () {
  }

  render () {
    return (
      <div className="main-container">
        <div className="main-wrapper">
          {this.props.children}
        </div>
      </div>
    )
  }
}
