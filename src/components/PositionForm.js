import React, { Component } from 'react'

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
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <label>Latitude</label>
        <input type="text" name="lat" value={this.state.lat} onChange={this.handleChange} /><br/>
        <label>Longitude</label>
        <input type="text" name="long" value={this.state.long} onChange={this.handleChange} /><br/>
        <label>Altitude</label>
        <input type="text" name="alt" value={this.state.alt} onChange={this.handleChange} /><br/>
        <input type="submit" value="Post Position" className="btn btn-primary" />
      </form>
    )
  }

}
