import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'

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
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Device ID</label>
          <input type="text" name="device_name" value={this.state.device_name} onChange={this.handleChange} /><br/>
        </Form.Field>
        <Form.Field>
          <label>Device Key</label>
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange} /><br/>
        </Form.Field>
        <Button type="submit">Login</Button>
      </Form>
    )
  }

}
