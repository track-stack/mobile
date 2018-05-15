import React from 'react'
import {
  View
} from 'react-native'
import FriendFinderViewContainer from '../FriendFinder/FriendFinderViewContainer'

export default class CreateGameView extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: 'New Game'
    }
  }

  handleOnFriendSelected = friend => {
    const { createGame, accessToken, navigation } = this.props
    createGame(accessToken, friend.id).then(game => {
      navigation.navigate('Game', { gameId: game.id })
    })
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <FriendFinderViewContainer onFriendSelected={this.handleOnFriendSelected} />
      </View>
    )
  }
}
