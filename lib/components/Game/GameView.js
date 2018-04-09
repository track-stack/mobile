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
      fetchGameTimer: setInterval(() => {
        this.fetchGame()
      }, 3000)
    }
  }

  componentWillMount = () => {
    this.fetchGame()
  }

  componentWillUnmount = () => {
    this.props.unsetGame()
    const { fetchGameTimer } = this.state
    clearInterval(fetchGameTimer)
  }

  handleSubmitAnswer = () => {
    const {answer} = this.state
    const stacks = this.props.game.stacks
    const latestStack = stacks[stacks.length - 1]

    this.refs.answerInput.clear()

    this.props.submitAnswer(this.props.accessToken, answer, latestStack)
    this.setState({ answer: "" })
  }

  fetchGame = () => {
    const { params } = this.props.navigation.state
    const { accessToken } = this.props
    this.props.fetchGame(accessToken, params.gameId)
  }

  render = () => {
    let screen = null;
    if (this.props.game) {
      const players = this.props.game.players
      const stack = this.props.game.lastStack()
      const turns = stack.turns
      const lastTurn = stack.firstTurn()

      const gameOver = stack.ended
      const disabled = gameOver || (turns.length && lastTurn.userId === players.viewer.id)
      const inputColor = disabled ? '#f2f2f2' : '#fff'

      screen = (
        <View style={{flex: 1}}>
          <View style={{paddingTop: 20, paddingBottom: 16}}>
            <PlayersView players={players} />
          </View>
          <TextInput
            style={[styles.input, {backgroundColor: inputColor}]}
            ref="answerInput"
            onChangeText={value => this.setState({ answer: value })}
            placeholder="Name a song..."
            editable={!disabled}
            onSubmitEditing={this.handleSubmitAnswer}
          />
          <View style={{flex: 1}}>
            <TurnsListView turns={turns} />
          </View>
        </View>
      )
    } else {
      screen = (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size='large' />
        </View>
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
    borderColor: '#e2e2e2',
    borderRadius: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderWidth: 1,
    marginLeft: 15,
    marginRight: 15
  }
})
