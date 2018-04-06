import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import PlayersView from './PlayersView'

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
    let screen = null;
    if (this.props.game) {
      const players = this.props.game.players
      screen = (
        <View style={{paddingTop: 20, paddingBottom: 16}}>
          <PlayersView players={players} />
        </View>
      )
    } else {
      screen = (
        <ActivityIndicator size='large' />
      )
    }

    return (
      <View style={{flex: 1}}>
        {screen}
      </View>
    )
  }
}
