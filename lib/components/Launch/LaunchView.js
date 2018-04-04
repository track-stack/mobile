import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { actions } from 'trackstack'

export default class LaunchView extends React.Component {
  componentDidMount() {
    this.fetchAccessTokenFromKeychain()
  }

  async fetchAccessTokenFromKeychain() {
    return Expo.SecureStore.getItemAsync('ts_access_token', null).then(token => {
      if (token) {
        this.props.setAccessToken(token)
        console.log(this.props.navigation)
        this.props.navigation.navigate('App')
      } else {
        this.props.navigation.navigate('Auth')
      }
    })
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size='large' />
      </View>
    )
  }
}
