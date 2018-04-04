import { connect } from 'react-redux'
import LaunchView from './LaunchView'
import { actions} from 'trackstack'

const { setAccessToken } = actions.api

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    setAccessToken: token => {
      return dispatch(setAccessToken(token))
    }
  }
}

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(LaunchView)

export default ConnectedComponent
