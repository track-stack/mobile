import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'

export default class GameView extends React.Component {
  componentWillMount() {
    const { params } = this.props.navigation.state
    Expo.SecureStore.getItemAsync('ts_access_token', null).then(token => {
      this.props.fetchGame(token, params.gameId)
    }).catch(error => {
      console.log('DashboardView: Couldn\'t get access token')
    })
  }

  render() {
    const screen = this.props.game ? (
      <Text>{this.props.game.stacks[0].turns.length} turns in this stack</Text>
    ) : (
      <ActivityIndicator size='large' />
    )
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {screen}
      </View>
    )
  }
}
