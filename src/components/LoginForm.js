import React, { Component } from 'react'

export default class LoginForm extends Component {
  constructor(){
    super()
    this.state = {
      device_name: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.onSubmit(this.state)
    this.setState({
      device_name: '',
      password: ''
    })
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="device_name" value={this.state.device_name} onChange={this.handleChange} />
        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
        <input type="submit" value="login" />
      </form>
    )
  }

}
