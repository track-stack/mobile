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

  componentWillReceiveProps = (nextProps) => {
    if (!this.props.error && nextProps.error) {
      alert(nextProps.error)
    }
  }

  componentWillUnmount = () => {
    this.props.unsetGame()
    const { fetchGameTimer } = this.state
    clearInterval(fetchGameTimer)
  }

  handleSubmitAnswer = () => {
    const { answer } = this.state
    const { game } = this.props
    const latestStack = game.latestStack()

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

  startNewStack = () => {
    const { accessToken, game } = this.props
    this.props.createNewStack(accessToken, game.id)

    // TODO: start fetching the game when a new stack is created
  }

  render = () => {
    let screen = null;
    if (this.props.game) {
      const { game } = this.props
      const players = game.players
      const stack = game.latestStack()
      const turns = stack.turns
      const latestTurn = stack.latestTurn()

      const gameOver = stack.ended
      const disabled = !game.viewersTurn
      const inputColor = disabled ? '#f2f2f2' : '#fff'

      // TODO: stop fetching the game if it's over

      const viewerWon = latestTurn.userId === players.viewer.id

      const gameOverText = viewerWon ? (
        <Text style={styles.modalBody}>
          Congratulations! You ended this stack by playing <Text style={styles.bold}>{latestTurn.match.name}</Text> - <Text style={styles.bold}>{latestTurn.match.artist}</Text>
        </Text>
      ) : (
        <Text style={styles.modalBody}>
          {players.opponent.name} has ended this stack by playing <Text style={styles.bold}>{latestTurn.match.name}</Text> - <Text style={styles.bold}>{latestTurn.match.artist}</Text>
        </Text>
      )

      const gameOverButton = viewerWon ? (
        <TouchableOpacity style={[styles.button, styles.newStackButton]} onPress={this.startNewStack}>
          <Text style={[styles.newStackText, styles.bold]}>New Stack</Text>
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
           onBackdropPress={viewerWon ? null : this.hideModal}>
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
    backgroundColor: '#33cc33'
  },
  button: {
    borderRadius: 4,
    paddingTop: 14,
    paddingBottom: 14,
    width: '60%',
    marginTop: 30
  },
  dismissText: {
    fontSize: 16,
    textAlign: 'center'
  },
  newStackText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white'
  }
})
