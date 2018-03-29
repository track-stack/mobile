import React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import DashboardViewContainer from '../Dashboard/DashboardViewContainer'

export default class MainView extends React.Component {
  constructor(props) {
    super(props)

    this.logOutTapped = this.logOutTapped.bind(this)
  }

  logOutTapped() {
    Expo.SecureStore.deleteItemAsync('ts_access_token', null)
    this.props.setAccessToken()
  }

  render() {
    return (
      <DashboardViewContainer />
    )
  }
}

