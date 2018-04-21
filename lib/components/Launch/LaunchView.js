import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { actions } from 'trackstack'

export default class LaunchView extends React.Component {
  componentDidMount = () => {
    this.fetchAccessTokenFromKeychain()
  }

  fetchAccessTokenFromKeychain = async () => {
    const token = await Expo.SecureStore.getItemAsync('ts_access_token', null)
    if (token) { this.props.setAccessToken(token)
      this.props.navigation.navigate('App')
    } else {
      this.props.navigation.navigate('Auth')
    }
  }

  render() {
    console.log('butttts')
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size='large' />
      </View>
    )
  }
}
