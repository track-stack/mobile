import { connect } from 'react-redux'
import GameView from './GameView'
import { actions } from 'trackstack'

const { fetchGame } = actions.api

const mapStateToProps = state => {
  return {
    game: state.main.game
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchGame: (token, gameId) => {
      return dispatch(fetchGame(token, gameId))
    }
  }
}

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameView)

export default ConnectedComponent

