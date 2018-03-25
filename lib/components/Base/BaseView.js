import React from 'react'
import { View, Text } from 'react-native'
import LoginViewContainer from '../Auth/LoginViewContainer'

export default class BaseView extends React.Component {
  render() {
    const loggedIn = false
    const view = loggedIn ? <MainViewContainer /> : <LoginViewContainer />
    return (
      <LoginViewContainer />
    )
  }}