import { connect } from 'react-redux'
import GameView from './GameView'
import { actions } from 'trackstack'

const { fetchGame, unsetGame, submitAnswer } = actions.api

const mapStateToProps = state => {
  return {
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
    }
  }
}

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameView)

export default ConnectedComponent

