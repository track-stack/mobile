import { connect } from 'react-redux'
import CreateGameView from './CreateGameView'
import { actions } from 'trackstack'

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

const CreateGameViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateGameView)

export default CreateGameViewContainer
