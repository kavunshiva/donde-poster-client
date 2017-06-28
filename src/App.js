import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import { AuthAdapter } from './adapters'
import LoginForm from './components/LoginForm'

class App extends Component {
  constructor(){
    super()
    this.state = {
      auth: {
        isLoggedIn: false,
        device: {}
      }
    }
    this.login = this.login.bind(this)
  }

  login(loginParams){
    AuthAdapter.login(loginParams)
      .then(device => {
        if(!device.error){
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

  // componentDidMount(){
  //   AuthAdapter.current_device()
  //     .then(device => {
  //       if(!device.error){
  //         this.setState({
  //           auth: {
  //             isLoggedIn: true,
  //             device: device
  //           }
  //         })
  //       }
  //     })
  // }

  render() {
    return (
      <div>
        <Route path="/login" render={ () => <LoginForm onSubmit={this.login} /> } />
      </div>
    )
  }
}

export default App;
