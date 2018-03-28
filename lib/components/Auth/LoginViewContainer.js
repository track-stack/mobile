import React from 'react'
import { connect } from 'react-redux'
import { Text } from 'react-native'
import { store, actions } from 'trackstack'
import LoginView from './LoginView'

const { login } = actions.Site

const mapDispatchToProps = (dispatch, props) => {
  return {
    onLoginHandler: props.onLoginHandler,
    login: (token, expires) => {
      return dispatch(login(token, expires))
    }
  }
}

const mapStateToProps = (state)  => {
  return {}
}

const LoginViewContainer = connect(
  mapStateToProps, mapDispatchToProps
)(LoginView)

export default LoginViewContainer
