import React from 'react'
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  StyleSheet
} from 'react-native'
import PlayersView from './PlayersView'
import TurnsListView from './TurnsListView'

export default class GameView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      answer: "",
      // fetchGameTimer: setInterval(() => {
      //   this.fetchGame()
      // }, 3000)
    }
  }

  componentWillMount() {
    this.fetchGame()
  }

  fetchGame() {
    const { params } = this.props.navigation.state
    const { accessToken } = this.props
    this.props.fetchGame(accessToken, params.gameId)
  }

  render() {
    let screen = null;
    if (this.props.game) {
      const players = this.props.game.players
      const stack = this.props.game.lastStack()
      const turns = stack.turns
      const lastTurn = stack.firstTurn()

      const gameOver = stack.ended
      const disabled = gameOver || (turns.length && lastTurn.userId === players.viewer.id)

      screen = (
        <View style={{flex: 1}}>
          <View style={{paddingTop: 20, paddingBottom: 16}}>
            <PlayersView players={players} />
          </View>
          <TextInput
            style={styles.input}
            ref="answerInput"
            onChangeText={value => this.setState({ answer: value })}
            placeholder="Name a song"
            editable={disabled}
          />
          <View style={{flex: 1}}>
            <TurnsListView turns={turns} />
          </View>
        </View>
      )
    } else {
      screen = (
        <ActivityIndicator size='large' />
      )
    }

    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        {screen}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderWidth: 1,
    marginLeft: 15,
    marginRight: 15
  }
})
