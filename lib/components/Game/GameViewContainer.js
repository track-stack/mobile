import { connect } from 'react-redux'
import GameView from './GameView'
import { actions } from 'trackstack'

const { fetchGame, unsetGame } = actions.api

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
    unsetGame: () => dispatch(unsetGame())
  }
}

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameView)

export default ConnectedComponent

