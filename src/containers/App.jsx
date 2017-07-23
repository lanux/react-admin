import React from 'react'
import Input from 'antd/lib/input'

export default class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
    }
  }

  handleChange = (e) => {
    this.setState({
      name: e.target.value,
    })
  };

  render () {
    return (<div>
      <h1>Hey, there! {this.state.name}</h1>
      <Input onChange={this.handleChange} />
    </div>)
  }
}
