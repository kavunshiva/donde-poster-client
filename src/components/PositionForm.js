import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'

export default class PositionForm extends Component {
  constructor(){
    super()
    this.state = {
        lat: "",
        long: "",
        alt: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getLatLngFromDevice = this.getLatLngFromDevice.bind(this)
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
      lat: "",
      long: "",
      alt: ""
    })
    this.getLatLngFromDevice()
  }

  getLatLngFromDevice(){
    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude, altitude } = position.coords
        this.setState({
          lat: latitude ? latitude : "",
          long: longitude ? longitude : "",
          alt: altitude ? altitude : ""
        })
      },
      console.log
    )
  }

  componentDidMount(){
    this.getLatLngFromDevice()
  }

  render(){
    return(
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Latitude</label>
          <input type="text" name="lat" value={this.state.lat} onChange={this.handleChange} /><br/>
        </Form.Field>
        <Form.Field>
          <label>Longitude</label>
          <input type="text" name="long" value={this.state.long} onChange={this.handleChange} /><br/>
        </Form.Field>
        <Form.Field>
          <label>Altitude</label>
          <input type="text" name="alt" value={this.state.alt} onChange={this.handleChange} /><br/>
        </Form.Field>
        <Button type="submit">Post Position</Button>
      </Form>
    )
  }

}
