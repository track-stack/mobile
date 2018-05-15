import { connect } from 'react-redux'
import GameView from './GameView'
import { actions } from 'trackstack'

const {
  fetchGame,
  unsetGame,
  submitAnswer,
  createNewStack
} = actions.api

const mapStateToProps = state => {
  return {
    error: state.main.error,
    game: state.main.game,
    accessToken: state.main.accessToken
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchGame: (token, gameId) => {
      return dispatch(fetchGame(token, gameId))
    },
    unsetGame: () => dispatch(unsetGame()),
    submitAnswer: (token, answer, stack) => {
      return dispatch(submitAnswer(token, answer, stack))
    },
    createNewStack: (token, gameId) => {
      return dispatch(createNewStack(token, gameId))
    }
  }
}

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameView)

export default ConnectedComponent

