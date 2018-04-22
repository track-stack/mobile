import React from 'react'
import { connect } from 'react-redux'
import { Text } from 'react-native'
import { store, actions } from 'trackstack'
import LoginView from './LoginView'

const { login, setAccessToken } = actions.api

const mapDispatchToProps = (dispatch, props) => {
  return {
    onLoginHandler: props.onLoginHandler,
    setAccessToken: token => dispatch(setAccessToken(token)),
    login: (token, expires) => {
      return dispatch(login(token, expires))
    }
  }
}

const mapStateToProps = state  => {
  return {}
}

const LoginViewContainer = connect(
  mapStateToProps, mapDispatchToProps
)(LoginView)

export default LoginViewContainer
