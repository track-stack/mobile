import React from 'react'
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import Modal from 'react-native-modal'
import PlayersView from './PlayersView'
import TurnsListView from './TurnsListView'

export default class GameView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dismissedModal: false,
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

  hideModal = () => {
    this.setState({dismissedModal: true})
  }

  startNewTrack = () => {
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

      const gameOverText = lastTurn.userId === players.viewer.id ? (
        <Text style={styles.modalBody}>
          Congratulations! You ended this stack by playing <Text style={styles.bold}>{lastTurn.match.name}</Text> - <Text style={styles.bold}>{lastTurn.match.artist}</Text>
        </Text>
      ) : (
        <Text style={styles.modalBody}>
          {players.opponent.name} has ended this stack by playing <Text style={styles.bold}>{lastTurn.match.name}</Text> - <Text style={styles.bold}>{lastTurn.match.artist}</Text>
        </Text>
      )

      const gameOverButton = lastTurn.userId === players.viewer.id ? (
        <TouchableOpacity style={[styles.button, styles.newStackButton]} onPress={this.startNewStack}>
          <Text style={[styles.dismissText, styles.bold]}>New Stack</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={[styles.button, styles.dismissButton]} onPress={this.hideModal}>
          <Text style={[styles.dismissText, styles.bold]}>Dismiss</Text>
        </TouchableOpacity>
      )

      screen = (
        <View style={{flex: 1}}>
          <Modal isVisible={gameOver && !this.state.dismissedModal}
           animationOutTiming={500}
           animationInTiming={500}
           onBackdropPress={this.hideModal}>
            <View style={styles.modal}>
              <Text style={styles.modalHeader}>Stack Over</Text>
              {gameOverText}
              <View style={{flex: 1, alignItems: 'center'}}>
                {gameOverButton}
              </View>
            </View>
          </Modal>
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
  },
  modal: {
    flex: 1,
    position: 'absolute',
    bottom: -20,
    left: -20,
    right: -20,
    backgroundColor: 'white',
    paddingTop: 20,
    paddingBottom: 50
  },
  modalHeader: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold'
  },
  modalBody: {
    textAlign: 'center',
    fontSize: 14,
    paddingLeft: 40,
    marginTop: 20,
    paddingRight: 40
  },
  bold: {
    fontWeight: 'bold'
  },
  dismissButton: {
    backgroundColor: '#ccc',
  },
  newStackButton: {
    backgroundColor: '#4cd964'
  },
  button: {
    borderRadius: 4,
    paddingTop: 10,
    paddingBottom: 10,
    width: '50%',
    marginTop: 40
  },
  dismissText: {
    fontSize: 14,
    textAlign: 'center'
  },
})
