import React from 'react'
import { View, Text } from 'react-native'
import LoginViewContainer from '../Auth/LoginViewContainer'
import MainViewContainer from '../Main/MainViewContainer'

export default class BaseView extends React.Component {
  constructor(props) {
    super(props)

    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin(user) {
    console.log(user)
  }

  render() {
    const loggedIn = this.props.accessToken
    if (loggedIn) {
      view = <MainViewContainer />
    } else {
      view = <LoginViewContainer onLoginHandler={this.handleLogin} />
    }
    return view
  }
}
