import React from 'react'
import { connect } from 'react-redux'
import { Text } from 'react-native'
import { store, actions } from 'trackstack'
import LoginView from './LoginView'

const { login } = actions.Site

const mapDispatchToProps = dispatch => {
  return {
    login: (token, expires, callback) => {
      dispatch(login(token, expires, callback))
    }
  }
}

const mapStateToProps = state => {
  return {}
}

const ConnectedComponent = connect(
  mapStateToProps, mapDispatchToProps
)(LoginView)

export default class LoginViewContainer extends React.Component {
  render(){
    return <ConnectedComponent />
  }
}
