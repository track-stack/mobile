import { connect } from 'react-redux'
import LaunchView from './LaunchView'

const mapStateToProps = state => {
  return {
    nav: state.nav
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(LaunchView)

export default ConnectedComponent
