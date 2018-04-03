import { connect } from 'react-redux'
import AppView from './AppView'
import { actions } from 'trackstack'

const { setAccessToken } = actions.Site

const mapStateToProps = state => {
  return {
    accessToken: state.main.accessToken,
    nav: state.nav
  }
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
)(AppView)

export default ConnectedComponent
