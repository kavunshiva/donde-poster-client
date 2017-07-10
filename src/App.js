import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { Button, Menu } from 'semantic-ui-react'
import logo from './logo.svg';
import './App.css';
import { AuthAdapter, PositionsAdapter } from './adapters'
import LoginForm from './components/LoginForm'
import PositionForm from './components/PositionForm'

class App extends Component {
  constructor(){
    super()
    this.state = {
      auth: {
        isLoggedIn: false,
        device: {}
      },
      position: {
        lat: null,
        long: null,
        alt: null,
        time: null,
        prev_pos: null,
        next_pos: null,
        device_id: null
      }
    }
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.postPosition = this.postPosition.bind(this)
    this.loggedInDisplay = this.loggedInDisplay.bind(this)
  }

  login(params){
    AuthAdapter.login(params)
      .then(device => {
        if(device.jwt){
          this.setState({
            auth: {
              isLoggedIn: true,
              device: device
            }
          })
          localStorage.setItem('jwt', device.jwt)
        }
      })
  }

  logout(){
    localStorage.clear()
    this.setState({
      auth: {
        isLoggedIn: false,
        device: {}
      }
    })
  }

  postPosition(position){
    position.time = new Date()
    position.device_id = this.state.auth.device.id
    PositionsAdapter.create(position)
      .then(position => {
        if(!position.error){
          this.setState({
            position: position
          })
        }
      })
  }

  componentDidMount(){
    if(localStorage.getItem('jwt')){
      AuthAdapter.currentDevice()
        .then(device => {
          if(!device.error){
            device.jwt = localStorage.getItem('jwt')
            this.setState({
              auth: {
                isLoggedIn: true,
                device: device
              }
            })
          }
        })
    }
  }

  loggedInDisplay(){
    if(this.state.auth.isLoggedIn){
      return (
        <div>
          <Menu>
            <Menu.Menu>
              <Menu.Item>
                <strong>{this.state.auth.device.device_name}</strong>
              </Menu.Item>
            </Menu.Menu>
            <Menu.Menu position="right">
              <Menu.Item>
                <Link to="/" onClick={this.logout}>Logout</Link>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
          <Route path="/" render={(routerProps) => <PositionForm onSubmit={this.postPosition} /> } />
        </div>
      )
    } else {
      return (
        <div>
          <Route exact path="/" render={ () => <Button><Link to="/login">Login</Link></Button> } />
          <Route path="/login" render={ (routerProps) => <LoginForm onSubmit={this.login} /> } />
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.loggedInDisplay()}
      </div>
    )
  }
}

export default App;
