import { connect } from 'react-redux'
import CreateGameView from './CreateGameView'
import { actions } from 'trackstack'
const { createNewGame } = actions.api;

const mapStateToProps = state => {
  return {
    accessToken: state.main.accessToken
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createGame: (token, uid) => {
      return dispatch(createNewGame(token, uid))
    }
  }
}

const CreateGameViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateGameView)

export default CreateGameViewContainer
